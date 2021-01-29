import React, {Component} from "react";
import {Text, View, Image, StyleSheet} from "react-native";
import {Camera} from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import {NavigationEvents} from 'react-navigation';


export default class CameraComponent extends Component {

    cameraRef = React.createRef();

    state = {
        faceSquare: {},
        loaded: true
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === "granted"});

    }

    // Kode stykke, som burde håndtere at kamera bliver sort når man skifter via navigation, dog skal jeg finde en metode
    // så jeg kan implementere det i en async componentDidMountMetode()

    /*

    componentDidMount() {
        this.updateNavigation();
    }

    updateNavigation = async () => {

        const {navigation} = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({focusedScreen: true})
        );
        navigation.addListener('willBlur', () =>
            this.setState({focusedScreen: false})
        );
    }

     */

    render() {
        const {loaded} = this.state;
        return (
            <View style={{width: "100%", flex: 1}}>
                <NavigationEvents
                    onWillFocus={payload => this.setState({loaded: true})}
                    onDidBlur={payload => this.setState({loaded: false})} />
                    <View style={{width: "100%", flex: 1}}>
                        {loaded && (


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
                        )}

                    </View>

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
