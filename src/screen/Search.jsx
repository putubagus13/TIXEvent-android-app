import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import http from '../helpers/http';
import moment from 'moment';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';

const Search = () => {
    const navigation = useNavigation();
    const [searchEvent, setSearchEvent] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const eventDetail = id => {
        navigation.navigate('EvenDetail', {id});
    };

    async function getDataEvent(searchEvent, page) {
        try {
            const {data} = await http().get(
                `/events?limit=10&search=${searchEvent}&page=${page}`,
            );
            console.log(data);
            setEvents(data.results);
        } catch (error) {
            const message = error?.response?.data?.message;
            if (message) {
                console.log(message);
            }
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const fetchEvents = async () => {
                try {
                    const {data} = await http().get('/events');
                    console.log(data);
                    setEvents(data.results);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            fetchEvents();
        }, []),
    );

    React.useEffect(() => {
        getDataEvent(searchEvent, page);
    }, [searchEvent, page]);

    return (
        <FlatList
            data={events}
            ListHeaderComponent={
                <View style={styles.mainWrap}>
                    <Header>Search</Header>
                    <TextInput
                        onChangeText={setSearchEvent}
                        placeholder="Search"
                        placeholderTextColor="#9ca3af"
                        style={styles.search}
                    />
                </View>
            }
            numColumns={2}
            contentContainerStyle={styles.containerOne}
            renderItem={({item}) => (
                <View style={styles.bannerContainer}>
                    {!events && (
                        <Image
                            style={styles.banner}
                            source={require('../assets/Bitmap.png')}
                        />
                    )}
                    {events && (
                        <Image
                            style={styles.banner}
                            source={{
                                uri: item.picture,
                            }}
                        />
                    )}
                    <View style={styles.wrapTextBanner}>
                        <Text style={styles.textWhite}>
                            {moment(item.date).format('MMMM Do YYYY, h:mm')}
                        </Text>
                        <Text style={styles.textTitle}>{item.title}</Text>
                    </View>
                </View>
            )}
            ListFooterComponent={
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 15,
                        paddingVertical: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => setPage(page - 1)}>
                        <View
                            style={{
                                height: 40,
                                width: 60,
                                borderRadius: 5,
                                backgroundColor: '#006967',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}>
                                Back
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: '700',
                            color: '#006967',
                        }}>
                        {page}
                    </Text>
                    <TouchableOpacity onPress={() => setPage(page + 1)}>
                        <View
                            style={{
                                height: 40,
                                width: 60,
                                borderRadius: 5,
                                backgroundColor: '#006967',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '500',
                                }}>
                                Next
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        width: '100%',
        backgroundColor: 'white',
        height: 'auto',
    },

    search: {
        width: 'auto',
        height: 45,
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderRadius: 10,
        color: '#003d3b',
        paddingHorizontal: 16,
        marginVertical: 30,
        marginHorizontal: 40,
    },

    containerOne: {
        width: '100%',
        backgroundColor: 'white',
        height: 'auto',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
    },

    bannerContainer: {
        width: 150,
        height: 180,
        overflow: 'hidden',
        borderRadius: 20,
        margin: 5,
        position: 'relative',
    },

    banner: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },

    wrapTextBanner: {
        position: 'absolute',
        bottom: 60,
        left: 0,
        paddingHorizontal: 20,
        gap: 10,
    },

    textWhite: {color: 'white'},

    textTitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 20,
    },
});

export default Search;
