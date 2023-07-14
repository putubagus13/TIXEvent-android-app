import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    colorPrimary: {color: '#006967'},
    colorSecondary: {color: '#003d3b'},
    colorAccent: {color: '#f59e0b'},
    colorNeutral: {color: '#9ca3af'},
    colorError: {color: '#e11d48'},

    input: {
        height: 45,
        width: '100%',
        borderColor: '#9ca3af',
        borderWidth: 1,
        borderRadius: 10,
        color: '#003d3b',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },

    conten: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    inputComponent: {flex: 1, color: '#003d3b'},
});

export default globalStyles;
