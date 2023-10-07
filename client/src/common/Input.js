import { Input } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';


export default function Input({icon,placeholder,onChange}) {
    return (
        <TextInput
            label="Email"
            value={text}
            onChangeText={handleChange}
    />
    )
}