import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SplashScreen = () => {
    const navigation = useNavigation();
    const token = useSelector(state => state.auth.token);
    React.useEffect(() => {
        if (token) {
            setTimeout(() => {
                navigation.navigate('Home');
            }, 1500);
        } else {
            setTimeout(() => {
                navigation.navigate('Signup');
            }, 1500);
        }
    }, [navigation, token]);

    return (
        <View style={styles.mainWrap}>
            <Text style={styles.textHeadding}>Find Events Your Love</Text>
            <View style={styles.iconWrapTwo}>
                <Image
                    style={styles.image}
                    source={require('../assets/ToyFaces2.png')}
                />
            </View>
            <View style={styles.iconWrapOne}>
                <Image
                    style={styles.image}
                    source={require('../assets/ToyFaces1.png')}
                />
            </View>
            <View style={styles.gradien} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#006967',
        position: 'relative',
    },

    textHeadding: {
        fontSize: 50,
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        paddingVertical: 30,
    },

    iconWrapTwo: {
        position: 'absolute',
        width: 230,
        height: 500,
        overflow: 'hidden',
        top: 250,
        right: -50,
    },

    image: {objectFit: 'contain', width: 'auto'},

    iconWrapOne: {
        position: 'absolute',
        width: 320,
        height: 500,
        overflow: 'hidden',
        top: 170,
        left: -60,
    },

    gradien: {
        position: 'absolute',
        bottom: 70,
        width: '100%',
        height: 100,
        backgroundColor: '#006967',
    },
});

export default SplashScreen;
