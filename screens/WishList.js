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

      <View style={{height:200, borderColor:'#ffffff',borderWidth:1, flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{borderColor:'red',borderWidth:1, justifyContent:'center',width:'30%',alignItems:'center'
      }}><Text>Red</Text></View>
          <View style={{borderColor:'blue',borderWidth:1,justifyContent:'center',width:'30%',alignItems:'center'
      }}><Text>Blue</Text></View>
      </View>
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
