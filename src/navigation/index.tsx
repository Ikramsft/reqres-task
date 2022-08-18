/**
 * @format
 */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { navigationRef } from "./navigationRef";

// Screens
import Login from "../screens/Auth/Login";
import Home from "../screens/Home";
import Signup from "../screens/Auth/SignUp";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/user";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function NavContainer() {
  const token = useSelector(selectCurrentUser);
  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          {token ? (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen component={Home} name="Home" />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen component={Login} name="Login" />
              <Stack.Screen component={Signup} name="Signup" />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default NavContainer;
