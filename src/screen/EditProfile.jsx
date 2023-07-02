import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Alert from '../components/Alert';
import Icon from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';

const EditProfile = () => {
    const [editFullname, setEditFullname] = React.useState(false);
    const [editUsername, setEditUsername] = React.useState(false);
    const [editEmail, setEditEmail] = React.useState(false);
    const [editGender, setEditGender] = React.useState(false);
    const [editPhone, setEditPhone] = React.useState(false);
    const [editProfession, setEditProfession] = React.useState(false);
    const [editNationality, setEditNationality] = React.useState(false);
    const [editBirthdayDate, setEditBirthdayDate] = React.useState(false);

    const doUpdateProfile = () => {
        console.log('test');
    };
    return (
        <View style={styles.mainWrap}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.form}>
                    <View style={styles.picture}>
                        <View style={styles.imageWrap}>
                            <Image
                                style={styles.image}
                                source={require('../assets/user.png')}
                            />
                        </View>
                    </View>
                    <Formik
                        initialValues={{
                            fullName: '',
                            username: '',
                            email: '',
                            gender: '',
                            phoneNumber: '',
                            profession: '',
                            nasionality: '',
                            birthDate: '',
                        }}
                        onSubmit={doUpdateProfile}>
                        {({handleChange, handleBlur, handleSubmit, values}) => (
                            <View style={styles.gap}>
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
                                            <Text style={styles.colorNeutral}>
                                                Lex Alexander
                                            </Text>
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
                                            <Text style={styles.colorNeutral}>
                                                @Lex12
                                            </Text>
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
                                            <Text style={styles.colorNeutral}>
                                                Lex@mail.com
                                            </Text>
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
                                            <Text style={styles.colorNeutral}>
                                                08123456789
                                            </Text>
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
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'gender',
                                                )}
                                                onBlur={handleBlur('gender')}
                                                value={values.gender}
                                            />
                                        )}
                                        {!editGender && (
                                            <Text style={styles.colorNeutral}>
                                                Male
                                            </Text>
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
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'profession',
                                                )}
                                                onBlur={handleBlur(
                                                    'profession',
                                                )}
                                                value={values.profession}
                                            />
                                        )}
                                        {!editProfession && (
                                            <Text style={styles.colorNeutral}>
                                                Developer
                                            </Text>
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
                                            <Input
                                                // placeholder="Password"
                                                placeholderTextColor="#9ca3af"
                                                onChangeText={handleChange(
                                                    'nasionality',
                                                )}
                                                onBlur={handleBlur(
                                                    'nasionality',
                                                )}
                                                value={values.nasionality}
                                            />
                                        )}
                                        {!editNationality && (
                                            <Text style={styles.colorNeutral}>
                                                Indonesia
                                            </Text>
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
                                <TouchableOpacity onPress={handleSubmit}>
                                    <View style={styles.button}>
                                        <Text style={styles.textButton}>
                                            Update
                                        </Text>
                                    </View>
                                </TouchableOpacity>
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

    gap: {gap: 30},

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
        height: 80,
        width: 'auto',
        borderRadius: 100,
        margin: 3,
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
});

export default EditProfile;
