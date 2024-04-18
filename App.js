import { useEffect, useState, createContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "./screens/Detail";
import Main from "./screens/Main";
import Search from "./screens/Search";
import List from "./screens/List";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Splash from "./screens/Splash";
import Pricing from "./screens/Pricing";
import Editions from "./screens/Editions";
// import { TokenContext } from "./uitils/TokenContext";
import {GameDataContext} from './uitils/GameDataContext'

const Stack = createNativeStackNavigator();

export default function App() {
  const [appLoading, setAppLoading] = useState(true)
  
 const [libraryList, setLibraryList] = useState([])

  useEffect(() => {
    const getLibraryList = async () => {
      try {
        const existingGameDataJSON = await AsyncStorage.getItem("library");
        const existingGameData = existingGameDataJSON
          ? JSON.parse(existingGameDataJSON)
          : [];
      
        setLibraryList(existingGameData);
      } catch (error) {
        console.log(error)
        setLibraryList([]);
      }
    };
    getLibraryList()
  },[])




    return (
      <>
        <StatusBar style="light" />
        <GameDataContext.Provider value={{libraryList, setLibraryList}}>
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
                options={{
                  headerStyle: { backgroundColor: "#232526" },
                  headerTintColor: "#ffffff",
                  headerTitle: "",
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="List"
                component={List}
                options={{
                  headerStyle: { backgroundColor: "#232526" },
                  headerTintColor: "#ffffff",
                  headerTitle: "",
                }}
              ></Stack.Screen>
              <Stack.Screen
                name="Pricing"
                component={Pricing}
                options={{
                  headerStyle: { backgroundColor: "#232526" },
                  headerTintColor: "#ffffff",
                  headerTitle: "",
                }}
              ></Stack.Screen>
                <Stack.Screen
                name="Editions"
                component={Editions}
                options={{
                  headerStyle: { backgroundColor: "#232526" },
                  headerTintColor: "#ffffff",
                  headerTitle: "",
                }}
              ></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </GameDataContext.Provider>
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
