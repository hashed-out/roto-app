import { View, Image, StyleSheet } from 'react-native'
import * as React from 'react';
import { useState } from 'react'
import Background from './Background'
import Field from './Field';
import Btn from './Btn';
import { button1 } from './common/button';
import { primaryBlue } from './Constants';
import { TextInput,Text} from 'react-native-paper';
const Logo = require("../assets/RotoLogo.png");
export default function Signup(props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
  })
  const [hidePass,setHidePass] = useState(true)
  const [hideConfirmPass,setHideConfirmPass] = useState(true)
  const [errormsg, setErrormsg] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,

    })
  }

  const Sendtobackend = () => {
    if (formData.name == '' ||
      formData.email == '' ||
      formData.phone == '' ||
      formData.password == '' ||
      formData.cpassword == '') {
      setErrormsg('All fields are required');
      return;
    }
    else {
      if (formData.password != formData.cpassword) {
        setErrormsg('Password and Confirm Password must be same');
        return;
      }
      else {
        fetch('http://192.168.1.5:5000/verify',
          {
            method: 'POST',
            headers:
            {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          .then(res => res.json()).then
          (
            data => {
              //console.log(data);
              if (data.error === 'Invalid Credentials') {
                // alert('Invalid Credentials')
                setErrormsg('Email Already exists')
              }
              else if (data.message === "Verification Code Sent to your Email") {
                // console.log(data.udata);
                alert(data.message);
                props.navigation.navigate('verification', { userdata: data.udata })
              }
            }
          )
      }
    }

  }
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.herologo}
      />
      <TextInput
        placeholder="Name"
        type="outlined"
        outlineColor={primaryBlue}
        value={formData.name}
        onChangeText={(text) => setFormData({...formData,name:text})}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        type="outlined"
        outlineColor={primaryBlue}
        value={formData.email}
        onChangeText={(text) => setFormData({...formData,email:text})}
        style={styles.input}
        keyboardType='email-address'
      />
      <TextInput
        placeholder="Phone Number"
        type="outlined"
        outlineColor={primaryBlue}
        value={formData.phone}
        onChangeText={(text) => setFormData({...formData,phone:text})}
        style={styles.input}
        keyboardType='numeric'
      />
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({...formData,password:text})}
        style={styles.input}
        secureTextEntry={hidePass}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => setHidePass(!hidePass)}
            style={styles.eye}
          />
        }
        onBlur={() => setHidePass(true)}
      />
      <TextInput
        placeholder="Confirm Password"
        value={formData.cpassword}
        onChangeText={(text) => setFormData({...formData,cpassword:text})}
        style={styles.input}
        secureTextEntry={hideConfirmPass}
        right={
          <TextInput.Icon
            name="eye"
            onPress={() => setHideConfirmPass(!hideConfirmPass)}
            style={styles.eye}
          />
        }
        onBlur={() => setHideConfirmPass(true)}
      />
    {errormsg && <Text style={styles.errorText}>{errormsg}</Text>}
      <Btn style={styles.btn} bgColor={primaryBlue} textColor='white' btnLabel="Create Account" Press={Sendtobackend} />
        
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  herologo: {
    marginBottom: 40,
    marginHorizontal:'auto'
  },
  btn: {
    marginTop: 50,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  eye:{
    // backgroundColor:'red',
    // zIndex:'100',
  },
  errorText:{
    color:'red',
    textAlign:'left',
    width:'100%',
  }
})