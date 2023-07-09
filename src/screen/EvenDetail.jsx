import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import http from '../helpers/http';

const EvenDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {id} = route.params;
    const [events, setEvents] = React.useState({});

    const doBooking = id => {
        navigation.navigate('Booking', {id});
    };

    React.useEffect(() => {
        const getEventData = async () => {
            const {data} = await http().get(`/events/detail/${id}`);
            setEvents(data.results);
        };
        getEventData(id);
    }, [id]);
    return (
        <View style={styles.wrapMain}>
            <Header>Event Detail</Header>
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
                </View>
                <View style={styles.bannerTextWrap}>
                    <Text style={styles.textTittle}>{events.title}</Text>
                    <View style={styles.wrapLocationDate}>
                        <Text style={styles.textLocation}>
                            {events.location}
                        </Text>
                        <Text style={styles.textDate}>
                            {moment(events.date).format('MMMM Do YYYY, h:mm')}
                        </Text>
                        <View style={styles.wrapAttendees}>
                            <Text style={styles.attendees}>Attendees</Text>
                            <Image source={require('../assets/Group27.png')} />
                        </View>
                    </View>
                </View>
                <View style={styles.wrapEventDetail}>
                    <Text style={styles.textHeddingone}>Event Detail</Text>
                    <Text style={styles.descriptions}>{events.desciption}</Text>
                </View>
                <View style={styles.wrapEventLocation}>
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
                </View>
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
        height: 800,
        backgroundColor: '#003d3b',
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        paddingVertical: 40,
        paddingHorizontal: 30,
        gap: 15,
    },

    bannerTextWrap: {
        position: 'absolute',
        top: 60,
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
    },

    textButton: {color: 'white', fontWeight: '600'},

    textHeddingone: {fontSize: 20, fontWeight: '500', color: 'white'},

    descriptions: {color: 'white', textAlign: 'justify'},

    textHeddingtwo: {fontSize: 20, fontWeight: '500', color: '#003d3b'},
});

export default EvenDetail;
