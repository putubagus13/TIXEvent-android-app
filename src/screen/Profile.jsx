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

const Profile = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainWrap}>
            <View style={styles.main}>
                <View style={styles.picture}>
                    <View style={styles.imageWrap}>
                        <Image
                            style={styles.image}
                            source={require('../assets/user.png')}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.colorSecondary}>Lex Alexander</Text>
                    <Text style={styles.colorNeutral}>Developer, ID</Text>
                </View>
                <View style={styles.flexDrx}>
                    <Text style={styles.heading}>Card</Text>
                    <View style={styles.iconWrap}>
                        <Icon style={styles.icon} name="plus" size={22} />
                    </View>
                </View>
                <ScrollView styles={styles.cardWrap} horizontal={true}>
                    <View style={styles.cardWrap}>
                        <Image source={require('../assets/card.png')} />
                        <Image source={require('../assets/card.png')} />
                    </View>
                </ScrollView>
                <View style={{gap: 20, paddingBottom: 30}}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Edit Profile')}>
                        <View style={styles.wrap}>
                            <View style={styles.editProfile}>
                                <Icon
                                    style={styles.icon}
                                    name="edit-3"
                                    size={20}
                                />
                                <Text style={styles.secondary}>
                                    Edit Profile
                                </Text>
                            </View>
                            <Icon
                                style={styles.icon}
                                size={20}
                                name="chevron-right"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Change Password')}>
                        <View style={styles.wrap}>
                            <View style={styles.editProfile}>
                                <Icon
                                    style={styles.icon}
                                    name="lock"
                                    size={20}
                                />
                                <Text style={styles.secondary}>
                                    Change Password
                                </Text>
                            </View>
                            <Icon
                                style={styles.icon}
                                size={20}
                                name="chevron-right"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006967',
    },

    editProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 30,
    },

    wrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardWrap: {
        flexDirection: 'row',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        gap: 10,
    },

    flexDrx: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },

    colorSecondary: {
        color: '#003d3b',
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
    },

    secondary: {
        color: '#003d3b',
        fontSize: 14,
        fontWeight: '500',
    },

    iconWrap: {
        height: 35,
        width: 35,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        borderColor: '#003d3b',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        color: '#003d3b',
    },

    heading: {
        color: '#003d3b',
        fontWeight: '700',
        fontSize: 18,
    },

    colorNeutral: {color: '#9ca3af', textAlign: 'center'},

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

    picture: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageWrap: {
        overflow: 'hidden',
        height: 100,
        width: 100,
        borderWidth: 3,
        borderColor: '#006967',
        borderRadius: 100,
        padding: 3,
    },

    image: {
        objectFit: 'cover',
        height: 80,
        width: 'auto',
        borderRadius: 100,
        margin: 3,
    },
});

export default Profile;
