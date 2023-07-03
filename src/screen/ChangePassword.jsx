import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import {Formik} from 'formik';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Alert from '../components/Alert';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../components/Header';

const ChangePassword = () => {
    const token = useSelector(state => state.auth.token);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState('');

    const doChange = async values => {
        setErrorMessage('');
        setSuccessMsg('');
        setErrorMsg('');
        console.log(token);
        try {
            if (values.oldPassword === '') {
                setErrorMessage('Old Password Cant be Empty');
            } else if (values.newPassword === '') {
                setErrorMessage('New Password Cant be Empty');
            } else if (values.confirmPassword === '') {
                setErrorMessage('Confirm New Password Cant be Empty');
            }
            const body = new URLSearchParams(values).toString();
            const {data} = await http(token).patch('/changePassword', body);
            console.log(data);
            if (data.message.includes('success')) {
                setSuccessMsg('Change Password Success');
            }
            if (errorMessage === '') {
                if (data.results.errors) {
                    setErrorMsg(data.results.errors[0].msg);
                }
            }
        } catch (error) {
            const message = error?.response?.data?.message;
            if (message) {
                setErrorMsg(message);
            }
        }
    };

    return (
        <View style={styles.mainWrap}>
            <Header>Change Password</Header>
            <Formik
                initialValues={{
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                onSubmit={doChange}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View style={styles.form}>
                        {errorMessage && <Alert>{errorMessage}</Alert>}
                        {errorMsg && <Alert>{errorMsg}</Alert>}
                        {successMsg && (
                            <View style={styles.border}>
                                <Icon
                                    style={styles.textError}
                                    size={22}
                                    name="check"
                                />
                                <Text style={styles.textError}>
                                    {successMsg}
                                </Text>
                            </View>
                        )}
                        <View style={styles.input}>
                            <Text style={styles.text}>Old Password</Text>
                            <Input
                                secureTextEntry
                                placeholder="Input Old Password"
                                placeholderTextColor="#9ca3af"
                                onChangeText={handleChange('oldPassword')}
                                onBlur={handleBlur('oldPassword')}
                                value={values.oldPassword}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>New Password</Text>
                            <Input
                                placeholder="Input New Password"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                value={values.newPassword}
                            />
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.text}>COnfirm Password</Text>
                            <Input
                                placeholder="Confirm New Password"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                        </View>
                        <TouchableOpacity onPress={handleSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Update</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006967',
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

    input: {gap: 5},

    text: {
        color: '#003d3b',
        fontWeight: '500',
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

    button: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },

    textButton: {color: 'white', fontWeight: '600'},
});

export default ChangePassword;
