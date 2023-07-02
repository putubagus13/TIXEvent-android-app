import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';

const DataReservation = () => {
    return (
        <View style={styles.wrapMain}>
            <View style={styles.wrapBanner}>
                <Image
                    source={require('../assets/Bitmap1.png')}
                    style={styles.imageBanner}
                />
            </View>
            <View style={styles.bannerTextWrap}>
                <Text style={styles.textTittle}>
                    Sights & Sounds Exhibition
                </Text>
                <View style={styles.wrapLocationDate}>
                    <Text style={styles.textLocation}>Jakarta, Indonesia</Text>
                    <Text style={styles.textDate}>Wen, 14 Nov, 04.00 PM</Text>
                    <View style={styles.wrapAttendees}>
                        <Text style={styles.attendees}>Attendees</Text>
                        <Image source={require('../assets/Group27.png')} />
                    </View>
                </View>
            </View>
            <View style={styles.wrapEventDetail}>
                <Text style={styles.textHeddingone}>Event Detail</Text>
                <Text style={styles.descriptions}>
                    After his controversial art exhibition "Tear and Consume"
                    back in November 2018, in which guests were invited to tear
                    up…
                </Text>
            </View>
            <View style={styles.wrapEventLocation}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        paddingVertical: 16,
                        justifyContent: 'space-around',
                        gap: 20,
                    }}>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#884DFF',
                            borderRadius: 20,
                        }}>
                        <Text style={{color: 'white', fontSize: 14}}>
                            Ticket
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '700',
                            }}>
                            VIP
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#FF3D71',
                            borderRadius: 20,
                        }}>
                        <Text style={{color: 'white', fontSize: 14}}>
                            Qantidy
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '700',
                            }}>
                            2
                        </Text>
                    </View>
                    <View
                        style={{
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#FF8900',
                            borderRadius: 20,
                        }}>
                        <Text style={{color: 'white', fontSize: 14}}>
                            Price
                        </Text>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: '700',
                            }}>
                            $70
                        </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>Buy Tickets</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapMain: {
        position: 'relative',
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
        height: '100%',
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

export default DataReservation;
