import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import React from 'react';
import http from '../helpers/http';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import globalStyles from '../assets/globalStyles';
import moment from 'moment';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailReservation from './DetailReservation';

const Stack = createNativeStackNavigator();

const MyBooking = () => {
    const navigation = useNavigation();
    const [historysData, setHistoryData] = React.useState([]);
    const token = useSelector(state => state.auth.token);

    const detailReservation = id => {
        navigation.navigate('Detail', {id});
    };

    const getReservation = React.useCallback(async () => {
        const {data} = await http(token).get('/historys');
        setHistoryData(data.results);
    }, [token]);

    React.useEffect(() => {
        getReservation();
    }, [getReservation]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchHistory = async () => {
                try {
                    const {data} = await http(token).get('/historys', {
                        params: {limit: '2'},
                    });
                    console.log(data.results);
                    setHistoryData(data.results);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            fetchHistory();
        }, [token]),
    );

    const deleteHistory = async id => {
        try {
            await http(token).delete(`/historys/${id}`);
            getReservation();
        } catch (error) {
            const message = error?.response?.data?.message;
            console.log(message);
        }
    };

    return (
        <View style={styles.mainWrap}>
            <View style={styles.main}>
                <TouchableOpacity>
                    <View style={styles.dateWrap}>
                        <Icon style={styles.icon} name="calendar" size={20} />
                        <Text style={styles.text}>March</Text>
                    </View>
                </TouchableOpacity>
                <View style={{height: 'auto'}}>
                    {historysData.length < 1 && (
                        <View style={styles.bookingWrap}>
                            <Text style={styles.heading}>No ticket bought</Text>
                            <Text style={styles.paragraf}>
                                It appears you haven’t bought any tickets yet.
                                Maybe try searching these?
                            </Text>
                        </View>
                    )}
                    {historysData.length > 0 && (
                        <View style={styles.mainContain}>
                            {historysData.map(items => (
                                <View
                                    key={`history${items.id}`}
                                    style={styles.conten}>
                                    <View style={styles.eventWrap}>
                                        <Text style={styles.dateText}>
                                            {moment(items.date).format('DD')}
                                        </Text>
                                        <Text style={styles.paragraf}>
                                            {moment(items.date).format('ddd')}
                                        </Text>
                                    </View>
                                    <View style={styles.event}>
                                        <Text style={styles.titleText}>
                                            {items.title}
                                        </Text>
                                        <View style={styles.eventLocation}>
                                            <Text
                                                style={
                                                    globalStyles.colorNeutral
                                                }>
                                                {items.location}, Indonesia
                                            </Text>
                                            <Text
                                                style={
                                                    globalStyles.colorNeutral
                                                }>
                                                {moment(items.date).format(
                                                    'MMMM Do YYYY, h:mm',
                                                )}
                                            </Text>
                                        </View>
                                        <View style={styles.option}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    detailReservation(items.id)
                                                }>
                                                <Text
                                                    style={
                                                        globalStyles.colorAccent
                                                    }>
                                                    Detail
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    deleteHistory(items.id)
                                                }>
                                                <Text
                                                    style={
                                                        globalStyles.colorAccent
                                                    }>
                                                    Delete
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        gap: 10,
    },

    eventLocation: {
        gap: 5,
    },

    event: {
        width: '100%',
        justifyContent: 'center',
        gap: 10,
        paddingHorizontal: 30,
    },

    titleText: {
        color: '#006967',
        fontSize: 22,
        fontWeight: '700',
    },

    icon: {
        color: '#006967',
    },

    eventWrap: {
        width: 50,
        alignItems: 'center',
        paddingVertical: 10,
    },

    bookingWrap: {
        height: 520,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    mainContain: {
        height: 520,
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },

    dateText: {
        color: '#f59e0b',
        fontSize: 14,
        fontWeight: '600',
    },

    conten: {
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    heading: {
        color: '#006967',
        fontSize: 22,
        fontWeight: '600',
    },

    paragraf: {
        color: '#9ca3af',
        textAlign: 'center',
    },

    text: {
        color: '#006967',
        fontWeight: '500',
    },

    dateWrap: {
        width: 120,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#ccfbf1',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    mainWrap: {
        width: '100%',
        height: '100',
        backgroundColor: '#006967',
    },

    main: {
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
const BookingStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="My Booking" component={MyBooking} />
            <Stack.Screen name="Detail" component={DetailReservation} />
        </Stack.Navigator>
    );
};
export default BookingStack;
