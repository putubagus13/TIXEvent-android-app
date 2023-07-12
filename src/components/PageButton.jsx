import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const PageButton = ({children}) => {
    return (
        <View style={styles.wraper}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wraper: {
        height: 40,
        width: 60,
        borderRadius: 5,
        backgroundColor: '#006967',
        justifyContent: 'center',
    },

    text: {
        textAlign: 'center',
        fontWeight: '500',
        color: 'white',
    },
});

export default PageButton;
