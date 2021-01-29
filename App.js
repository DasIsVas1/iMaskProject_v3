//import React from 'react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Camera_v2 from './components/screens/Camera_v2';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {Entypo} from '@expo/vector-icons';
import DesignMBScreen from "./components/screens/DesignMBScreen";
import UserScreen from "./components/screens/UserScreen";
import firebase from "firebase";
import LoginScreen from "./components/LoginComponent/LoginScreen";
import SignUpScreen from "./components/LoginComponent/SignUpScreen";




// --------------------- FIREBASE IMPL. START ---------------------

const fireBaseConfig = {
    apiKey: "AIzaSyB2Xe40c4U_1MrC9ffo6ubNDHod5RLpih0",
    authDomain: "innovationsprojektmbapp.firebaseapp.com",
    databaseURL: "https://innovationsprojektmbapp.firebaseio.com",
    projectId: "innovationsprojektmbapp",
    storageBucket: "innovationsprojektmbapp.appspot.com",
    messagingSenderId: "966473468096",
    appId: "1:966473468096:web:7e9b4bd1f9ed33c8e7c525"
};
// vigtigt at tilføje nedestående if statement, da ellers init firebase flere gange
if (!firebase.apps.length) {
    firebase.initializeApp(fireBaseConfig);
}

// --------------------- FIREBASE IMPL. SLUT ---------------------

// --------------------- LOGIN IMPL. START ---------------------

const LoginNavigator = createStackNavigator(
    {
        Login: {screen: LoginScreen},
        SignUp: {screen: SignUpScreen},
    },
);

const LoginContainer = createAppContainer(LoginNavigator);

// --------------------- LOGIN IMPL. SLUT ---------------------






// --------------------- BOTTOM NAVIGATOR START ---------------------
const tabNavigator = createBottomTabNavigator(
    {
        Design: {
            screen: DesignMBScreen,
            navigationOptions: {
                tabBarLabel: "Design",
                tabBarIcon: ({tintColor}) => (
                    <Entypo name="edit" size={24} color={tintColor}/>
                )
            },
        },

        Camera: {
            screen: Camera_v2,
            navigationOptions: {
                tabBarLabel: "Try",
                tabBarIcon: ({tintColor}) => (
                    <Entypo name="camera" size={24} color={tintColor}/>
                )
            },
        },
        User: {
            screen: UserScreen,
            navigationOptions: {
                tabBarLabel: "User",
                tabBarIcon: ({tintColor}) => (
                    <Entypo name="edit" size={24} color={tintColor}/>
                )
            },
        },
    },
    {
        tabBarOptions: {
            showIcon: true,
            labelStyle: {
                fontSize: 15,
            },
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            size: 40
        }
    }
);

const AppNav = createAppContainer(tabNavigator);

// --------------------- BOTTOM NAVIGATOR SLUT ---------------------

export default class App extends React.Component {

    state = {user:null}

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});
        });
    }

    render() {
        const {user} = this.state

        if (!user) {
            return (
                <LoginContainer />
            )
        } else {
            return (
                <AppNav user={user} />
            )
        }
    }
}


/*
export default class App extends React.Component {
    render() {
        return (
            <AppNav />
        )
    }
}

 */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
