import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import {logout} from '../redux/reducers/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import Profile from './Profile';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CreateEvents from './CreateEvents';
import Touchid from './Touchid';
import SpalshScreen from './SplashScreen';
import SplashScreen from './SplashScreen';
import Header from '../components/Header';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                labelColor="grey"
                onPress={() => dispatch(logout())}
                icon={({focused, color, size}) => (
                    <FeatherIcon name="log-out" color="grey" size={size} />
                )}
            />
        </DrawerContentScrollView>
    );
}

const Main = () => {
    const token = useSelector(state => state.auth.token);
    return (
        <NavigationContainer>
            {!token && (
                <AuthStack.Navigator screenOptions={{headerShown: false}}>
                    <AuthStack.Screen name="Signup" component={Signup} />
                    <AuthStack.Screen name="Login" component={Login} />
                    <AuthStack.Screen name="Touchid" component={Touchid} />
                    <AuthStack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />
                    <AuthStack.Screen
                        name="ResetPassword"
                        component={ResetPassword}
                    />
                </AuthStack.Navigator>
            )}
            {token && (
                <Drawer.Navigator
                    screenOptions={{
                        drawerStyle: {
                            backgroundColor: '#eaeaea',
                            width: 240,
                        },
                        // headerStyle: styleHeader.header,
                        // headerShadowVisible: false,
                        // headerTitleStyle: styleHeader.text,
                        header: Header,
                    }}
                    drawerContent={props => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen
                        name="Home"
                        component={Home}
                        options={{
                            drawerIcon: ({color, size}) => (
                                <FontAwesome5Icon
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            ),
                            drawerLabel: 'Home',
                        }}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            drawerIcon: ({color, size}) => (
                                <FeatherIcon
                                    name="user"
                                    color={color}
                                    size={size}
                                />
                            ),

                            drawerLabel: 'Profile',
                        }}
                    />
                    <Drawer.Screen
                        name="Create Events"
                        component={CreateEvents}
                        options={{
                            drawerIcon: ({color, size}) => (
                                <FeatherIcon
                                    name="plus-circle"
                                    color={color}
                                    size={size}
                                />
                            ),
                            drawerLabel: 'Create Event',
                        }}
                    />
                    <Drawer.Screen
                        name="My Booking"
                        component={MyBooking}
                        options={{
                            drawerIcon: ({color, size}) => (
                                <FeatherIcon
                                    name="book"
                                    color={color}
                                    size={size}
                                />
                            ),
                            drawerLabel: 'My Booking',
                        }}
                    />
                    <Drawer.Screen
                        name="My Wishlist"
                        component={MyWishlist}
                        options={{
                            drawerIcon: ({color, size}) => (
                                <FeatherIcon
                                    name="heart"
                                    color={color}
                                    size={size}
                                />
                            ),
                            drawerLabel: 'My Wishlist',
                        }}
                    />
                </Drawer.Navigator>
            )}
        </NavigationContainer>
    );
};

const styleHeader = StyleSheet.create({
    header: {
        backgroundColor: '#006967',
        textAlign: 'center',
    },

    text: {
        color: 'white',
        alignItems: 'center',
    },
});

export default Main;
