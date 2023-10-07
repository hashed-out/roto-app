import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Button,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import SignInScreen from "./src/screens/SignInScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Signup from "./src/screens/Signup";
import Verification from "./src/screens/Verification";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackView,
} from "@react-navigation/native-stack";
import { AuthContext } from "./src/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [images, setImages] = useState([]);
  const { width } = useWindowDimensions();

  const selectImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImages(result.uri ? [result.uri] : result.selected);
    }
  };

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userId: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userId: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userId: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userId: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userId: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userId = String(foundUser.id);
        const userName = foundUser.username;

        try {
          await AsyncStorage.setItem("userId", userId);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userId);
        dispatch({ type: "LOGIN", id: userName, token: userId });
      },
      signOut: async () => {
        // setuserId(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem("userId");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setuserId('fgkj');
        // setIsLoading(false);
      },
    }),
    []
  );

  const Stack = createNativeStackNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="login" component={SignInScreen} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="verification" component={Verification} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <SignInScreen /> */}
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    //backgroundColor: "#e28743",
    //'#ecf0f1',
    // padding: 8,
  },
  BgImg: {},
});
