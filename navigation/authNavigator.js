import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/user/loginScreen";
import RegisterScreen from '../screens/user/registerScreen';


const Stack = createNativeStackNavigator()

function AuthNavigator() {
    return(
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
    );
}

export default AuthNavigator;