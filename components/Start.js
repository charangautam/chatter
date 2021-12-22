import React, { useState } from 'react'
import { StyleSheet, View, ImageBackground, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';

import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { FontAwesome5 } from '@expo/vector-icons';
import image from '../assets/backgroundImg.png'

export default function Start(props) {
    const [name, setName] = useState('')
    const [color, setColor] = useState('#B9C6AE')

    let [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.startDiv}>
                        <Text style={styles.title}>Chatter</Text>
                        <View style={[styles.goChatDiv, { backgroundColor: color }]}>
                            <View style={styles.searchContainer} >
                                <FontAwesome5 name={'user-astronaut'} size={24} />
                                <TextInput
                                    style={styles.nameInput}
                                    onChangeText={setName}
                                    value={name}
                                    placeholder='Your name'
                                    opacity={0.5}
                                />
                            </View>
                            <View style={{ width: "88%" }}>
                                <Text style={styles.chooseColor}>Choose a background color</Text>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    <View style={[styles.colorButtons, { backgroundColor: '#F29191' }]}>
                                        <Button title='' onPress={() => setColor('#F29191')} />
                                    </View>
                                    <View style={[styles.colorButtons, { backgroundColor: '#474056' }]}>
                                        <Button title='' onPress={() => setColor('#474056')} />
                                    </View>
                                    <View style={[styles.colorButtons, { backgroundColor: '#8A95A5' }]}>
                                        <Button title='' onPress={() => setColor('#8A95A5')} />
                                    </View>
                                    <View style={[styles.colorButtons, { backgroundColor: '#B9C6AE' }]}>
                                        <Button title='' onPress={() => setColor('#B9C6AE')} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.goChatButton}>
                                <Button
                                    title='Go to chat'
                                    color="#FFFFFF"
                                    onPress={() => {
                                        props.navigation.navigate("Chat", { name: name, color: color })
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = {
    image: {
        flex: 1,
        justifyContent: 'center'
    },
    startDiv: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    goChatDiv: {
        height: '39%',
        width: '88%',
        borderRadius: 20,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 46,
        color: '#FFFFFF',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: "88%",
        borderColor: "#DDDDDD",
        borderWidth: 2,
        padding: 16,
        marginTop: 24,
    },
    nameInput: {
        color: '#757083',
        marginLeft: 10,
        fontSize: 19,
        width: '100%',
    },
    chooseColor: {
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        color: '#757083',
    },
    colorButtons: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        marginTop: 20
    },
    goChatButton: {
        width: "88%",
        backgroundColor: '#757083',
        marginBottom: 24,
        padding: 5
    }
}
