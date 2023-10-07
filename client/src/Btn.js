import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Btn({bgColor, btnLabel, textColor, Press}) {
    return (
        <TouchableOpacity onPress={Press} style={{
            backgroundColor: bgColor,
            borderRadius: 10,
            alignItems: 'center',
            width: '100%',
            paddingVertical: 10,
            marginVertical: 10
        }}>
            <Text style={{ color: textColor, fontSize: 25 }}>
                {btnLabel}
            </Text>
        </TouchableOpacity>
    )
}