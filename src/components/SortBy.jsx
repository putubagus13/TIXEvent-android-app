import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const SortBy = ({children}) => {
    return (
        <View style={styles.wraper}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wraper: {
        backgroundColor: '#f59e0b',
        height: 25,
        width: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
    },
});

export default SortBy;
