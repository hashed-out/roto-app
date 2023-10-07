import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Home from './src/Home';
import Signup from './src/Signup';
import Login from './src/Login';
import Verification from './src/Verification';
import Schedule from './src/Schedule';
// https://github.com/UsamaSAM87/Login-Signup-app-react-native
const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="verification" component={Verification} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;