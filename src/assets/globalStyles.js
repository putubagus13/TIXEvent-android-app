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

    inputComponent: {flex: 1, color: '#003d3b'},
});

export default globalStyles;
