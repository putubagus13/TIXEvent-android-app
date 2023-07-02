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
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../assets/globalStyles';
import CrtEvent from '../components/CrtEvent';

const CreateEvents = () => {
    const navigation = useNavigation();
    const [create, setCreate] = React.useState(false);
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
                    <TouchableOpacity onPress={() => setCreate(!create)}>
                        <Text style={styles.text}>Cancle</Text>
                    </TouchableOpacity>
                )}
                <View>
                    {create && <CrtEvent />}
                    {/* <View style={styles.bookingWrap}>
                        <Text style={styles.heading}>Create new event</Text>
                        <Text style={styles.paragraf}>
                            Do a create event to share the event that was shown
                        </Text>
                    </View> */}
                    {create === false && (
                        <View style={styles.mainContain}>
                            <View style={styles.conten}>
                                <View style={styles.eventWrap}>
                                    <View>
                                        <Text style={styles.dateText}>15</Text>
                                        <Text style={styles.paragraf}>Wed</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon
                                            style={styles.icon}
                                            name="heart"
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.event}>
                                    <Text style={styles.titleText}>
                                        Sights & Sounds Exhibition
                                    </Text>
                                    <View style={styles.eventLocation}>
                                        <Text style={globalStyles.colorNeutral}>
                                            Jakarta, Indonesia
                                        </Text>
                                        <Text style={globalStyles.colorNeutral}>
                                            Wed, 15 Nov, 4:00 PM
                                        </Text>
                                    </View>
                                    <View style={styles.option}>
                                        <TouchableOpacity>
                                            <Text
                                                style={
                                                    globalStyles.colorAccent
                                                }>
                                                Detail
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Text
                                                style={
                                                    globalStyles.colorAccent
                                                }>
                                                Update
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
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
        gap: 10,
    },

    dateText: {
        color: '#f59e0b',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
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
