import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Animated,
} from "react-native";
import Categories from "../components/Categories";
import GameCarousel from "../components/GameCarousel";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Home({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [trendingData, setTrendingData] = useState(null);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState(false);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const getTrendingGames = async () => {
    setTrendingError(false);
    setTrendingLoading(true);

    try {
      const response = await axios.get(
        `https://gamespedia.vercel.app/trending`
      );
      setTrendingData(response.data);
      setTimeout(() => {
        setTrendingLoading(false);
      }, 500);
    } catch (error) {
      setTrendingLoading(false);
      setTrendingError(true);
    }
  };

  useEffect(() => {
    fadeIn();
    getTrendingGames();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Animated.View
          style={{
            flex: 1,
            opacity: fadeAnim,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <Image
                source={require("../assets/icons/Gamepedia.png")}
                style={styles.icon}
              ></Image>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={styles.text}>Welcome,</Text>
              <Text style={styles.text}>To your next adventure</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <Text style={styles.carouselTitle}>Trending</Text>
            <Pressable
              style={{ alignSelf: "flex-end" }}
              onPress={() => navigation.navigate("Trending")}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: "500",
                  marginRight: 8,
                }}
              >
                More
              </Text>
            </Pressable>
          </View>

          {trendingLoading ? (
            <View style={styles.card}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : trendingError ? (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(53, 63, 84, .3)",
                  borderRadius: 20,
                  paddingVertical: 8,
                  gap: 8,
                }}
              >
                <Text style={[styles.errorText, { textAlign: "center" }]}>
                  An error occurred while fetching data. Please try again later.
                </Text>
                <Pressable
                  onPress={getTrendingGames}
                  style={styles.errorButton}
                >
                  <Text style={styles.errorText}>Retry</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <GameCarousel gameData={trendingData} navigation={navigation} />
          )}

          <Categories navigation={navigation} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232526",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: "#ffffff",
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  header: {
    height: "10%",
    gap: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  background: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  carouselTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",

    // marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    height: Dimensions.get("window").height * 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(53, 63, 84, .3)",
    marginTop: 8,
  },
  errorText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  errorButton: {
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
  },
});
