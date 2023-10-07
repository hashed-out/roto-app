import React from 'react';
import {TextInput} from 'react-native';
import {color1} from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: "rgb(36, 39, 58)", paddingHorizontal: 10, width: '78%', height: 40, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor= "rgb(42, 99, 137)"></TextInput>
  );
};

export default Field;