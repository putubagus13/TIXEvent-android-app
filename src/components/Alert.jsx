import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const Alert = ({children}) => {
    return (
        <View style={styles.border}>
            <Icon style={styles.textError} size={22} name="alert-circle" />
            <Text style={styles.textError}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    border: {
        width: '100%',
        height: 45,
        borderRadius: 10,
        backgroundColor: '#e11d48',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },

    textError: {color: 'white', fontWeight: '500'},
});

export default Alert;
