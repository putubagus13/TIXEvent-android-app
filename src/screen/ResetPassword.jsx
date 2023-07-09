import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Input from '../components/Input';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import http from '../helpers/http';
import Alert from '../components/Alert';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import globalStyles from '../assets/globalStyles';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email cant be empty'),
    code: Yup.string().required('code cant be empty'),
    password: Yup.string().required('Password cant be empty'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm Password is invalid'),
});

const ResetPassword = () => {
    const navigation = useNavigation();
    const [errorMsg, setErrorMsg] = React.useState('');
    const [successMsg, setSuccessMsg] = React.useState('');

    const doReset = async values => {
        try {
            setErrorMsg('');
            const form = new URLSearchParams(values).toString();
            const {data} = await http().post('/auth/resetPassword', form);
            if (data.message.includes('success')) {
                setSuccessMsg(data.message);
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
            <View style={styles.gap}>
                <View>
                    <Text style={styles.textHeading}>Reset Password</Text>
                </View>
                <View style={styles.textDescription}>
                    <Text style={styles.colorSecondary}>
                        Enter the confirmation code and new password!
                    </Text>
                </View>
            </View>
            <View>
                <Formik
                    initialValues={{
                        email: '',
                        code: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={doReset}
                    validationSchema={validationSchema}>
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.gapTwo}>
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
                            <View>
                                <Input
                                    placeholder="Email"
                                    placeholderTextColor="#9ca3af"
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                                {errors.email && touched.email && (
                                    <Text style={globalStyles.colorError}>
                                        {errors.email}
                                    </Text>
                                )}
                            </View>
                            <View>
                                <Input
                                    placeholder="Code"
                                    placeholderTextColor="#9ca3af"
                                    keyboardType="number-pad"
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    value={values.code}
                                />
                                {errors.code && touched.code && (
                                    <Text style={globalStyles.colorError}>
                                        {errors.code}
                                    </Text>
                                )}
                            </View>
                            <View>
                                <Input
                                    placeholder="New Password"
                                    placeholderTextColor="#9ca3af"
                                    secureTextEntry
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                {errors.password && touched.password && (
                                    <Text style={globalStyles.colorError}>
                                        {errors.password}
                                    </Text>
                                )}
                            </View>
                            <Input
                                placeholder="Confirm New Password"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            {errors.confirmPassword &&
                                touched.confirmPassword && (
                                    <Text style={globalStyles.colorError}>
                                        {errors.confirmPassword}
                                    </Text>
                                )}
                            {successMsg && (
                                <View style={styles.gapThree}>
                                    <Text style={styles.colorSecondary}>
                                        please
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('Login')
                                        }>
                                        <Text style={styles.colorAccent}>
                                            Log In
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.colorSecondary}>
                                        again with the new password
                                    </Text>
                                </View>
                            )}
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Change Password
                                    </Text>
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

    gap: {gap: 12},

    gapTwo: {gap: 14},

    gapThree: {gap: 7, flexDirection: 'row'},

    textHeading: {
        color: '#003d3b',
        fontWeight: '500',
        fontSize: 23,
    },

    colorSecondary: {color: '#003d3b'},
    colorAccent: {color: '#f59e0b'},

    textDescription: {flexDirection: 'row', gap: 7},

    button: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 30,
    },

    buttonText: {color: 'white', fontWeight: '600'},

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

export default ResetPassword;
