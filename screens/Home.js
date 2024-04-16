import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import Categories from "../components/Categories";
import GameCarousel from "../components/GameCarousel";
import trendingData from "../uitils/trendingData";

export default function Home({ navigation }) {
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
        <GameCarousel gameData={trendingData} navigation={navigation} />

        <Categories navigation={navigation}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  carouselTitle:{
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  }
});
