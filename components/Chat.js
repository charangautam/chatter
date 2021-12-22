import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';

// gifted chat
import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';

export default function Chat(props) {
    // get state props from Start.js
    let user = props.route.params.user
    let color = props.route.params.color

    const [messages, setMessages] = useState([])

    useEffect(() => {
        // navbar title
        props.navigation.setOptions({ title: user })
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: `Welcome to Chatter ${user}`,
                createdAt: new Date(),
                system: true,
            },
        ])
    }, [])

    // appends previous messages into new messages state
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    // style rendered message bubbles
    const renderBubble = (props) => {
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

    return (
        <View style={{ flex: 1, backgroundColor: color }}>
            <GiftedChat
                renderBubble={renderBubble}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({

})
