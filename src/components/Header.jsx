import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Header = () => {
    return (
        <View style={styles.wrap}>
            <TouchableOpacity>
                <Icon style={styles.iconStyle} size={29} name="menu" />
            </TouchableOpacity>
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
    wrap: {
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
