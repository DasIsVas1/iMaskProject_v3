import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image, ScrollView, Dimensions } from "react-native";
import Header from "./Header";


export default class HomeActivity extends Component {
    render() {

        let dimensions = Dimensions.get("window");
        let imageHeight = Math.round((dimensions.width * 9) / 16);
        let imageWidth = dimensions.width;

        return (

            <View style={styles.container}>
                <Header navigation={this.props.navigation} title='Profile Screen'/>

                <Text style={styles.headerText}>Galleri.</Text>

                <ScrollView horizontal={true}>

                    <Image
                        style={{ height: imageHeight, width: imageWidth, marginRight: 30}}
                        source={{uri: "https://imgur.com/OndeYVy.png"}}
                    />
                    <Image
                        style={{ height: imageHeight, width: imageWidth, marginRight: 30}}
                        source={{uri: "https://imgur.com/yHi7EhQ.png"}}
                    />
                    <Image
                        style={{ height: imageHeight, width: imageWidth, marginRight: 30}}
                        source={{uri: "https://imgur.com/iNYRWL3.png"}}
                    />
                    <Image
                        style={{ height: imageHeight, width: imageWidth, marginRight: 30}}
                        source={{uri: "https://imgur.com/iNYRWL3.png"}}
                    />
                    <Image
                        style={{ height: imageHeight, width: imageWidth, marginRight: 30}}
                        source={{uri: "https://imgur.com/iNYRWL3.png"}}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold",
        flex: 2,
    },
    billeder: {
        textAlign: "center",
        fontSize: 50
        ,
    }
});
