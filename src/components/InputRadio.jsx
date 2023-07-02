import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Radio = ({children, onChange, value}) => {
    return (
        <TouchableOpacity
            onPress={() => onChange(children)}
            style={styles.wrapper}>
            {children !== value && <View style={styles.component} />}
            {children === value && (
                <View style={styles.component}>
                    <View style={styles.inner} />
                </View>
            )}
            <Text>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        gap: 5,
    },
    component: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        backgroundColor: 'purple',
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
    },
});

export default Radio;
