import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";

export default class Test extends Component {
    render() {
        return (
            <View>
                <Text style={styles.container}>Dette er en test Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
     margin: 50,
    },
})
