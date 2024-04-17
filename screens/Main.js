import * as React from "react";
import Home from "./Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./Search";
import Library from './Library'
import About from "./About";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={"black"}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={"black"}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "library" : "library-outline"}
              size={size}
              color={"black"}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "information-circle" : "information"}
              size={size}
              color={"black"}
            />
          ),
          tabBarActiveTintColor: "black",
        }}
      />
    </Tab.Navigator>
  );
}
