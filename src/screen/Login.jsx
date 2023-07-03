import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    isHovered,
    Image,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {asyncLoginAction} from '../redux/actions/auth';
import Alert from '../components/Alert';
import {clearMessage} from '../redux/reducers/auth';
import {clearFormError} from '../redux/reducers/auth';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const formError = useSelector(state => state.auth.formError);
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const [errorMsg, setErrorMsg] = React.useState('');

    const doLogin = async values => {
        setErrorMsg('');
        dispatch(clearMessage());
        dispatch(clearFormError());
        dispatch(asyncLoginAction(values));
        if (formError.errors) {
            setErrorMsg(formError.errors[0].msg);
        }
        navigation.navigate('Home');
    };

    return (
        <View style={styles.mainWrap}>
            <View style={styles.gap}>
                <View>
                    <Text style={styles.textHeader}>Login</Text>
                </View>
                <View>
                    <Text style={styles.colorSecondary}>
                        Hi, Welcome back to Urticket!
                    </Text>
                </View>
            </View>
            <View>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={doLogin}>
                    {({handleChange, handleBlur, handleSubmit, values}) => (
                        <View style={styles.form}>
                            {errorMessage && <Alert>{errorMessage}</Alert>}
                            {errorMsg && <Alert>{errorMsg}</Alert>}
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
                                placeholderTextColor="#9ca3af"
                                secureTextEntry
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ForgotPassword')
                                }>
                                <Text
                                    style={[
                                        styles.text,
                                        isHovered && styles.hoveredText,
                                    ]}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmit}>
                                <View style={styles.button}>
                                    <Text style={styles.textButton}>
                                        Log In
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View style={styles.wrapLoginWith}>
                    <Text style={styles.colorSecondary}>or sign in with</Text>
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
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Touchid')}>
                            <View style={styles.box}>
                                <Image
                                    source={require('../assets/fingerprint.png')}
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
    mainWrap: {
        paddingHorizontal: 20,
        gap: 40,
        paddingTop: 50,
        backgroundColor: 'white',
        height: '100%',
    },

    colorSecondary: {color: '#003d3b'},

    gap: {gap: 12},

    gapTwo: {flexDirection: 'row', gap: 7},

    form: {flexDirection: 'column', gap: 10},

    textHeader: {
        color: '#003d3b',
        fontWeight: '500',
        fontSize: 23,
    },

    text: {
        color: '#f59e0b',
        textAlign: 'right',
    },
    hoveredText: {
        color: '#f59e0b',
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

    wrapLoginWith: {
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

export default Login;
