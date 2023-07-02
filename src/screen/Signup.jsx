import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import Alert from '../components/Alert';
import {Formik} from 'formik';
import {asyncRegisterAction} from '../redux/actions/auth';
import {clearMessage} from '../redux/reducers/auth';
import {clearFormError} from '../redux/reducers/auth';

const Signup = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const navigation = useNavigation();
    const formError = useSelector(state => state.auth.formError);
    const [errorMsg, setErrorMsg] = React.useState('');

    const doRegister = async values => {
        setErrorMsg('');
        dispatch(clearFormError());
        dispatch(clearMessage());
        dispatch(asyncRegisterAction(values));
        console.log(formError.errors[0].msg);
        if (formError.errors) {
            setErrorMsg(formError.errors[0].msg);
        }
    };
    return (
        <View style={styles.mainWrap}>
            <View style={styles.gap}>
                <View>
                    <Text style={styles.textHeading}>Sign Up</Text>
                </View>
                <View style={styles.gapTwo}>
                    <Text style={styles.colorSecondary}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.colorAccent}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Formik
                    initialValues={{
                        email: '',
                        fullName: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={doRegister}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.gapThree}>
                            {errorMessage && <Alert>{errorMessage}</Alert>}
                            {errorMsg && <Alert>{errorMsg}</Alert>}
                            <Input
                                placeholder="Fullname"
                                placeholderTextColor="#9ca3af"
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                            <Input
                                placeholder="Email"
                                keyboardType="email-address"
                                placeholderTextColor="#9ca3af"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Input
                                placeholder="Password"
                                secureTextEntry
                                placeholderTextColor="#9ca3af"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <Input
                                placeholder="Confirm Password"
                                secureTextEntry
                                placeholderTextColor="#9ca3af"
                                onChangeText={handleChange('confirmPassword')}
                                onBlur={handleBlur('confirmPassword')}
                                value={values.confirmPassword}
                            />
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Sign Up
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View style={styles.signUpWithWrap}>
                    <Text style={styles.colorSecondary}>or sign up with</Text>
                    <View style={styles.gapTwo}>
                        <TouchableOpacity>
                            <View style={styles.box}>
                                <Image
                                    source={require('../assets/google.png')}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.box}>
                                <Image
                                    source={require('../assets/facebook.png')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#f59e0b',
    },
    hoveredText: {
        color: '#f59e0b',
    },

    gap: {gap: 12},

    gapTwo: {flexDirection: 'row', gap: 7},

    gapThree: {gap: 14},

    colorSecondary: {color: '#003d3b'},

    mainWrap: {
        paddingHorizontal: 20,
        gap: 40,
        paddingTop: 50,
        backgroundColor: 'white',
        height: '100%',
    },

    textHeading: {
        color: '#003d3b',
        fontWeight: '500',
        fontSize: 23,
    },

    colorAccent: {color: '#f59e0b'},

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

    signUpWithWrap: {
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },

    box: {
        width: 80,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBlockColor: '#003d3b',
        borderRadius: 10,
        borderWidth: 1,
    },
});

export default Signup;
