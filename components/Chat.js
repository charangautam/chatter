import React from 'react'
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';

// gifted chat
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// firebase | firestore
import firebase from 'firebase';
import 'firebase/firestore';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: 0,
            messages: [],
            user: {
                _id: '',
                name: '',
                avatar: '',
            }
        }

        const firebaseConfig = {
            apiKey: "AIzaSyCHVy-HWP25KcZylGZst_AQAEIZU5k_0v4",
            authDomain: "chatter-09.firebaseapp.com",
            projectId: "chatter-09",
            storageBucket: "chatter-09.appspot.com",
            messagingSenderId: "845839424084",
            appId: "1:845839424084:web:a71dc1bee920c60a20abc1",
            measurementId: "G-5PPR15SR9G"
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatMessages = firebase.firestore().collection("messages");
    }

    componentDidMount() {
        // get state props from Start.js
        let user = this.props.route.params.user
        this.props.navigation.setOptions({ title: user })

        // firebase auth
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                user: {
                    _id: user.uid,
                    name: name,
                    avatar: 'https://placeimg.com/140/140/any',
                },
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
            // get the QueryDocumentSnapshot's data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data.user._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
            });
        });
        this.setState({
            messages
        })
    };

    addMessage() {
        const message = this.state.messages[0];
        // add a new messages to the collection
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || '',
            createdAt: message.createdAt,
            user: this.state.user,
        });
    }

    // appends previous messages into new messages state
    onSend(messages = []) {
        this.setState(previousState => ({
            // using the GiftedChat code, add a message to bottom of screen,
            // sent by user
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage();
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
                        backgroundColor: '#EEEEEE',
                    }
                }}
            />
        )
    }

    render() {
        let color = this.props.route.params.color
        return (
            <View style={{ flex: 1, backgroundColor: color }}>
                <GiftedChat
                    renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
                {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
