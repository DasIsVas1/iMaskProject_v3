//import React from 'react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Camera_v2 from './components/screens/Camera_v2';
import Test from "./components/screens/Test";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {Entypo} from '@expo/vector-icons';


const tabNavigator = createBottomTabNavigator(
    {
        Test: {
            screen: Test,
            navigationOptions: {
                tabBarLabel: "Test",
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
