import React, {Component} from "react";
import {Text, View, Image, StyleSheet, Button, TouchableOpacity} from "react-native";
import {Camera} from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import {NavigationEvents} from 'react-navigation';
import * as MediaLibrary from 'expo-media-library';

/*
* cameraRef = Referencen til Kameraet
* ComponentDiMount fortæller at der skal oprettes tiiladelse til brug af kamera og kamerarullen
* takePicture funktionen sørger for at der tages et billede og det gemmes til kamerarullen
* render metoden er render til at vise hele screen
*   onWillFocus og blur sørger for at kaeraet ikke går i sort når der skiftes screens gennem navigation + loaded metoden før <Camera>
*   onFacesDetected er den metode som fortæller om der er et ansigt på kameraet
*       FaceSquare er den metode som står for at tracke et ansigt --> Height, width og margins sættes efter ansigt dimensioner
*          Sidst indsættres der et billede i den "usyndlige" forikant som tracker ansigtet automatisk
*
 */


export default class CameraComponent extends Component {

    cameraRef = React.createRef();

    state = {
        faceSquare: {},
        loaded: true
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        this.setState({hasCameraPermission: status === "granted"});

    }

    takePicture = async () => {
        if (this.cameraRef) {
            const {uri} = await this.cameraRef.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(uri);
            console.log(asset);
        }
    };

    render() {
        const {loaded} = this.state;
        return (
            <View style={{width: "100%", flex: 1}}>
                <NavigationEvents
                    onWillFocus={payload => this.setState({loaded: true})}
                    onDidBlur={payload => this.setState({loaded: false})}/>
                <View style={{width: "100%", flex: 1}}>
                    {loaded && (
                        <Camera
                            ref={(ref) => {
                                this.cameraRef = ref
                            }}
                            type={Camera.Constants.Type.front}
                            style={{flex: 1, width: "100%", borderRadius: 5}}
                            onFacesDetected={res => {
                                console.log(res);
                                if (res.faces[0]) {
                                    this.setState({
                                        faceSquare: {
                                            width: res.faces[0].bounds.size.width,
                                            height: res.faces[0].bounds.size.height,
                                            marginLeft: res.faces[0].bounds.origin.x,
                                            marginTop: res.faces[0].bounds.origin.y,
                                        }
                                    });
                                }
                                if (res.faces.length == 0) {
                                    this.setState({
                                        faceSquare: {}
                                    });
                                }
                            }}
                            faceDetectorSettings={{
                                mode: FaceDetector.Constants.Mode.fast,
                                detectLandmarks: FaceDetector.Constants.Landmarks.none,
                                runClassifications: FaceDetector.Constants.Classifications.all,
                                minDetectionInterval: 100,
                                tracking: true
                            }}
                        >
                            {Object.keys(this.state.faceSquare) ? (
                                <View>
                                    <View
                                        style={{

                                            width: this.state.faceSquare.width,
                                            height: this.state.faceSquare.height,
                                            marginLeft: this.state.faceSquare.marginLeft,
                                            marginTop: this.state.faceSquare.marginTop,
                                        }}

                                    >

                                        <Image
                                            style={styles.logo}
                                            source={{uri: "https://pics.clipartpng.com/White_Face_Mask_PNG_Clipart-3285.png"}}
                                        />
                                    </View>
                                </View>
                            ) : null}
                        </Camera>
                    )}

                </View>

                <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
                    <Text style={styles.snapText}>SNAP</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        width: "100%",
        marginTop: 95,
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
        alignSelf: 'center',
    },
    btn1: {
        width: "100%",
    },
    capture: {
        flex: 0,
        backgroundColor: '#ecf0f1',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 10,
    },
    snapText: {
        fontSize: 14,
        color: 'black',
    },
});
