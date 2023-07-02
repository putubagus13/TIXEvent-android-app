import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import globalStyles from '../assets/globalStyles';
import Icon from 'react-native-vector-icons/Feather';

const Input = ({secureTextEntry, ...rest}) => {
    const [show, setShow] = React.useState(false);

    return (
        <View style={globalStyles.input}>
            {!secureTextEntry && (
                <TextInput {...rest} style={globalStyles.inputComponent} />
            )}
            {secureTextEntry && (
                <TextInput
                    {...rest}
                    secureTextEntry={!show}
                    style={globalStyles.inputComponent}
                />
            )}
            {secureTextEntry && (
                <TouchableOpacity onPress={() => setShow(!show)}>
                    {!show && (
                        <Icon
                            style={globalStyles.colorNeutral}
                            size={22}
                            name="eye"
                        />
                    )}
                    {show && (
                        <Icon
                            style={globalStyles.colorNeutral}
                            size={22}
                            name="eye-off"
                        />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Input;
