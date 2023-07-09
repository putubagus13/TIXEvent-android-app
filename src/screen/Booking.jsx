import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';

import FAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import Alert from '../components/Alert';

const Booking = () => {
    const route = useRoute();
    const {id} = route.params;
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);
    const [message, setMessage] = React.useState('');
    const [section, setSection] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [filledSection, setFillSection] = React.useState({
        id: 0,
        quantity: 0,
    });

    React.useEffect(() => {
        async function getSection() {
            try {
                const {data} = await http(token).get('/reservation/section');
                console.log(data);
                setSection(data.results);
            } catch (error) {
                const message = error?.response?.data?.message;
                if (message) {
                    console.log(message);
                }
            }
        }
        getSection();
    }, [token]);

    function minusValue(id) {
        const quantityMinus = filledSection.quantity - 1;
        if (quantityMinus < 0) {
            setMessage('Add quantity');
        } else {
            setFillSection({
                id,
                quantity: quantityMinus,
            });
            setMessage(' ');
        }
    }

    function plusValue(id) {
        const quantityPlus = filledSection.quantity + 1;
        if (quantityPlus > 10) {
            setMessage('Maximum is 10');
        } else {
            setFillSection({
                id,
                quantity: quantityPlus,
            });
            setMessage(' ');
            setErrorMessage('');
        }
    }

    const selectSection =
        filledSection &&
        section.filter(event => event.id === filledSection.id)[0];

    const doRegister = async () => {
        setErrorMessage('');
        try {
            const body = new URLSearchParams({
                sectionId: filledSection.id,
                quantity: filledSection.quantity,
                eventId: id,
            }).toString();
            if (filledSection.quantity === 0) {
                setErrorMessage('Ticket cannot be empty');
            } else {
                const {data} = await http(token).post('/reservation', body);
                console.log(data);
                if (data.results) {
                    navigation.navigate('Payment', {
                        dataBooking: {
                            eventId: id,
                            eventName: data.results.events.title,
                            reservationId: data.results.id,
                            sectionName: data.results.sectionName,
                            quantity: data.results.quantity,
                            totalPayment: data.results.totalPrice,
                        },
                    });
                }
            }
        } catch (error) {
            const msg = error?.response?.data?.message;
            console.log(msg);
            setErrorMessage(msg);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.mainWrap}>
                <Header>My Booking</Header>
                <View style={styles.main}>
                    <View
                        style={{
                            height: 300,
                            width: '100%',
                            overflow: 'hidden',
                            alignItems: 'center',
                        }}>
                        <Image
                            style={{
                                height: '75%',
                                width: '85%',
                                objectFit: 'cover',
                            }}
                            source={require('../assets/position.png')}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: -40,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingBottom: 10,
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#003d3b',
                                fontWeight: '500',
                            }}>
                            Tickets
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 20,
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    color: '#f59e0b',
                                }}>
                                BY PRICE
                            </Text>
                            <TouchableOpacity>
                                <FAwesome
                                    name="sort-numeric-up"
                                    size={20}
                                    style={{color: '#e11d48'}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {section.map(items => {
                        return (
                            <View
                                key={`section${items.id}`}
                                style={{
                                    flexDirection: 'row',
                                    gap: 15,
                                    paddingVertical: 10,
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: '#bfdbfe',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 10,
                                    }}>
                                    <FAwesome
                                        name="ticket-alt"
                                        size={25}
                                        style={{color: '#1d4ed8'}}
                                    />
                                </View>
                                <View style={{width: '75%', gap: 10}}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '700',
                                                    color: '#003d3b',
                                                }}>
                                                SECTION {items.name}, ROW 1
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#9ca3af',
                                                    fontSize: 12,
                                                }}>
                                                12 Seats available
                                            </Text>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: '700',
                                                    color: '#003d3b',
                                                    textAlign: 'center',
                                                }}>
                                                IDR {items.price}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#9ca3af',
                                                    fontSize: 12,
                                                    textAlign: 'center',
                                                }}>
                                                Per person
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Text style={{color: '#003d3b'}}>
                                            Quantiry
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 15,
                                            }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    minusValue(items.id)
                                                }>
                                                <View
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 5,
                                                        borderWidth: 1,
                                                        borderColor: '#9ca3af',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <FAwesome
                                                        name="minus"
                                                        size={16}
                                                        style={{
                                                            color: '#9ca3af',
                                                        }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    color: '#9ca3af',
                                                    fontSize: 16,
                                                    fontWeight: '600',
                                                }}>
                                                {items.id === filledSection.id
                                                    ? filledSection.quantity
                                                    : 0}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    plusValue(items.id)
                                                }>
                                                <View
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: 5,
                                                        borderWidth: 1,
                                                        borderColor: '#9ca3af',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <FAwesome
                                                        name="plus"
                                                        size={16}
                                                        style={{
                                                            color: '#9ca3af',
                                                        }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {message === 'Add quantity' && (
                                        <Text
                                            style={{
                                                color: '#e11d48',
                                                textAlign: 'right',
                                            }}>
                                            {message}
                                        </Text>
                                    )}
                                    {message === 'Maximum is 10' && (
                                        <Text
                                            style={{
                                                color: '#e11d48',
                                                textAlign: 'right',
                                            }}>
                                            {message}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        );
                    })}
                    {errorMessage && <Alert>{errorMessage}</Alert>}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: 20,
                        }}>
                        <View style={{width: 150}}>
                            <Text style={{color: 'black', fontWeight: '700'}}>
                                {selectSection?.name || '-'} .{' '}
                                <FAwesome
                                    name="ticket-alt"
                                    size={15}
                                    style={{color: '#9ca3af'}}
                                />{' '}
                                {filledSection.quantity} . IDR{' '}
                                {selectSection?.price *
                                    filledSection.quantity || '0'}
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#9ca3af',
                                    fontSize: 12,
                                }}>
                                Get now on Urticket
                            </Text>
                        </View>
                        <TouchableOpacity onPress={doRegister}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Chackout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    icon: {
        color: '#006967',
    },

    mainContain: {
        height: 520,
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },

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
        paddingHorizontal: 20,
        paddingTop: 50,
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

export default Booking;
