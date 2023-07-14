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
import globalStyles from '../assets/globalStyles';
import SortBy from '../components/sortBy';
import LinearGradient from 'react-native-linear-gradient';

const Search = () => {
    const navigation = useNavigation();
    const [searchEvent, setSearchEvent] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();
    const [sortBy, setSortBy] = React.useState('');
    console.log(sortBy);

    const eventDetail = id => {
        navigation.navigate('Detail Event', {id});
    };

    async function getDataEvent(searchEvent, page, sortBy) {
        try {
            const {data} = await http().get(
                `/events?limit=10&search=${searchEvent}&page=${page}&sortBy=${sortBy}`,
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
        getDataEvent(searchEvent, page, sortBy);
    }, [searchEvent, page, sortBy]);

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
                    <View style={{flexDirection: 'row', gap: 5}}>
                        <Text style={{color: 'black'}}>SortBy: </Text>
                        {sortBy === 'DESC' ? (
                            <TouchableOpacity onPress={() => setSortBy('DESC')}>
                                <SortBy>DESC</SortBy>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setSortBy('DESC')}>
                                <View style={styles.wraperSortBy}>
                                    <Text style={styles.textSortBy}>DESC</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        {sortBy === 'ASC' ? (
                            <TouchableOpacity onPress={() => setSortBy('ASC')}>
                                <SortBy>ASC</SortBy>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setSortBy('ASC')}>
                                <View style={styles.wraperSortBy}>
                                    <Text style={styles.textSortBy}>ASC</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
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
                        <LinearGradient
                            colors={[
                                'rgba(225, 225, 225, 0)',
                                'rgba(13, 12, 12, 1)',
                            ]}
                            style={{
                                position: 'absolute',
                                width: 150,
                                height: 180,
                                top: 0,
                                left: 0,
                            }}
                        />
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
        height: 'auto',
        paddingHorizontal: 40,
        gap: 10,
        paddingVertical: 30,
    },

    search: {
        width: 300,
        height: 45,
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderRadius: 10,
        color: '#003d3b',
        paddingHorizontal: 16,
    },

    containerOne: {
        width: '100%',
        height: 'auto',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        alignItems: 'center',
    },

    bannerContainer: {
        position: 'relative',
        width: 150,
        height: 180,
        overflow: 'hidden',
        borderRadius: 20,
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
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

    wraperSortBy: {
        height: 25,
        width: 50,
        backgroundColor: '#f59e0b',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textSortBy: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
    },
});

export default Search;
