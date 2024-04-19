import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Categories from "../components/Categories";
import GameCarousel from "../components/GameCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
// import trendingData from "../uitils/trendingData";

export default function Home({ navigation }) {
  const [trendingData, setTrendingData] = useState(null);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState(false);

  const getTrendingGames = async () => {
    setTrendingError(false);
    setTrendingLoading(true);
    try {
      const response = await axios.get("http://192.168.1.79:3000/trending");
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
    getTrendingGames();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
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
        <Text style={styles.carouselTitle}>Trending</Text>

        {trendingLoading ? (
          <View style={styles.card}>
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <GameCarousel gameData={trendingData} navigation={navigation} />
        )}

        <Categories navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingHorizontal: 16,
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
    marginTop: 8,
    // marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    height: Dimensions.get("window").height * 0.15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(53, 63, 84, .3)",
    marginTop:8,
  },
});
