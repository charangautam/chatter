import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';

// gifted chat
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// firebase | firestore
const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: 0,
            messages: []
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
                user: data.user,
            });
        });
        this.setState({
            messages
        })
    };

    componentDidMount() {
        this.referenceChatMessages = firebase.firestore().collection('messages');
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
        // get state props from Start.js
        let user = this.props.route.params.user
        this.props.navigation.setOptions({ title: user })
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                    // Mark the message as sent, using one tick
                    sent: true,
                    // Mark the message as received, using two tick
                    received: true,
                    // Mark the message as pending with a clock loader
                    pending: true,
                },
                {
                    _id: 2,
                    text: `Welcome to Chatter ${user}`,
                    createdAt: new Date(),
                    system: true,
                },
            ]
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    // appends previous messages into new messages state
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
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
