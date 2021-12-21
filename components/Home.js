import React, { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native';

export default function Home(props) {
    const [name, setName] = useState('')
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is Chatter</Text>
            <TextInput
                style={{ width: "50%", height: 20, borderColor: "black", borderWidth: 1, padding: 10, color: 'black' }}
                value={name}
                onChange={(input) => setName(input)}
                placeholder='What is your name?'
            />
            <Button
                title='Go to chat'
                onPress={() => {
                    props.navigation.navigate("Chat", { name: name })
                }}
            />
        </View>
    )
}
