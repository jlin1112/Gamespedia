import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Text,
  Pressable,
  Animated,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import Detail from "./Detail";

export default function WishList({ navigation }) {
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ backgroundColor: "#232526", flex: 1 }}>
      <Text style={styles.text}>WishList</Text>

      <View
        style={{ width: 200, height: 200, backgroundColor: "black" }}
      ></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  image: {
    // flex:1,
    height: 200,
    backgroundColor: "#fff",
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
