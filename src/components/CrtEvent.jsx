import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
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
// import DatePicker from 'react-native-image-picker';

const CrtEvent = () => {
    const token = useSelector(state => state.auth.token);
    // const [dateEvent, setDateEvent] = React.useState(new Date());
    // const [openDate, setOpenDate] = React.useState(false);
    const [picture, setPicture] = React.useState(null);
    const [errorMessage, setErrorMesage] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openSelect, setOpenSelect] = React.useState(false);
    const [categoryValue, setCategoryValue] = React.useState(null);
    const [locationValue, setLocationValue] = React.useState(null);
    const [category, setcategory] = React.useState([]);
    const [locations, setLocations] = React.useState([]);

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
                console.log(city);
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
            setErrorMesage('');
            // successMessage('');
            // errorMsg('');
            console.log(categoryValue, locationValue, picture, values.date);
            if (values.title === '') {
                setErrorMesage('Title cannot be empty');
            } else if (!locationValue) {
                setErrorMesage('Location cannot be empty');
            } else if (!categoryValue) {
                setErrorMesage('category cannot be empty');
            } else if (!values.desciption) {
                setErrorMesage('Description cannot be empty');
            }
            const form = new FormData();
            Object.keys(values).forEach(key => {
                if (values[key]) {
                    form.append(key, values[key]);
                }
            });
            console.log(categoryValue, locationValue, picture, values.date);
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
            form.append('categoryId', categoryValue);
            form.append('cityId', locationValue);
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
            // if (message) {
            //     setErrorMsg(message);
            // }
        }
        // console.log(data);
        // setSuccessMessage(data.result);
        // for (var pair of form.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }
    };

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={true}>
                <Formik
                    initialValues={{
                        title: '',
                        date: '',
                        desciption: '',
                    }}
                    onSubmit={createEvent}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.scrolHight}>
                            <Text style={styles.text}>New Event</Text>
                            {errorMessage && <Alert>{errorMessage}</Alert>}
                            {errorMsg && <Alert>{errorMsg}</Alert>}
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
                                    />
                                </View>
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
                                    />
                                </View>
                                <View>
                                    <Text style={styles.nameInput}>Date</Text>
                                    <Input
                                        placeholder="DD-MM-YYYY"
                                        placeholderTextColor="#9ca3af"
                                        onChangeText={handleChange('date')}
                                        onBlur={handleBlur('date')}
                                        value={values.date}
                                    />
                                    {/* <TouchableOpacity onPress={() => setOpenDate(true)}>
                                    <View>Open</View>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    open={openDate}
                                    date={dateEvent}
                                    onConfirm={date => {
                                        setOpenDate(false);
                                        setDateEvent(date);
                                    }}
                                    onCancel={() => {
                                        setOpen(false);
                                    }}
                                /> */}
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
    position: {alignItems: 'center', gap: 15},

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

export default CrtEvent;
