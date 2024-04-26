import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const translateY = useRef(new Animated.Value(100)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
    slideUp();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Animated.View
          style={{
            opacity: fadeAnim,
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/icons/Gamepedia.png")}
          />
        </Animated.View>

        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: translateY }] }}
        >
          <Text style={styles.title}>Gamespedia</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    fontStyle: "italic",
  },
});
