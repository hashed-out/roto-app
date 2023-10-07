import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { button1 } from './common/button'

const Verification = (props) => {
    const { userdata } = props.route.params;

    const [errormsg, setErrormsg] = useState(null);
    const [userCode, setUserCode] = useState('XXXX');
    const [actualCode, setActualCode] = useState(null);

    useEffect(() => {
        setActualCode(userdata[0]?.VerificationCode);
    }, [])

    const Sendtobackend = () => {
        // console.log(userCode);
        // console.log(actualCode);

        if (userCode == 'XXXX' || userCode == '') {
            setErrormsg('Please enter the code');
            return;
        }

        else if (userCode == actualCode) {
            // console.log('correct code');
            const fdata = {
                email: userdata[0]?.email,
                password: userdata[0]?.password,
                name: userdata[0]?.name,
                phone: userdata[0]?.phone,
            }

            fetch('http://192.168.1.5:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.message === 'User Registered Successfully') {
                        alert(data.message);
                        props.navigation.navigate('Login')
                    }
                    else {
                        alert("Something went wrong !! Try Signing Up Again");

                    }
                })
        }
        else if (userCode != actualCode) {
            setErrormsg('Incorrect code');
            return;
        }


    }
    return (
        <View>
            <View style={{display: "flex", alignItems: "center", marginTop: 50, backgroundColor: 'rgb(42, 99, 137)', borderRadius: 40, padding: 20}}>
                <View>
                    <Text style={{textAlign: "center", color: 'white', fontSize: 34}} onPress={() => props.navigation.navigate('Home')}>Viral Feed</Text>
                </View>
                <View>

                    <Text style={{color: 'white', marginTop: 10, fontSize: 16}}>Verification</Text>
                    <Text style={{color: 'white', marginTop: 10, fontSize: 16}}>A Code has been sent to you on your email</Text>
                    {
                        errormsg ? <Text style={{color: 'red'}}>{errormsg}</Text> : null
                    }

                    <View>
                        <Text style={{color: 'white', marginTop: 10, fontSize: 16}}>Code</Text>
                        <TextInput style={{color: 'white', marginTop: 10, fontSize: 16, borderColor: "white", backgroundColor: 'white', borderRadius: 20, padding: 7}}
                            placeholder="Enter 6 digit Verification Code"

                            secureTextEntry={true}

                            onChangeText={(text) => setUserCode(text)}
                            onPressIn={() => setErrormsg(null)}

                        />
                    </View>
                    <TouchableOpacity onPress={() => Sendtobackend()}>
                    <Text  style={{color: 'white', marginTop: 10, fontSize: 16, backgroundColor: "#DB6136", borderRadius:20, width: 80, textAlign: 'center'}}>Verify</Text> 
                    </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Signup')}>
                                <Text style={{color: 'white', marginTop: 10, padding: 7 , fontSize: 17, backgroundColor: "#703030", borderRadius:20, width: 199, textAlign: 'center'}}>Create a new account </Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Verification;