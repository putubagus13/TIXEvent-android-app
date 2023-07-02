import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '../assets/globalStyles';

const Home = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainWrap}>
            <Header />
            <TextInput
                placeholder="Search"
                placeholderTextColor="#9ca3af"
                style={styles.search}
            />
            <View style={styles.containerOne}>
                <View name="date" style={styles.dateWrap}>
                    <View style={styles.date}>
                        <Text>13</Text>
                        <Text style={styles.dayPadding}>Mon</Text>
                    </View>
                    <View style={styles.date}>
                        <Text>14</Text>
                        <Text style={styles.dayPadding}>Tue</Text>
                    </View>
                    <View style={styles.dateSelect}>
                        <Text style={styles.colorDateSelect}>15</Text>
                        <Text style={styles.colorDaySelect}>Wen</Text>
                        <View style={styles.dot} />
                    </View>
                    <View style={styles.date}>
                        <Text>16</Text>
                        <Text style={styles.dayPadding}>Thu</Text>
                    </View>
                    <View style={styles.date}>
                        <Text>17</Text>
                        <Text style={styles.dayPadding}>Fri</Text>
                    </View>
                    <View />
                </View>
                <View style={styles.scrollVertical}>
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <View name="main-content" style={styles.main}>
                            <View style={styles.bannerWrap}>
                                <Text style={styles.textHeadding}>
                                    Events for You
                                </Text>
                                <View style={styles.filter}>
                                    <Icon
                                        style={styles.Icon}
                                        name="list"
                                        size={24}
                                    />
                                </View>
                            </View>
                            <View style={styles.wrapBanner}>
                                <ScrollView horizontal={true}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('')}>
                                        <View style={styles.bannerContainer}>
                                            <Image
                                                style={styles.banner}
                                                source={require('../assets/Bitmap1.png')}
                                            />
                                            <View style={styles.wrapTextBanner}>
                                                <Text style={styles.textWhite}>
                                                    Wed, 15 Nov, 04.00 PM
                                                </Text>
                                                <Text style={styles.textTitle}>
                                                    Sights & Sounds Exhibition
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('')}>
                                        <View style={styles.bannerContainer}>
                                            <Image
                                                style={styles.banner}
                                                source={require('../assets/Bitmap.png')}
                                            />
                                            <View style={styles.wrapTextBanner}>
                                                <Text style={styles.textWhite}>
                                                    Wed, 15 Nov, 04.00 PM
                                                </Text>
                                                <Text style={styles.textTitle}>
                                                    Sights & Sounds Exhibition
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('')}>
                                        <View style={styles.bannerContainer}>
                                            <Image
                                                style={styles.banner}
                                                source={require('../assets/Bitmap1.png')}
                                            />
                                            <View style={styles.wrapTextBanner}>
                                                <Text style={styles.textWhite}>
                                                    Wed, 15 Nov, 04.00 PM
                                                </Text>
                                                <Text style={styles.textTitle}>
                                                    Sights & Sounds Exhibition
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('')}>
                                        <View style={styles.bannerContainer}>
                                            <Image
                                                style={styles.banner}
                                                source={require('../assets/Bitmap.png')}
                                            />
                                            <View style={styles.wrapTextBanner}>
                                                <Text style={styles.textWhite}>
                                                    Wed, 15 Nov, 04.00 PM
                                                </Text>
                                                <Text style={styles.textTitle}>
                                                    Sights & Sounds Exhibition
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                            <View style={styles.bannerWrap}>
                                <Text style={styles.textHeadding}>
                                    Discover
                                </Text>
                            </View>
                            <View style={styles.wrapBanner}>
                                <ScrollView horizontal={true}>
                                    <View style={styles.discover}>
                                        <View style={styles.discoverChildren}>
                                            <Icon
                                                style={styles.locationIcon}
                                                name="map-pin"
                                                size={19}
                                            />
                                        </View>
                                        <Text>YOUR AREA</Text>
                                    </View>
                                    <View style={styles.discover}>
                                        <View style={styles.discoverChildren}>
                                            <Icon
                                                style={styles.locationIcon}
                                                name="music"
                                                size={19}
                                            />
                                        </View>
                                        <Text>MUSIC</Text>
                                    </View>
                                    <View style={styles.discover}>
                                        <View style={styles.discoverChildren}>
                                            <Icon
                                                style={styles.locationIcon}
                                                name="film"
                                                size={19}
                                            />
                                        </View>
                                        <Text>MOVIE</Text>
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.bannerWrap}>
                                <Text style={styles.textHeadding}>
                                    Upcoming
                                </Text>
                                <TouchableOpacity>
                                    <Text style={styles.seeAll}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.monthText}>SEP</Text>
                                <View style={styles.gruping}>
                                    <View>
                                        <View style={styles.brdDate}>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                15
                                            </Text>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                Tue
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate('')
                                            }>
                                            <View
                                                style={styles.bannerContainer}>
                                                <Image
                                                    style={styles.banner}
                                                    source={require('../assets/Bitmap.png')}
                                                />
                                                <View
                                                    style={
                                                        styles.wrapTextBanner
                                                    }>
                                                    <Text
                                                        style={
                                                            styles.textWhite
                                                        }>
                                                        Wed, 15 Nov, 04.00 PM
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.textTitle
                                                        }>
                                                        Sights & Sounds
                                                        Exhibition
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={styles.button}>
                                                <Text style={styles.textButton}>
                                                    See All 5 Event
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.gruping}>
                                    <View>
                                        <View style={styles.brdDate}>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                15
                                            </Text>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                Tue
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate('')
                                            }>
                                            <View
                                                style={styles.bannerContainer}>
                                                <Image
                                                    style={styles.banner}
                                                    source={require('../assets/Bitmap.png')}
                                                />
                                                <View
                                                    style={
                                                        styles.wrapTextBanner
                                                    }>
                                                    <Text
                                                        style={
                                                            styles.textWhite
                                                        }>
                                                        Wed, 15 Nov, 04.00 PM
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.textTitle
                                                        }>
                                                        Sights & Sounds
                                                        Exhibition
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={styles.button}>
                                                <Text style={styles.textButton}>
                                                    See All 5 Event
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.gruping}>
                                    <View>
                                        <View style={styles.brdDate}>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                15
                                            </Text>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                Tue
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate('')
                                            }>
                                            <View
                                                style={styles.bannerContainer}>
                                                <Image
                                                    style={styles.banner}
                                                    source={require('../assets/Bitmap.png')}
                                                />
                                                <View
                                                    style={
                                                        styles.wrapTextBanner
                                                    }>
                                                    <Text
                                                        style={
                                                            styles.textWhite
                                                        }>
                                                        Wed, 15 Nov, 04.00 PM
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.textTitle
                                                        }>
                                                        Sights & Sounds
                                                        Exhibition
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={styles.button}>
                                                <Text style={styles.textButton}>
                                                    See All 5 Event
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.gruping}>
                                    <View>
                                        <View style={styles.brdDate}>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                15
                                            </Text>
                                            <Text
                                                style={
                                                    globalStyles.colorSecondary
                                                }>
                                                Tue
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate('')
                                            }>
                                            <View
                                                style={styles.bannerContainer}>
                                                <Image
                                                    style={styles.banner}
                                                    source={require('../assets/Bitmap.png')}
                                                />
                                                <View
                                                    style={
                                                        styles.wrapTextBanner
                                                    }>
                                                    <Text
                                                        style={
                                                            styles.textWhite
                                                        }>
                                                        Wed, 15 Nov, 04.00 PM
                                                    </Text>
                                                    <Text
                                                        style={
                                                            styles.textTitle
                                                        }>
                                                        Sights & Sounds
                                                        Exhibition
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={styles.button}>
                                                <Text style={styles.textButton}>
                                                    See All 5 Event
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        width: '100%',
        backgroundColor: '#006967',
        height: '100%',
        paddingVertical: 20,
    },

    search: {
        width: 'auto',
        height: 45,
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderRadius: 10,
        color: '#003d3b',
        paddingHorizontal: 16,
        marginHorizontal: 40,
        marginVertical: 30,
    },

    containerOne: {
        width: '100%',
        backgroundColor: '#003d3b',
        height: '100%',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingTop: 10,
    },

    dateWrap: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        paddingVertical: 10,
    },

    date: {
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        borderRadius: 15,
        width: 50,
        height: 80,
        // borderColor: 'white',
    },

    colorDateSelect: {color: '#f59e0b'},

    colorDaySelect: {paddingBottom: 5, color: '#f59e0b'},

    dayPadding: {paddingBottom: 5},

    textHeadding: {
        color: '#003d3b',
        fontSize: 20,
        fontWeight: '500',
    },

    button: {
        width: 'auto',
        height: 45,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#006967',
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    textButton: {color: '#006967', fontWeight: '500'},

    filter: {
        width: 30,
        height: 30,
        shadowRadius: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textWhite: {color: 'white'},

    textTitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },

    bannerWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    scrollVertical: {
        flexDirection: 'column',
        borderRadius: 45,
        height: 'auto',
        overflow: 'scroll',
    },

    wrapBanner: {
        flexDirection: 'row',
        gap: 10,
        overflow: 'scroll',
        paddingVertical: 10,
    },

    main: {
        width: '100%',
        backgroundColor: '#e1f4f5',
        height: '100%',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingVertical: 40,
        paddingHorizontal: 20,
    },

    Icon: globalStyles.colorSecondary,

    locationIcon: {color: '#0ea5e9'},

    dateSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        width: 50,
        height: 80,
        borderColor: '#f59e0b',
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        backgroundColor: '#f59e0b',
    },

    bannerContainer: {
        width: 210,
        height: 280,
        overflow: 'hidden',
        borderRadius: 20,
        marginHorizontal: 5,
        position: 'relative',
    },

    banner: {
        objectFit: 'contain',
        width: 'auto',
        height: 300,
        borderRadius: 20,
    },

    wrapTextBanner: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        paddingHorizontal: 20,
        gap: 10,
    },

    discover: {
        backgroundColor: '#0ea5e9',
        width: 150,
        borderRadius: 50,
        flexDirection: 'row',
        gap: 7,
        paddingVertical: 7,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },

    discoverChildren: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    seeAll: {
        color: '#f59e0b',
        fontSize: 14,
    },

    monthText: {
        color: '#e11d48',
        width: 50,
        textAlign: 'center',
        paddingVertical: 5,
        fontWeight: '500',
    },

    gruping: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    brdDate: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: 50,
        alignItems: 'center',
        paddingVertical: 10,
    },
});

export default Home;
