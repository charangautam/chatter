import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Chat(props) {
    let user = props.route.params.user
    let color = props.route.params.color

    props.navigation.setOptions({ title: user });
    return (
        <View style={[styles.chat, { backgroundColor: color }]}>
            <Text>Welcome to Chat</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
