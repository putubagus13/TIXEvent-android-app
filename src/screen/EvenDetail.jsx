import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';
import moment from 'moment';
import {
    useNavigation,
    useRoute,
    useFocusEffect,
} from '@react-navigation/native';
import http from '../helpers/http';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../assets/globalStyles';
import {useSelector} from 'react-redux';

const EvenDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {id} = route.params;
    const [events, setEvents] = React.useState({});
    const token = useSelector(state => state.auth.token);

    const doBooking = id => {
        navigation.navigate('Booking', {id});
    };

    const getEventDetail = React.useCallback(async () => {
        const {data} = await http().get(`/events/detail/${id}`);
        setEvents(data.results);
    }, [id]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchEventDetail = async () => {
                try {
                    const {data} = await http().get(`/events/detail/${id}`);
                    setEvents(data.results);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            fetchEventDetail();
        }, [id]),
    );

    React.useEffect(() => {
        getEventDetail();
    }, [getEventDetail]);

    const addRemoveWishlist = async () => {
        try {
            const form = new URLSearchParams({eventId: id}).toString();
            const {data} = await http(token).get(`/wishList/${id}`);
            console.log(data);
            if (data.results) {
                const dltWishlist = await http(token).delete(`/wishList/${id}`);
                console.log(dltWishlist);
                getEventDetail();
            } else if (data.message === 'wishlist not found') {
                await http(token).post('/wishList', form);
                getEventDetail();
            }
        } catch (err) {
            const message = err?.response?.data?.message;
            if (message) {
                console.log(message);
            }
        }
    };
    return (
        <View style={styles.wrapMain}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.wrapBanner}>
                    {!events.picture && (
                        <Image
                            style={styles.imageBanner}
                            source={require('../assets/Bitmap1.png')}
                        />
                    )}
                    {events.picture && (
                        <Image
                            style={styles.imageBanner}
                            source={{
                                uri: events.picture,
                            }}
                        />
                    )}
                    <LinearGradient
                        colors={[
                            'rgba(255, 255, 255, 0)',
                            'rgba(13, 12, 12, 0.7)',
                            'rgba(13, 12, 12, 1)',
                        ]}
                        style={{
                            width: '100%',
                            height: 400,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }}
                    />
                </View>
                <View style={styles.bannerTextWrap}>
                    <Text style={styles.textTittle}>{events.title}</Text>
                    <View style={styles.wrapLocationDate}>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <Icon
                                style={globalStyles.colorWhite}
                                name="map-pin"
                                size={20}
                            />
                            <Text style={styles.textLocation}>
                                {events.location}, Indonesia
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: 10}}>
                            <Icon
                                style={globalStyles.colorWhite}
                                name="clock"
                                size={20}
                            />
                            <Text style={styles.textDate}>
                                {moment(events.date).format(
                                    'MMMM Do YYYY, h:mm',
                                )}
                            </Text>
                        </View>
                        <View style={styles.wrapAttendees}>
                            <Text style={styles.attendees}>Attendees</Text>
                            <Image source={require('../assets/Group27.png')} />
                        </View>
                    </View>
                    <View style={{width: '100%', alignItems: 'flex-end'}}>
                        {events.id === events.eventId ? (
                            <TouchableOpacity
                                onPress={() => addRemoveWishlist(events.id)}>
                                <Icon
                                    style={globalStyles.colorError}
                                    name="heart"
                                    size={22}
                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => addRemoveWishlist(events.id)}>
                                <Icon
                                    style={globalStyles.colorNeutral}
                                    name="heart"
                                    size={22}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.wrapEventDetail}>
                    <Text style={styles.textHeddingone}>Event Detail</Text>
                    <Text style={styles.descriptions}>{events.desciption}</Text>
                    <Text style={styles.textHeddingone}>Event Location</Text>
                    <Image
                        source={require('../assets/Rectangle.png')}
                        style={styles.ImageLocation}
                    />
                    <TouchableOpacity onPress={() => doBooking(events.id)}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Buy Tickets</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.wrapEventLocation}>
                    <Text style={styles.textHeddingtwo}>Event Location</Text>
                    <Image
                        source={require('../assets/Rectangle.png')}
                        style={styles.ImageLocation}
                    />
                    <TouchableOpacity onPress={() => doBooking(events.id)}>
                        <View style={styles.button}>
                            <Text style={styles.textButton}>Buy Tickets</Text>
                        </View>
                    </TouchableOpacity>
                </View> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapMain: {
        position: 'relative',
        height: '100%',
    },

    wrapBanner: {width: '100%', height: 400, overflow: 'hidden'},

    imageBanner: {width: 'auto', height: 400, objectFit: 'cover'},

    wrapEventDetail: {
        marginTop: -50,
        width: '100%',
        height: '100%',
        backgroundColor: '#003d3b',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        paddingVertical: 40,
        paddingHorizontal: 30,
        gap: 15,
    },

    bannerTextWrap: {
        position: 'absolute',
        width: '100%',
        top: 80,
        paddingHorizontal: 30,
        gap: 15,
    },

    wrapLocationDate: {gap: 6},

    wrapAttendees: {gap: 8, paddingTop: 20},

    wrapEventLocation: {
        marginTop: -640,
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        paddingVertical: 40,
        paddingHorizontal: 30,
        gap: 15,
    },

    textTittle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 30,
    },

    textLocation: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    textDate: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    attendees: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    ImageLocation: {
        width: 'auto',
        objectFit: 'cover',
        height: 150,
    },

    button: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#006967',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    textButton: {color: 'white', fontWeight: '600'},

    textHeddingone: {fontSize: 20, fontWeight: '500', color: 'white'},

    descriptions: {color: 'white', textAlign: 'justify'},

    textHeddingtwo: {fontSize: 20, fontWeight: '500', color: '#003d3b'},
});

export default EvenDetail;
