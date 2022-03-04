import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// gifted chat
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

// firebase | firestore
import firebase from 'firebase';
import 'firebase/firestore';

// user actions
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

// config
import { FIREBASE_CONFIG } from '@env'


export default class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: 1,
            messages: [],
            user: {
                _id: 1,
                name: '',
                avatar: '',
            },
            isConnected: false,
            image: null,
            location: null
        }

        const firebaseConfig = FIREBASE_CONFIG

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        this.referenceChatMessages = firebase.firestore().collection("messages")
    }

    getMessages = async () => {
        // load messages from local AsyncStorage 
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || []
            this.setState({
                messages: JSON.parse(messages)
            })
        } catch (error) {
            console.log(error.message)
        }
    };

    saveMessages = async () => {
        // save messages from database into local AsyncStorage
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages))
        } catch (error) {
            console.log(error.message)
        }
    }

    deleteMessages = async () => {
        // not called in app used in development only
        // delete stored messages in local AsyncStorage
        try {
            await AsyncStorage.removeItem('messages')
            this.setState({ messages: [] })
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount() {
        // get username prop from Start.js
        let name = this.props.route.params.user
        if (name === '') name = 'UNNAMED'
        this.props.navigation.setOptions({ title: name })

        NetInfo.fetch().then(connection => {
            // if user is online
            if (connection.isConnected) {
                // listens for updates in messages collection
                this.unsubscribe = this.referenceChatMessages
                    .orderBy("createdAt", "desc")
                    .onSnapshot(this.onCollectionUpdate);


                // firebase user authentication
                this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
                    if (!user) {
                        firebase.auth().signInAnonymously();
                    }

                    this.setState({
                        uid: user.uid,
                        user: {
                            _id: user.uid,
                            name: name,
                            avatar: 'https://placeimg.com/140/140/any',
                        },
                        isConnected: true
                    })

                })
                // system message when user enters chat room
                const systemMsg = {
                    _id: `sys-${Math.floor(Math.random() * 100000)}`,
                    text: `${name} has entered Chatter`,
                    createdAt: new Date(),
                    system: true
                }

                this.referenceChatMessages.add(systemMsg)
            } else {
                this.setState({ isConnected: false })
                // get saved messages from local AsyncStorage
                this.getMessages()
            }
        })
    }

    componentWillUnmount() {
        // stop listening 
        if (this.state.isConnected) {
            this.authUnsubscribe();
            this.unsubscribe();
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = []
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = { ...doc.data() }
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: data.user,
                image: data.image || null,
                location: data.location || null,
                system: data.system
            })
        })
        this.setState({
            messages
        })
        // save messages to local AsyncStorage
        this.saveMessages()
    }

    addMessage = () => {
        // add a new message to the collection
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            uid: this.state.uid,
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || null,
            location: message.location || null
        })
    }

    // appends previous messages into new messages state
    onSend = (newMessage = []) => {
        this.setState(previousState => ({
            // using the GiftedChat code, add a message to bottom of screen,
            // sent by user
            messages: GiftedChat.append(previousState.messages, newMessage),
        }), () => {
            this.addMessage()
            this.saveMessages()
        })
    }

    // style rendered message bubbles
    renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#444941',
                    },
                    left: {
                        backgroundColor: '#CCD1E4',
                    }
                }}
                textStyle={{
                    right: {
                        color: 'white',
                    },
                    left: {
                        color: 'black',
                    }
                }}
            />
        )
    }

    renderInputToolbar = (props) => {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar
                    {...props}
                />
            );
        }
    }

    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    render() {
        // get bg color prop from Start.js
        let color = this.props.route.params.color
        return (
            <View style={{ flex: 1, backgroundColor: color }}>
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    renderUsernameOnMessage={true}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.state.user._id,
                        name: this.state.user.name,
                        avatar: this.state.user.avatar
                    }}
                />
                {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}
