import React from 'react';
import {View, StyleSheet, Image,Text} from 'react-native';
import Background from './Background';
const HeroLogo = require("../assets/HeroLogo.png");
import Btn from './Btn';
import { primaryBlue } from './Constants';

const Home = (props) => {
  return (
    <View>
      <View style={styles.container}>
      <Text style={styles.text}>Welcome 👋</Text>
      <Image
        source={HeroLogo}
        style={styles.herologo}
      />
      
      <Btn style={styles.btn} bgColor={primaryBlue} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn style={styles.btn} bgColor='white' textColor={primaryBlue} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    padding:30,
  },
  text:{
    fontSize:40,
    marginBottom:40,
    color:primaryBlue,
    fontWeight:'bold',
  },
  herologo:{
    marginBottom:40,
  },
  btn:{
    marginTop:50,
  }
})

export default Home;