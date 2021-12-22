import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native';

export default function Chat(props) {
    let name = props.route.params.name
    let color = props.route.params.color

    props.navigation.setOptions({ title: name });
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
