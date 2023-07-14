import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React from 'react';
import http from '../helpers/http';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import globalStyles from '../assets/globalStyles';
import moment from 'moment';
import PageButton from '../components/PageButton';

const MyWishlist = () => {
    const navigation = useNavigation();
    const [page, setPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState();
    const [wishList, setWishList] = React.useState([]);
    const token = useSelector(state => state.auth.token);
    console.log(wishList);

    const getWishLish = React.useCallback(async () => {
        try {
            const {data} = await http(token).get(
                `/wishList?page=${page}&limit=5`,
            );
            setWishList(data.results);
        } catch (error) {
            const message = error?.response?.data?.message;
            if (message) {
                console.log(message);
            }
        }
    }, [token, page]);

    React.useEffect(() => {
        getWishLish(page);
    }, [getWishLish, page]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchWishlish = async () => {
                try {
                    const {data} = await http(token).get('/wishList');
                    setWishList(data.results);
                    setTotalPage(data.pageInfo.totalPage);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            fetchWishlish();
        }, [token]),
    );

    const doRemoveWishList = async id => {
        try {
            await http(token).delete(`/wishList/${id}`);
            getWishLish();
        } catch (error) {
            const message = error?.response?.data?.message;
            if (message) {
                console.log(message);
            }
        }
    };
    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.mainWrap}>
                <View style={styles.main}>
                    <View>
                        {wishList.length < 1 && (
                            <View style={styles.bookingWrap}>
                                <Text style={styles.heading}>
                                    No ticket bought
                                </Text>
                                <Text style={styles.paragraf}>
                                    It appears you haven’t bought any tickets
                                    yet. Maybe try searching these?
                                </Text>
                            </View>
                        )}
                        <View style={styles.mainContain}>
                            {wishList.map(items => (
                                <View
                                    style={styles.conten}
                                    key={`wishlist${items.id}`}>
                                    <View style={styles.eventWrap}>
                                        <View>
                                            <Text style={styles.dateText}>
                                                {moment(items.date).format(
                                                    'DD',
                                                )}
                                            </Text>
                                            <Text style={styles.paragraf}>
                                                {moment(items.date).format(
                                                    'ddd',
                                                )}
                                            </Text>
                                        </View>
                                        {items.idEvent === items.eventId && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    doRemoveWishList(
                                                        items.eventId,
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
                                        )}
                                    </View>
                                    <View style={styles.event}>
                                        <Text style={styles.titleText}>
                                            {items.title}
                                        </Text>
                                        <View style={styles.eventLocation}>
                                            <Text
                                                style={
                                                    globalStyles.colorNeutral
                                                }>
                                                {items.location}, Indonesia
                                            </Text>
                                            <Text
                                                style={
                                                    globalStyles.colorNeutral
                                                }>
                                                {moment(items.date).format(
                                                    'MMMM Do YYYY, h:mm a',
                                                )}
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
                                        </View>
                                    </View>
                                </View>
                            ))}
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
                                    <TouchableOpacity
                                        onPress={() => setPage(page - 1)}>
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
                                    <TouchableOpacity
                                        onPress={() => setPage(page + 1)}>
                                        <PageButton>Next</PageButton>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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

    icon: {
        color: '#006967',
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
        height: '100%',
        width: '100%',
        alignItems: 'center',
        gap: 10,
    },

    dateText: {
        color: '#f59e0b',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
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

    mainWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006967',
    },

    main: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 50,
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: 50,
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

export default MyWishlist;
