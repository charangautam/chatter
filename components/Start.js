import React from 'react'
import { StyleSheet, View, ImageBackground, Text, TextInput, Button, TouchableOpacity } from 'react-native';

// font awesome | bg img
import { FontAwesome5 } from '@expo/vector-icons';
import image from '../assets/backgroundImg.png'


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            color: '#064635'
        }
    }

    render() {
        const colors = ['#8E0505', '#22577A', '#AE431E', '#064635']
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.startDiv}>
                        <Text style={[styles.title, { color: this.state.color }]}>Chatter</Text>
                        <View style={[styles.goChatDiv, { backgroundColor: this.state.color }]}>
                            <View style={styles.searchContainer} >
                                <FontAwesome5 name={'user-astronaut'} size={24} />
                                <TextInput
                                    style={styles.userInput}
                                    onChangeText={(user) => this.setState({ user })}
                                    value={this.state.user}
                                    placeholder='Your name'
                                    opacity={0.5}
                                />
                            </View>
                            <View style={{ width: "88%" }}>
                                <Text style={styles.chooseColor}>Choose a background color</Text>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                    {
                                        colors.map(c =>
                                            <TouchableOpacity
                                                style={[styles.colorButtons, { backgroundColor: c, borderColor: this.state.color === c ? 'white' : null }]}
                                                onPress={() => this.setState({ color: c })}
                                                key={c}>
                                            </TouchableOpacity>
                                        )
                                    }
                                </View>
                            </View>
                            <View style={styles.goChatButton}>
                                <Button
                                    title='Go to chat'
                                    // pass in user and color state to Chat.js
                                    onPress={() => {
                                        this.props.navigation.navigate("Chat", { user: this.state.user, color: this.state.color })
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

const styles = StyleSheet.create({
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
        fontWeight: "700",
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
    userInput: {
        color: '#757083',
        marginLeft: 10,
        fontSize: 19,
        width: '100%',
    },
    chooseColor: {
        fontSize: 16,
        fontWeight: "600",
        color: 'white',
    },
    colorButtons: {
        borderWidth: 2,
        width: 50,
        height: 50,
        marginTop: 20,
        borderRadius: 50
    },
    goChatButton: {
        width: "88%",
        backgroundColor: '#212121',
        marginBottom: 24,
        padding: 5,
    }
})
