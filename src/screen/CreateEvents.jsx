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
import {Formik} from 'formik';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Alert from '../components/Alert';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import globalStyles from '../assets/globalStyles';
import CrtEvent from '../components/CrtEvent';
import moment from 'moment';
import UpdateEvent from '../components/UpdateEvent';

const CreateEvents = () => {
    const navigation = useNavigation();
    const [create, setCreate] = React.useState(false);
    const [update, setUpdate] = React.useState(false);
    const [events, setEvents] = React.useState([]);
    const token = useSelector(state => state.auth.token);
    const [wishList, setWishList] = React.useState([]);
    const [idUpdate, setIdUpdate] = React.useState('');

    const getEventManage = React.useCallback(async () => {
        const {data} = await http(token).get('/events/manage?limit=10');
        setEvents(data.results);
    }, [token]);

    React.useEffect(() => {
        getEventManage();
    }, [getEventManage]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvent = async () => {
                try {
                    const {data} = await http(token).get('/events/manage');
                    console.log(data.results);
                    setEvents(data.results);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            fetchEvent();
        }, [token]),
    );

    const addRemoveWishlist = async id => {
        try {
            const form = new URLSearchParams({eventId: id}).toString();
            const {data} = await http(token).get(`/wishList/${id}`);
            console.log(data);
            if (data.results) {
                const dltWishlist = await http(token).delete(`/wishList/${id}`);
                console.log(dltWishlist);
                getEventManage();
            } else if (data.message === 'wishlist not found') {
                await http(token).post('/wishList', form);
                getEventManage();
            }
        } catch (err) {
            const message = err?.response?.data?.message;
            if (message) {
                console.log(message);
            }
        }
    };

    const deleteEventsManage = async id => {
        try {
            await http(token).delete(`/events/manage/${id}`);
            getEventManage();
        } catch (error) {
            const message = error?.response?.data?.message;
            console.log(message);
        }
    };

    const doCreate = () => {
        setCreate(!create);
        getEventManage();
    };

    const updateButton = id => {
        setIdUpdate(id);
        setUpdate(!update);
        getEventManage();
    };
    React.useEffect(() => {
        async function getEventMenage() {
            try {
                const {data} = await http(token).get('/events/manage');
                console.log(data);
                setEvents(data.results);
            } catch (error) {
                const message = error?.response?.data?.message;
                if (message) {
                    console.log(message);
                }
            }
        }
        getEventMenage();
    }, [token]);

    const eventDetail = id => {
        navigation.navigate('Detail Event', {id});
    };
    return (
        <View style={styles.mainWrap}>
            <View style={styles.main}>
                {create === false && (
                    <TouchableOpacity onPress={() => setCreate(!create)}>
                        <View style={styles.dateWrap}>
                            <Icon
                                style={styles.icon}
                                name="file-plus"
                                size={20}
                            />
                            <Text style={styles.text}>Create</Text>
                        </View>
                    </TouchableOpacity>
                )}
                {create !== false && (
                    <TouchableOpacity onPress={doCreate}>
                        <Text style={styles.text}>Cancle</Text>
                    </TouchableOpacity>
                )}
                {update !== false && (
                    <TouchableOpacity onPress={updateButton}>
                        <Text style={styles.text}>Cancle</Text>
                    </TouchableOpacity>
                )}
                <View>
                    {create && <CrtEvent />}
                    {update && <UpdateEvent idUpdate={idUpdate} />}
                    {/* {events.length < 1 && (
                        <View style={styles.bookingWrap}>
                            <Text style={styles.heading}>Create new event</Text>
                            <Text style={styles.paragraf}>
                                Do a create event to share the event that was
                                shown
                            </Text>
                        </View>
                    )} */}
                    {create === false && update === false && (
                        <View style={styles.mainContain}>
                            {events.map(event => {
                                return (
                                    <View
                                        key={`event-${event.id}`}
                                        style={globalStyles.conten}>
                                        <View style={styles.eventWrap}>
                                            <View>
                                                <Text style={styles.dateText}>
                                                    {moment(event.date).format(
                                                        'DD',
                                                    )}
                                                </Text>
                                                <Text style={styles.paragraf}>
                                                    {moment(event.date).format(
                                                        'ddd',
                                                    )}
                                                </Text>
                                            </View>
                                            {event.id === event.eventId ? (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        addRemoveWishlist(
                                                            event.id,
                                                        )
                                                    }>
                                                    <Icon
                                                        style={
                                                            globalStyles.colorError
                                                        }
                                                        name="heart"
                                                        size={22}
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        addRemoveWishlist(
                                                            event.id,
                                                        )
                                                    }>
                                                    <Icon
                                                        style={
                                                            globalStyles.colorNeutral
                                                        }
                                                        name="heart"
                                                        size={22}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                        <View style={styles.event}>
                                            <Text style={styles.titleText}>
                                                {event.title}
                                            </Text>
                                            <View style={styles.eventLocation}>
                                                <Text
                                                    style={
                                                        globalStyles.colorNeutral
                                                    }>
                                                    {event.location}
                                                </Text>
                                                <Text
                                                    style={
                                                        globalStyles.colorNeutral
                                                    }>
                                                    {moment(event.date).format(
                                                        'MMMM Do YYYY, h:mm a',
                                                    )}
                                                </Text>
                                            </View>
                                            <View style={styles.option}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        eventDetail(event.id)
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
                                                        updateButton(event.id)
                                                    }>
                                                    <Text
                                                        style={
                                                            globalStyles.colorAccent
                                                        }>
                                                        Update
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        deleteEventsManage(
                                                            event.id,
                                                        )
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
                                );
                            })}
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
        justifyContent: 'space-between',
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
        gap: 15,
    },

    dateText: {
        color: '#f59e0b',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
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
        height: '100%',
        backgroundColor: '#006967',
    },

    main: {
        width: '100%',
        height: 641,
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 50,
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: 50,
    },
});

export default CreateEvents;
