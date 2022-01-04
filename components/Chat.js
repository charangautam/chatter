import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';

// gifted chat
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
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
