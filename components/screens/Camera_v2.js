import React, {Component} from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import {Camera} from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import {Icon, Button} from "native-base";

export default class CameraComponent extends Component {
    state = {
        faceSquare: {}
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === "granted"});
    }

    render() {
        return (
            <View style={{width: "100%", flex: 1}}>
                <Camera
                    type={Camera.Constants.Type.front}
                    style={{flex: 1, width: "100%"}}
                    onFacesDetected={res => {
                        console.log(res);
                        if (res.faces[0]) {
                            this.setState({
                                faceSquare: {
                                    width: res.faces[0].bounds.size.width,
                                    height: res.faces[0].bounds.size.height,
                                    marginLeft: res.faces[0].bounds.origin.x,
                                    marginTop: res.faces[0].bounds.origin.y,
                                    smillingProbability: res.faces[0].smilingProbability
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

                                <Image style={styles.logo}
                                       source={{uri: "https://pics.clipartpng.com/White_Face_Mask_PNG_Clipart-3285.png"}}
                                />
                            </View>
                        </View>
                    ) : null}
                </Camera>
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

});
