import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import globalStyles from '../assets/globalStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../components/Header';
import {useFocusEffect} from '@react-navigation/native';

const EditProfile = () => {
    const [editFullname, setEditFullname] = React.useState(false);
    const [editUsername, setEditUsername] = React.useState(false);
    const [editEmail, setEditEmail] = React.useState(false);
    const [editGender, setEditGender] = React.useState(false);
    const [editPhone, setEditPhone] = React.useState(false);
    const [editProfession, setEditProfession] = React.useState(false);
    const [editNationality, setEditNationality] = React.useState(false);
    const [editBirthdayDate, setEditBirthdayDate] = React.useState(false);
    const [profile, setProfile] = React.useState({});
    const token = useSelector(state => state.auth.token);
    const [picture, setPicture] = React.useState(null);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [edit, setEdit] = React.useState(false);
    const [gender, setGender] = React.useState('0');
    const [profession, setProfession] = React.useState([
        {
            label: 'Developer',
            value: 'Developer',
        },
        {
            label: 'Bisnisman',
            value: 'Bisnisman',
        },
        {
            label: 'Farmer',
            value: 'Farmer',
        },
        {
            label: 'Driver',
            value: 'Driver',
        },
    ]);

    const [nationality, setNationality] = React.useState([
        {
            label: 'Indonesia',
            value: 'Indonesia',
        },
        {
            label: 'Malaysia',
            value: 'Malaysia',
        },
        {
            label: 'Singapure',
            value: 'Singapure',
        },
        {
            label: 'Dubai',
            value: 'Dubai',
        },
    ]);
    const [open, setOpen] = React.useState(false);
    const [openSelect, setOpenSelect] = React.useState(false);
    const [nationalityValue, setNationalityValue] = React.useState(null);
    const [professionValue, setProfessionValue] = React.useState(null);

    const chooseGender = value => {
        setGender(value);
    };

    useFocusEffect(
        React.useCallback(() => {
            const fetchProfile = async () => {
                try {
                    const {data} = await http(token).get('/profile');
                    console.log(data.results);
                    setProfile(data.results);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            fetchProfile();
        }, [token]),
    );

    const getProfileUser = React.useCallback(async () => {
        const {data} = await http(token).get('/profile');
        setProfile(data.results);
    }, [token]);

    React.useEffect(() => {
        getProfileUser();
    }, [getProfileUser]);

    const cancleEdit = () => {
        setEditFullname(false);
        setEditEmail(false);
        setEditPhone(false);
        setEditProfession(false);
        setEditNationality(false);
        setEditGender(false);
        setEditBirthdayDate(false);
        setEditUsername(false);
        setPicture(null);
        setEdit(false);
    };

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

    const doUpdateProfile = async values => {
        try {
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
            if (professionValue) {
                form.append('profession', professionValue);
            }
            if (nationalityValue) {
                form.append('nasionality', nationalityValue);
            }
            if (gender) {
                form.append('gender', gender);
            }

            if (token) {
                const {data} = await http(token).patch('/profile', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage(data.masssage);
            }
            getProfileUser();
            setEditFullname(false);
            setEditEmail(false);
            setEditPhone(false);
            setEditProfession(false);
            setEditNationality(false);
            setEditGender(false);
            setEditBirthdayDate(false);
            setEditUsername(false);
            setPicture(null);
            setEdit(false);
        } catch (error) {
            const message = error?.response?.data?.results?.errors;
            if (message) {
                console.log(message);
            }
        }
    };
    return (
        <View style={styles.mainWrap}>
            <Header>Edit Profile</Header>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.form}>
                    <View style={styles.picture}>
                        <View style={styles.imageWrap}>
                            {!profile.picture && !picture && (
                                <Image
                                    style={styles.image}
                                    source={require('../assets/user.png')}
                                />
                            )}
                            {profile.picture && !picture && (
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: profile.picture,
                                    }}
                                />
                            )}
                            {picture && !profile.picture && (
                                <Image
                                    style={styles.image}
                                    source={{uri: picture.uri}}
                                />
                            )}
                            {picture && profile.picture && (
                                <Image
                                    style={styles.image}
                                    source={{uri: picture.uri}}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.gapTwo}>
                        {!edit && (
                            <TouchableOpacity onPress={() => setEdit(!edit)}>
                                <Icon
                                    style={globalStyles.colorSecondary}
                                    name="edit"
                                    size={20}
                                />
                            </TouchableOpacity>
                        )}
                        {edit && (
                            <>
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
                            </>
                        )}
                    </View>
                    <Formik
                        initialValues={{
                            fullName: '',
                            username: '',
                            email: '',
                            gender: '',
                            phoneNumber: '',
                            birthDate: '',
                        }}
                        onSubmit={doUpdateProfile}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View style={styles.gap}>
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
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Name
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editFullname && (
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'fullName',
                                                )}
                                                onBlur={handleBlur('fullName')}
                                                value={values.fullName}
                                            />
                                        )}
                                        {!editFullname && (
                                            <>
                                                {profile.fullName ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        {profile?.fullName}
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        -set-
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditFullname(!editFullname)
                                            }>
                                            {!editFullname && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Username
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editUsername && (
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'username',
                                                )}
                                                onBlur={handleBlur('username')}
                                                value={values.username}
                                            />
                                        )}
                                        {!editUsername && (
                                            <>
                                                {profile.username ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        {profile?.username}
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        -set-
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditUsername(!editUsername)
                                            }>
                                            {!editUsername && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Email
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editEmail && (
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'email',
                                                )}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                            />
                                        )}
                                        {!editEmail && (
                                            <>
                                                {profile.email ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        {profile?.email}
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        -set-
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditEmail(!editEmail)
                                            }>
                                            {!editEmail && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Phone
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editPhone && (
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'phoneNumber',
                                                )}
                                                onBlur={handleBlur(
                                                    'phoneNumber',
                                                )}
                                                value={values.phoneNumber}
                                            />
                                        )}
                                        {!editPhone && (
                                            <>
                                                {profile.phoneNumber ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        {profile?.phoneNumber}
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        -set-
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditPhone(!editPhone)
                                            }>
                                            {!editPhone && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Gender
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editGender && (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: 20,
                                                }}>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        gap: 10,
                                                        alignItems: 'center',
                                                    }}>
                                                    <View
                                                        style={
                                                            styles.borderRadio
                                                        }>
                                                        <TouchableOpacity
                                                            style={[
                                                                styles.radioButton,
                                                                gender ===
                                                                    '0' &&
                                                                    styles.radioButtonSelected,
                                                            ]}
                                                            onPress={() =>
                                                                chooseGender(
                                                                    '0',
                                                                )
                                                            }
                                                        />
                                                    </View>
                                                    <Text
                                                        style={{
                                                            color: '#003d3b',
                                                        }}>
                                                        Male
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        gap: 10,
                                                        alignItems: 'center',
                                                    }}>
                                                    <View
                                                        style={
                                                            styles.borderRadio
                                                        }>
                                                        <TouchableOpacity
                                                            style={[
                                                                styles.radioButton,
                                                                gender ===
                                                                    '1' &&
                                                                    styles.radioButtonSelected,
                                                            ]}
                                                            onPress={() =>
                                                                chooseGender(
                                                                    '1',
                                                                )
                                                            }
                                                        />
                                                    </View>
                                                    <Text
                                                        style={{
                                                            color: '#003d3b',
                                                        }}>
                                                        Fimale
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                        {!editGender && (
                                            <>
                                                {profile.gender === false ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        Male
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        Fimale
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditGender(!editGender)
                                            }>
                                            {!editGender && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Profession
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editProfession && (
                                            <DropDownPicker
                                                placeholder="Select profession"
                                                dropDownContainerStyle={
                                                    styles.dropPicker
                                                }
                                                textStyle={styles.textPicker}
                                                open={open}
                                                value={professionValue}
                                                items={profession}
                                                setOpen={setOpen}
                                                setValue={setProfessionValue}
                                                setItems={setProfession}
                                                zIndex={1001}
                                            />
                                        )}
                                        {!editProfession && (
                                            <>
                                                {profile.profession ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        {profile?.profession}
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        -set-
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditProfession(
                                                    !editProfession,
                                                )
                                            }>
                                            {!editProfession && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Nationality
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editNationality && (
                                            <DropDownPicker
                                                placeholder="Select nationality"
                                                dropDownContainerStyle={
                                                    styles.dropPicker
                                                }
                                                textStyle={styles.textPicker}
                                                open={openSelect}
                                                value={nationalityValue}
                                                items={nationality}
                                                setOpen={setOpenSelect}
                                                setValue={setNationalityValue}
                                                setItems={setNationality}
                                                zIndex={1000}
                                            />
                                        )}
                                        {!editNationality && (
                                            <>
                                                {profile.nasionality ? (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        {profile?.nasionality}
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={
                                                            styles.colorNeutral
                                                        }>
                                                        -set-
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditNationality(
                                                    !editNationality,
                                                )
                                            }>
                                            {!editNationality && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.data}>
                                    <Text style={styles.colorSecondary}>
                                        Birthday Date
                                    </Text>
                                    <View style={styles.flexDerection}>
                                        {editBirthdayDate && (
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'birthDate',
                                                )}
                                                onBlur={handleBlur('birthDate')}
                                                value={values.birthDate}
                                            />
                                        )}
                                        {!editBirthdayDate && (
                                            <Text style={styles.colorNeutral}>
                                                03/05/2001
                                            </Text>
                                        )}
                                        <TouchableOpacity
                                            onPress={() =>
                                                setEditBirthdayDate(
                                                    !editBirthdayDate,
                                                )
                                            }>
                                            {!editBirthdayDate && (
                                                <Text
                                                    style={styles.colorAccent}>
                                                    Edit
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={handleSubmit}>
                                        <View style={styles.button}>
                                            <Text style={styles.textButton}>
                                                Update
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    {editFullname && (
                                        <TouchableOpacity
                                            onPress={() => cancleEdit()}>
                                            <View style={styles.cancleEdit}>
                                                <Text style={styles.textButton}>
                                                    Cancle
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    colorPrimary: {color: '#006967'},
    colorSecondary: {color: '#003d3b', fontWeight: '500'},
    colorAccent: {color: '#f59e0b'},
    colorNeutral: {color: '#9ca3af'},
    colorError: {color: '#e11d48'},

    radioButton: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFF',
    },

    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#006967',
    },

    borderRadio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#9ca3af',
        padding: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },

    gap: {gap: 30},

    gapTwo: {gap: 3, width: '100%', alignItems: 'center'},

    fileWrap: {
        height: 25,
        width: 100,
        backgroundColor: '#9ca3af',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    },

    cancleEdit: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#9ca3af',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 5,
    },

    textButton: {color: 'white', fontWeight: '600'},

    mainWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006967',
    },

    flexDerection: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },

    picture: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageWrap: {
        overflow: 'hidden',
        height: 100,
        width: 100,
        borderWidth: 3,
        borderColor: '#006967',
        borderRadius: 100,
        padding: 3,
    },

    image: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 100,
    },

    data: {
        gap: 5,
    },

    form: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 50,
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: 50,
    },

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

export default EditProfile;
