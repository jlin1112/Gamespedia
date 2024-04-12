import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./screens/Detail";
import Main from "./screens/Main";
import Search from "./screens/Search";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer style={styles.container}>
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{ headerStyle: { backgroundColor: "#232526" }, headerTintColor:'#ffffff', headerTitle:'' }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
