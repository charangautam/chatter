import React from 'react'
import { View, Text, Button } from 'react-native';


export default function Chat(props) {
    let name = props.route.params.name
    props.navigation.setOptions({ title: name })
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Chat</Text>
        </View>
    )
}
