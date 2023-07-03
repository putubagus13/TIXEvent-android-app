import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Header = ({children}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.wrap}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon style={styles.iconStyle} size={29} name="menu" />
            </TouchableOpacity>
            <Text style={styles.text}>{children}</Text>
            <TouchableOpacity>
                <Icon
                    style={styles.iconStyle}
                    size={25}
                    name="message-square"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
        paddingVertical: 20,
        backgroundColor: '#006967',
    },

    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
