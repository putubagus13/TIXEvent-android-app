import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({navigation}) => {
    const state = navigation.getState();
    const onScreen = state.history[state.history.length - 1];
    const onScreenName = state.routes.filter(o => o.key === onScreen.key);

    return (
        <View style={styles.wrap}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon style={styles.iconStyle} size={29} name="menu" />
            </TouchableOpacity>
            {!!onScreenName.length &&
                (onScreenName[0].state ? (
                    <Text style={styles.text}>
                        {
                            onScreenName[0].state.routes[
                                onScreenName[0].state.index
                            ].name
                        }
                    </Text>
                ) : (
                    <Text style={styles.text}>{onScreenName[0].name}</Text>
                ))}
            <View style={styles.iconWraper}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Icon style={styles.iconStyle} size={25} name="search" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        style={styles.iconStyle}
                        size={25}
                        name="message-square"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconWraper: {
        flexDirection: 'row',
        gap: 15,
    },

    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },

    wrap: {
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#006967',
        height: 55,
        alignItems: 'center',
    },

    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
