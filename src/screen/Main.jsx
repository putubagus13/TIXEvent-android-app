import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import EvenDetail from './EvenDetail';
import Landingpage from './Landingpage';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';
import Touchid from './Touchid';
import Signup from './Signup';
import Login from './Login';
import {useSelector} from 'react-redux';
import DataReservation from './DataReservation';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import Profile from './Profile';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import CreateEvents from './CreateEvents';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const Main = () => {
    const token = useSelector(state => state.auth.token);
    const headerStyle = {
        backgroundColor: '#006967',
    };
    const headerTitleStyle = {
        color: 'white',
    };

    return (
        <NavigationContainer>
            {!token && (
                <AuthStack.Navigator
                    screenOptions={{
                        headerShadowVisible: false,
                        headerTitle: '',
                    }}>
                    <AuthStack.Screen
                        name="LandingPage"
                        component={Landingpage}
                    />
                    <AuthStack.Screen name="Signup" component={Signup} />
                    <AuthStack.Screen name="Login" component={Login} />
                    <AuthStack.Screen name="Touchid" component={Touchid} />
                    <AuthStack.Screen
                        name="ResetPassword"
                        component={ResetPassword}
                    />
                    <AuthStack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />
                </AuthStack.Navigator>
            )}

            {token && (
                <Stack.Navigator
                    screenOptions={{
                        headerShadowVisible: false,
                        headerStyle: headerStyle,
                        headerTitleStyle: headerTitleStyle,
                    }}>
                    <Stack.Screen
                        name="Create Event"
                        component={CreateEvents}
                    />
                    <Stack.Screen name="My Wishlist" component={MyWishlist} />
                    <Stack.Screen name="My Booking" component={MyBooking} />
                    <Stack.Screen name="Profile" component={Profile} />
                    <Stack.Screen name="Edit Profile" component={EditProfile} />
                    <Stack.Screen
                        name="Change Password"
                        component={ChangePassword}
                    />
                    <Stack.Screen
                        name="Detail Reservation"
                        component={DataReservation}
                    />
                    <Stack.Screen name="Event Detail" component={EvenDetail} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            )}
            {/* <Stack.Navigator
                screenOptions={{
                    headerShadowVisible: false,
                    headerStyle: headerStyle,
                    headerTitleStyle: headerTitleStyle,
                    // header: () => null,
                }}>
                <Stack.Screen name="Create Event" component={CreateEvents} />
                <Stack.Screen name="My Wishlist" component={MyWishlist} />
                <Stack.Screen name="My Booking" component={MyBooking} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Edit Profile" component={EditProfile} />
                <Stack.Screen
                    name="Change Password"
                    component={ChangePassword}
                />
                <Stack.Screen
                    name="Detail Reservation"
                    component={DataReservation}
                />
                <Stack.Screen name="Event Detail" component={EvenDetail} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator> */}
        </NavigationContainer>
    );
};

export default Main;
