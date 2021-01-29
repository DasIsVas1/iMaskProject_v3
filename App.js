//import React from 'react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Camera_v2 from './components/screens/Camera_v2';
import Test from "./components/screens/Test";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {Entypo} from '@expo/vector-icons';
import DesignMBScreen from "./components/screens/DesignMBScreen";
import UserScreen from "./components/screens/UserScreen";




// --------------------- FIREBASE IMPL. START ---------------------

// --------------------- FIREBASE IMPL. SLUT ---------------------

// --------------------- LOGIN IMPL. START ---------------------


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
    render() {
        return (
            <AppNav />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
