import { View, StyleSheet,Image } from 'react-native'
import React, { useState } from 'react'
import { primaryBlue } from './Constants';
import { TextInput } from 'react-native-paper';
const Logo = require("../assets/RotoLogo.png");
import Btn from './Btn';



export default function Login() {
  const [phoneNumber,setPhoneNumber] = useState('')
const [password,setPassword] = useState('')
  return (
    <View style={styles.container}>
     <Image
        source={Logo}
        style={styles.herologo}
      />
       <TextInput
            placeholder="Phone Number"
            type="outlined"
            outlineColor={primaryBlue}
            value={phoneNumber}
            onChangeText={e=>setPhoneNumber(e)}
            style={styles.input}
            keyboardType = 'numeric'
    />
     <TextInput
            placeholder="Email"
            value={password}
            onChangeText={e=>setPassword(e)}
            style={styles.input}
            
    />
          <Btn style={styles.btn} bgColor={primaryBlue} textColor='white' btnLabel="Login" Press={() => console.log(phoneNumber)} />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    padding:30,
  },

  herologo:{
    marginBottom:40,
  },
  btn:{
    marginTop:50,
  },
  input:{
    width:'100%',
    marginBottom:20,
  }
})