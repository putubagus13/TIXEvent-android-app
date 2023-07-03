import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import {logout} from '../redux/reducers/auth';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './Home';
import Profile from './Profile';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import EvenDetail from './EvenDetail';
import MyBooking from './MyBooking';
import MyWishlist from './MyWishlist';
import Signup from './Signup';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Landingpage from './Landingpage';
import CreateEvents from './CreateEvents';
import Touchid from './Touchid';

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

function DrawerComponent() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#eaeaea',
                    width: 240,
                },
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Landingpage"
                component={Landingpage}
                options={{drawerLabel: () => null}}
            />
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
                        <FeatherIcon name="user" color={color} size={size} />
                    ),

                    drawerLabel: 'Profile',
                }}
            />
            <Drawer.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    drawerIcon: ({color, size}) => (
                        <FeatherIcon name="user" color={color} size={size} />
                    ),
                    drawerItemStyle: {
                        display: 'none',
                    },
                    drawerLabel: 'EditProfile',
                }}
            />
            <Drawer.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    drawerIcon: ({color, size}) => (
                        <FeatherIcon name="user" color={color} size={size} />
                    ),
                    drawerItemStyle: {
                        display: 'none',
                    },
                    drawerLabel: 'Change Password',
                }}
            />
            <Drawer.Screen
                name="CreateEvents"
                component={CreateEvents}
                options={{
                    drawerIcon: ({color, size}) => (
                        <FeatherIcon name="plus-circle" color={color} size={size} />
                    ),
                    drawerLabel: 'Create Event',
                }}
            />
            <Drawer.Screen
                name="MyBooking"
                component={MyBooking}
                options={{
                    drawerIcon: ({color, size}) => (
                        <FeatherIcon name="book" color={color} size={size} />
                    ),
                    drawerLabel: 'My Booking',
                }}
            />
            <Drawer.Screen
                name="MyWishlist"
                component={MyWishlist}
                options={{
                    drawerIcon: ({color, size}) => (
                        <FeatherIcon name="heart" color={color} size={size} />
                    ),
                    drawerLabel: 'My Wishlist',
                }}
            />
            <Drawer.Screen
                name="EvenDetail"
                component={EvenDetail}
                options={{
                    // drawerIcon: ({color, size}) => (
                    //     <FeatherIcon name="heart" color="white" size={size} />
                    // ),
                    drawerLabel: '',
                }}
            />
        </Drawer.Navigator>
    );
}

const Main = () => {
    const token = useSelector(state => state.auth.token);
    return (
        <NavigationContainer>
            {!token && (
                <AuthStack.Navigator screenOptions={{headerShown: false}}>
                    <AuthStack.Screen
                        name="Landingpage"
                        component={Landingpage}
                    />
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
                <>
                    <DrawerComponent />
                </>
            )}
        </NavigationContainer>
    );
};

export default Main;
