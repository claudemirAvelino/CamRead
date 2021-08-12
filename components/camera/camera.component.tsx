import React, {useState, useEffect} from 'react';
// @ts-ignore
import {Camera} from 'expo-camera';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {
    camActive: boolean,
    closeCam: object
}

export default function CameraExpo({ camActive, closeCam } : Props) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(true);
        })();
    }, []);

    return (
        <View style={styles.view}>
        {
            camActive ?
                <Camera style={styles.camera} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={styles.text}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                closeCam(false);
                            }}>
                            <Text style={styles.text}> X </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
                :
                <Text>Teste</Text>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        position: "absolute",
        width: '100%',
        height: '100%'
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: 30
    },
    closeButton: {
        flex: 1,
        flexDirection: "row-reverse",

    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});
