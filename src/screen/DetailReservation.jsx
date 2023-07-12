import {View, StyleSheet, Text, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import http from '../helpers/http';
import moment from 'moment';

const DetailReservation = () => {
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);
    const [detailReservation, setDetailReservation] = React.useState({});
    const route = useRoute();
    const {id} = route.params;
    console.log(id);

    useFocusEffect(
        React.useCallback(() => {
            const history = async () => {
                try {
                    const {data} = await http(token).get(`/historys/${id}`);
                    console.log(data.results);
                    setDetailReservation(data.results);
                } catch (error) {
                    const message = error?.response?.data?.message;
                    if (message) {
                        console.log(message);
                    }
                }
            };
            history();
        }, [token, id]),
    );
    return (
        <View style={styles.mainWrap}>
            <View style={styles.main}>
                <Text
                    style={{
                        color: '#003d3b',
                        fontSize: 22,
                        fontWeight: '700',
                        textAlign: 'center',
                    }}>
                    {detailReservation?.title}
                </Text>
                <View>
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            paddingBottom: 10,
                        }}>
                        <View
                            style={{
                                width: 150,
                                height: 200,
                                overflow: 'hidden',
                                borderRadius: 10,
                            }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                                source={{
                                    uri: detailReservation?.picture,
                                }}
                            />
                        </View>
                    </View>
                    <View style={{gap: 10}}>
                        <View>
                            <Text
                                style={{
                                    color: '#9ca3af',
                                    fontSize: 14,
                                    fontWeight: '500',
                                }}>
                                Section:
                            </Text>
                            <Text
                                style={{
                                    color: '#003d3b',
                                    fontSize: 16,
                                    fontWeight: '500',
                                }}>
                                {detailReservation?.section}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: '#9ca3af',
                                    fontSize: 14,
                                    fontWeight: '500',
                                }}>
                                Date Event:
                            </Text>
                            <Text
                                style={{
                                    color: '#003d3b',
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}>
                                {moment(detailReservation?.date).format(
                                    'MMMM Do YYYY, h:mm',
                                )}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: '#9ca3af',
                                    fontSize: 14,
                                    fontWeight: '500',
                                }}>
                                Payment Date:
                            </Text>
                            <Text
                                style={{
                                    color: '#003d3b',
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}>
                                {moment(detailReservation?.createdAt).format(
                                    'MMMM Do YYYY, h:mm',
                                )}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: '#9ca3af',
                                    fontSize: 14,
                                    fontWeight: '500',
                                }}>
                                Quantity:
                            </Text>
                            <Text
                                style={{
                                    color: '#003d3b',
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}>
                                {detailReservation?.quantity}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    color: '#9ca3af',
                                    fontSize: 14,
                                    fontWeight: '500',
                                }}>
                                Paymenet Methode:
                            </Text>
                            <Text
                                style={{
                                    color: '#003d3b',
                                    fontSize: 16,
                                    fontWeight: 500,
                                }}>
                                {detailReservation?.PaymentMetode}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                            <View>
                                <Text
                                    style={{
                                        color: '#9ca3af',
                                        fontSize: 14,
                                        fontWeight: '500',
                                    }}>
                                    Total Price:
                                </Text>
                                <Text
                                    style={{
                                        color: '#003d3b',
                                        fontSize: 20,
                                        fontWeight: 700,
                                    }}>
                                    IDR {detailReservation?.price}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        color: '#9ca3af',
                                        fontSize: 14,
                                        fontWeight: '500',
                                    }}>
                                    Payment Status:
                                </Text>
                                <Text
                                    style={{
                                        color: '#003d3b',
                                        fontSize: 20,
                                        fontWeight: 700,
                                    }}>
                                    {detailReservation?.status}
                                </Text>
                            </View>
                        </View>
                    </View>
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

    main: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        marginTop: 50,
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
});

export default DetailReservation;
