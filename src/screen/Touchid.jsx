import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Touchid = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainWrap}>
            <View style={styles.widhtAuto}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.regularLogin}>Regular Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.touchWrap}>
                <Text style={styles.textHeading}>Touch ID</Text>
                <Text style={styles.textDescription}>
                    Authenticate using app’s Touch ID instead of tentering your
                    password
                </Text>
                <TouchableOpacity style={styles.padding}>
                    <Image
                        source={require('../assets/fingericon.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        paddingHorizontal: 20,
        width: 'auto',
        gap: 50,
        backgroundColor: 'white',
        height: '100%',
    },

    widhtAuto: {width: 'auto'},

    regularLogin: {
        color: '#f59e0b',
        textAlign: 'right',
        paddingVertical: 5,
        fontWeight: '500',
    },

    touchWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
    },

    textHeading: {color: '#003d3b', fontSize: 25, fontWeight: '600'},

    textDescription: {
        textAlign: 'center',
        paddingHorizontal: '20%',
        color: '#003d3b',
    },

    image: {width: 160, height: 160},

    padding: {paddingVertical: 80},
});
export default Touchid;
