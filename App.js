import { useEffect, useState, createContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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

const Stack = createNativeStackNavigator();

export default function App() {
  const [appLoading, setAppLoading] = useState(true)
  // const [token, setToken] = useState(null);

  // useEffect(() => {
  //   const loadTokens = async () => {
  //     try {
  //       const storedTokenJSON = await SecureStore.getItem("token");

  //       if (storedTokenJSON) {
  //         const storedToken = JSON.parse(storedTokenJSON);
  //         setToken(storedToken);
  //       } else {
  //         await SecureStore.setItem(
  //           "token",
  //           JSON.stringify({
  //             ClientId: "fx9ddic7ku3b3ld82rlgppyrmvugv4",
  //             ClientSecret: "94hgoaq0nus1h0btiknhs6qajiegsn",
  //             Bearer: "to930xk48lpo5rong3cmxgnddnuur8",
  //           })
  //         );
  //         const newTokenJSON = await SecureStore.getItem("token");
  //         const newToken = JSON.parse(newTokenJSON);
  //         setToken(newToken);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loadTokens();
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(process.env.EXPO_PUBLIC_TOKENUrl)
  //     .then((response) => {
  //       setToken(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);


    return (
      <>
        <StatusBar style="light" />
        {/* <TokenContext.Provider value={token}> */}
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
        {/* </TokenContext.Provider> */}
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
