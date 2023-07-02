import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import {Formik} from 'formik';
import Alert from '../components/Alert';
import http from '../helpers/http';

const ForgotPassword = () => {
    const [errorMsg, setErrorMsg] = React.useState('');
    const navigation = useNavigation();

    const doRequest = async values => {
        try {
            setErrorMsg('');
            const body = new URLSearchParams(values).toString();
            const {data} = await http().post('/auth/forgotRequest', body);
            console.log(data);
            if (data.message.includes('success')) {
                navigation.navigate('ResetPassword');
            }
            if (data.results.errors) {
                setErrorMsg(data.results.errors[0].msg);
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
            <View style={styles.titleWrap}>
                <View>
                    <Text style={styles.textTitle}>Forgot Password</Text>
                </View>
                <Text style={styles.text}>
                    You’ll get mail soon on your email
                </Text>
            </View>
            <View>
                <Formik initialValues={{email: ''}} onSubmit={doRequest}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.form}>
                            {errorMsg && <Alert>{errorMsg}</Alert>}
                            <Input
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor="#9ca3af"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.buttonView}>
                                    <Text style={styles.buttonText}>Send</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        paddingHorizontal: 20,
        gap: 40,
        paddingTop: 50,
        backgroundColor: 'white',
        height: '100%',
    },

    titleWrap: {gap: 12},
    textTitle: {
        color: '#003d3b',
        fontWeight: '500',
        fontSize: 23,
    },

    text: {color: '#003d3b'},

    buttonView: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 30,
    },

    buttonText: {color: 'white', fontWeight: '600'},

    form: {gap: 14},
});

export default ForgotPassword;
