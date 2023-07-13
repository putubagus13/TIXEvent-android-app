import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import FAwesome from 'react-native-vector-icons/FontAwesome5';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = React.useState('1');
    console.log(paymentMethod);
    const navigation = useNavigation();
    const route = useRoute();
    const {dataBooking} = route.params;
    const token = useSelector(state => state.auth.token);

    const handlePaymentMethodChange = value => {
        setPaymentMethod(value);
    };

    async function doPayment() {
        try {
            const body = new URLSearchParams({
                reservationId: dataBooking.reservationId,
                paymentMethodId: paymentMethod,
            }).toString();
            const {data} = await http(token).post('/payment', body);
            console.log(data);
            if (data.results) {
                navigation.navigate('My Booking', {
                    replace: true,
                });
            }
        } catch (error) {
            const message = error?.response?.data?.message;
            if (message) {
                console.log(message);
            }
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.mainWrap}>
                <View style={styles.main}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#003d3b',
                        }}>
                        Payment Method
                    </Text>
                    <View style={{gap: 10}}>
                        <View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    gap: 20,
                                    alignItems: 'center',
                                }}>
                                <View style={styles.borderRadio}>
                                    <TouchableOpacity
                                        style={[
                                            styles.radioButton,
                                            paymentMethod === '1' &&
                                                styles.radioButtonSelected,
                                        ]}
                                        onPress={() =>
                                            handlePaymentMethodChange('1')
                                        }
                                    />
                                </View>
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: 8,
                                        backgroundColor: '#fbcfe8',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <FAwesome
                                        name="credit-card"
                                        size={16}
                                        style={{color: '#be123c'}}
                                    />
                                </View>
                                <Text style={{color: '#003d3b'}}>Transfer</Text>
                            </View>
                            <ScrollView
                                styles={styles.cardWrap}
                                horizontal={true}>
                                <View style={styles.cardWrap}>
                                    <Image
                                        source={require('../assets/card.png')}
                                    />
                                    <Image
                                        source={require('../assets/card.png')}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 20,
                                alignItems: 'center',
                            }}>
                            <View style={styles.borderRadio}>
                                <TouchableOpacity
                                    style={[
                                        styles.radioButton,
                                        paymentMethod === '2' &&
                                            styles.radioButtonSelected,
                                    ]}
                                    onPress={() =>
                                        handlePaymentMethodChange('2')
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 8,
                                    backgroundColor: '#fef9c3',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <FAwesome
                                    name="university"
                                    size={16}
                                    style={{color: '#eab308'}}
                                />
                            </View>
                            <Text style={{color: '#003d3b'}}>
                                Bank Transfer
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 20,
                                alignItems: 'center',
                            }}>
                            <View style={styles.borderRadio}>
                                <TouchableOpacity
                                    style={[
                                        styles.radioButton,
                                        paymentMethod === '3' &&
                                            styles.radioButtonSelected,
                                    ]}
                                    onPress={() =>
                                        handlePaymentMethodChange('3')
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 8,
                                    backgroundColor: '#d8b4fe',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <FAwesome
                                    name="store"
                                    size={16}
                                    style={{color: '#9333ea'}}
                                />
                            </View>
                            <Text style={{color: '#003d3b'}}>Retail</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 20,
                                alignItems: 'center',
                            }}>
                            <View style={styles.borderRadio}>
                                <TouchableOpacity
                                    style={[
                                        styles.radioButton,
                                        paymentMethod === '4' &&
                                            styles.radioButtonSelected,
                                    ]}
                                    onPress={() =>
                                        handlePaymentMethodChange('4')
                                    }
                                />
                            </View>
                            <View
                                style={{
                                    width: 35,
                                    height: 35,
                                    borderRadius: 8,
                                    backgroundColor: '#a5b4fc',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <FAwesome
                                    name="dollar-sign"
                                    size={16}
                                    style={{color: '#6366f1'}}
                                />
                            </View>
                            <Text style={{color: '#003d3b'}}>E-Money</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: 20,
                            paddingTop: 70,
                        }}>
                        <View style={{width: 150}}>
                            <Text style={{color: 'black', fontWeight: '700'}}>
                                Total Payment
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    color: '#006967',
                                    fontSize: 20,
                                    fontWeight: '600',
                                }}>
                                IDR {dataBooking.totalPayment}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={doPayment}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Payment</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#006967',
    },

    main: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 50,
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: 50,
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

    cardWrap: {
        flexDirection: 'row',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        gap: 10,
    },

    button: {
        width: 170,
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
    },

    textButton: {color: 'white', fontWeight: '600'},
});

export default Payment;
