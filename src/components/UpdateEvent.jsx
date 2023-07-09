import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    Button,
} from 'react-native';
import React from 'react';
import Input from './Input';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import Alert from './Alert';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import * as Yup from 'yup';
import globalStyles from '../assets/globalStyles';

const validationSchema = Yup.object({
    title: Yup.string().min(5, 'Please enter at least 5 letters'),
    desciption: Yup.string().min(500, 'Please enter at least 100 words'),
});

const UpdateEvent = () => {
    const token = useSelector(state => state.auth.token);
    // const [dateEvent, setDateEvent] = React.useState(new Date());
    // const [openDate, setOpenDate] = React.useState(false);
    const [picture, setPicture] = React.useState(null);
    const [errorMessage, setErrorMesage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openSelect, setOpenSelect] = React.useState(false);
    const [openDate, setOpenDate] = React.useState(false);
    const [categoryValue, setCategoryValue] = React.useState(null);
    const [locationValue, setLocationValue] = React.useState(null);
    const [category, setcategory] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await http().get('/categories');
                const categoryData = data.results.map(item => ({
                    label: item.name,
                    value: item.id,
                }));
                setcategory(categoryData);
            } catch (error) {
                const message = error?.response?.data?.message;
                if (message) {
                    console.log(message);
                }
            }
        };
        getCategories();

        const getLocaton = async () => {
            try {
                const {data} = await http().get('/cities');
                const city = data.results.map(item => ({
                    label: item.name,
                    value: item.id,
                }));
                setLocations(city);
            } catch (error) {
                const message = error?.response?.data?.message;
                if (message) {
                    console.log(message);
                }
            }
        };
        getLocaton();
    }, []);

    const openCamera = () => {
        const option = {
            mediaType: 'photo',
            quality: 1,
        };
        console.log('test');
        launchCamera(option, res => {
            if (res.didCancel) {
                console.log('Image picker cencle');
            } else if (res.errorCode) {
                console.log(res.errorMessage);
            } else {
                const data = res.assets[0];
                setPicture(data);
            }
        });
    };

    const openGalery = () => {
        const option = {
            mediaType: 'photo',
            quantity: 1,
        };

        launchImageLibrary(option, res => {
            if (res.didCancel) {
                console.log('Image picker cencle');
            } else if (res.errorCode) {
                console.log(res.errorMessage);
            } else {
                const data = res.assets[0];
                setPicture(data);
                console.log(data);
            }
        });
    };

    const createEvent = async values => {
        try {
            // setErrorMesage('');
            // successMessage('');
            // errorMsg('');
            // console.log(categoryValue, locationValue, picture, moment(date).format('DD-MM-YYYY'));
            // if (values.title === '') {
            //     setErrorMesage('Title cannot be empty');
            // } else if (!locationValue) {
            //     setErrorMesage('Location cannot be empty');
            // } else if (!categoryValue) {
            //     setErrorMesage('category cannot be empty');
            // } else if (!values.desciption) {
            //     setErrorMesage('Description cannot be empty');
            // }
            const form = new FormData();
            Object.keys(values).forEach(key => {
                if (values[key]) {
                    form.append(key, values[key]);
                }
            });

            if (picture) {
                form.append('picture', {
                    name: picture.fileName,
                    type: picture.type,
                    uri:
                        Platform.OS === 'android'
                            ? picture.uri
                            : picture.uri.replace('file://', ''),
                });
            }
            if (categoryValue) {
                form.append('categoryId', categoryValue);
            }
            if (locationValue) {
                form.append('cityId', locationValue);
            }
            if (date) {
                form.append('date', moment(date).format('DD-MM-YYYY'));
            }
            if (token) {
                const {data} = await http(token).post('/events', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(data);
                setSuccessMessage(data.masssage);
            }
            await http(token).get('/events/manage?limit=5');
        } catch (error) {
            const message = error?.response?.data?.message;
            console.log(message);
        }
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={true}>
                <Formik
                    initialValues={{
                        title: '',
                        desciption: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={createEvent}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.scrolHight}>
                            <Text style={styles.text}>Update Event</Text>
                            {errorMessage && <Alert>{errorMessage}</Alert>}
                            {successMessage && (
                                <View style={styles.border}>
                                    <Icon
                                        style={styles.textError}
                                        size={22}
                                        name="check"
                                    />
                                    <Text style={styles.textError}>
                                        {successMessage}
                                    </Text>
                                </View>
                            )}
                            <View style={styles.position}>
                                <View style={styles.pictureWrap}>
                                    {!picture && (
                                        <Icon
                                            style={styles.icon}
                                            name="camera"
                                            size={25}
                                        />
                                    )}
                                    {picture && (
                                        <Image
                                            style={styles.imageStyle}
                                            source={{uri: picture.uri}}
                                        />
                                    )}
                                </View>
                                <View style={styles.gapTwo}>
                                    <TouchableOpacity onPress={openCamera}>
                                        <View style={styles.fileWrap}>
                                            <Text>Camera</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={openGalery}>
                                        <View style={styles.fileWrap}>
                                            <Text>File</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.gap}>
                                <View>
                                    <Text style={styles.nameInput}>Title</Text>
                                    <Input
                                        placeholder="Input Title Event"
                                        placeholderTextColor="#9ca3af"
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                    />
                                    {errors.title && touched.title && (
                                        <Text style={globalStyles.colorError}>
                                            {errors.title}
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <Text style={styles.nameInput}>
                                        Location
                                    </Text>
                                    <DropDownPicker
                                        placeholder="Select location"
                                        dropDownContainerStyle={
                                            styles.dropPicker
                                        }
                                        textStyle={styles.textPicker}
                                        open={openSelect}
                                        value={locationValue}
                                        items={locations}
                                        setOpen={setOpenSelect}
                                        setValue={setLocationValue}
                                        setItems={setLocations}
                                        zIndex={1001}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.nameInput}>
                                        Category
                                    </Text>
                                    <DropDownPicker
                                        placeholder="Select category"
                                        dropDownContainerStyle={
                                            styles.dropPicker
                                        }
                                        textStyle={styles.textPicker}
                                        open={open}
                                        value={categoryValue}
                                        items={category}
                                        setOpen={setOpen}
                                        setValue={setCategoryValue}
                                        setItems={setcategory}
                                        zIndex={1000}
                                    />
                                </View>
                                {/* <View>
                                    <Text style={styles.nameInput}>Date</Text>
                                    <Input
                                        placeholder="DD-MM-YYYY"
                                        placeholderTextColor="#9ca3af"
                                        onChangeText={handleChange('date')}
                                        onBlur={handleBlur('date')}
                                        value={values.date}
                                    />
                                </View> */}
                                <View>
                                    <Text style={styles.nameInput}>Date</Text>
                                    <View>
                                        <TouchableOpacity
                                            style={{
                                                borderWidth: 1,
                                                height: 45,
                                                borderRadius: 10,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 15,
                                                paddingVertical: 12,
                                                borderColor: '#9ca3af',
                                            }}
                                            onPress={() => setOpenDate(true)}>
                                            <Text style={{color: '#003d3b'}}>
                                                {moment(date).format(
                                                    'DD/MM/YYYY',
                                                )}
                                            </Text>
                                            <Icon
                                                name="calendar"
                                                size={20}
                                                style={{color: '#9ca3af'}}
                                            />
                                            <DatePicker
                                                modal
                                                open={openDate}
                                                mode="date"
                                                date={date}
                                                onConfirm={date => {
                                                    setOpenDate(false);
                                                    setDate(date);
                                                }}
                                                onCancel={() => {
                                                    setOpenDate(false);
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.nameInput}>
                                        Description
                                    </Text>
                                    <Input
                                        placeholder="Input description"
                                        placeholderTextColor="#9ca3af"
                                        onChangeText={handleChange(
                                            'desciption',
                                        )}
                                        onBlur={handleBlur('desciption')}
                                        value={values.desciption}
                                    />
                                    {errors.desciption &&
                                        touched.desciption && (
                                            <Text
                                                style={globalStyles.colorError}>
                                                {errors.desciption}
                                            </Text>
                                        )}
                                </View>
                                <TouchableOpacity onPress={handleSubmit}>
                                    <View style={styles.button}>
                                        <Text style={styles.textButton}>
                                            Create
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    position: {alignItems: 'center', gap: 15, paddingTop: 10},

    scrolHight: {height: 1000},

    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },

    pictureWrap: {
        height: 200,
        width: 150,
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        overflow: 'hidden',
    },

    fileWrap: {
        height: 25,
        width: 100,
        backgroundColor: '#9ca3af',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    gap: {gap: 10},

    gapTwo: {gap: 3},

    icon: {
        color: '#9ca3af',
    },

    text: {
        color: '#003d3b',
        fontSize: 22,
        textAlign: 'left',
        fontWeight: '700',
    },

    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
    },

    picker: {
        width: '100%',
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderRadius: 10,
        color: '#003d3b',
    },

    dropPicker: {
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderRadius: 10,
    },

    textPicker: {
        color: '#003d3b',
    },

    nameInput: {
        color: '#003d3b',
        fontWeight: '500',
        paddingVertical: 5,
    },

    button: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 30,
    },

    textButton: {color: 'white', fontWeight: '600'},

    border: {
        width: '100%',
        height: 45,
        borderRadius: 10,
        backgroundColor: '#10b981',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },

    textError: {color: 'white', fontWeight: '500'},
});

export default UpdateEvent;
