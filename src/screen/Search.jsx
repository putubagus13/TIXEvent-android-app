import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import http from '../helpers/http';
import moment from 'moment';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import PageButton from '../components/PageButton';

const Search = () => {
    const navigation = useNavigation();
    const [searchEvent, setSearchEvent] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();

    const eventDetail = id => {
        navigation.navigate('Detail Event', {id});
    };

    async function getDataEvent(searchEvent, page) {
        try {
            const {data} = await http().get(
                `/events?limit=10&search=${searchEvent}&page=${page}`,
            );
            console.log(data);
            setEvents(data.results);
            setTotalPage(data.pageInfo.totalPage);
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
                    <TextInput
                        onChangeText={setSearchEvent}
                        placeholder="Search Events..."
                        placeholderTextColor="#9ca3af"
                        style={styles.search}
                    />
                </View>
            }
            numColumns={2}
            contentContainerStyle={styles.containerOne}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => eventDetail(item.id)}>
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
                </TouchableOpacity>
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
                    {page === 1 ? (
                        <View style={styles.wraper}>
                            <Text style={styles.text}>Back</Text>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => setPage(page - 1)}>
                            <PageButton>Back</PageButton>
                        </TouchableOpacity>
                    )}
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: '700',
                            color: '#006967',
                        }}>
                        {page}
                    </Text>
                    {page === totalPage ? (
                        <View style={styles.wraper}>
                            <Text style={styles.text}>Next</Text>
                        </View>
                    ) : (
                        <TouchableOpacity onPress={() => setPage(page + 1)}>
                            <PageButton>Next</PageButton>
                        </TouchableOpacity>
                    )}
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
        width: 300,
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
        alignItems: 'center',
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

    wraper: {
        height: 40,
        width: 60,
        borderRadius: 5,
        backgroundColor: '#9ca3af',
        justifyContent: 'center',
    },

    text: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'white',
    },
});

export default Search;
