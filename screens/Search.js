import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useEffect, useState } from "react";
import GameCarousel from "../components/GameCarousel";
import popularGameData from "../uitils/popularGameData";
import axios from "axios";
import shuffleArray from "../uitils/shuffleArray";

export default function Search({ navigation }) {
  const [data, setData] = useState(null);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingPopularError, setLoadingPopularError] = useState(false);

  const shuffleData = () => {
    setLoadingPopular(true);
    const shuffledData = shuffleArray(data);
    setData(shuffledData);
    setTimeout(() => {
      setLoadingPopular(false);
    }, 500);
  };

  useEffect(() => {
    async function fetchPopularGames() {
      setLoadingPopular(true);
      try {
        const headers = {
          "Client-ID": `${process.env.ClientId}`,
          Authorization:  `Bearer ${process.env.Bearer}`,
        };
        const requestBody = `fields name,cover.url,total_rating, first_release_date,themes.name, genres.name; where category = 0 & version_parent= null & rating >= 80 & platforms.id = 6; sort total_rating_count desc;limit 75;`;

        const response = await axios.post(
          "https://api.igdb.com/v4/games",
          requestBody,
          { headers }
        );

        const popularGameData = response.data;
        const shuffledData = shuffleArray(popularGameData);
        setData(shuffledData);

        setLoadingPopular(false);
      } catch (error) {
        setLoadingPopularError(true);
        setLoadingPopular(false);
      }
    }
    fetchPopularGames();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbar}>
        <Text style={styles.text}>Search</Text>
        <SearchBar></SearchBar>
      </View>
      <View style={styles.bottomArea}>
        {/* <SearchResults /> */}

        {/* popular games section */}
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.carouselTitle}>Popular</Text>
            <Pressable onPress={shuffleData} disabled={loadingPopular}>
              <Text
                style={{ color: "#ffffff", fontSize: 12, fontWeight: "500" }}
              >
                Reload
              </Text>
            </Pressable>
          </View>
          {loadingPopularError ? (
            <View
              style={{
                height: Dimensions.get("window").height * 0.15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(53, 63, 84, .3)",
                borderRadius: 20,
                marginTop: 8,
              }}
            >
              <Text
                style={[styles.text, { textAlign: "center", fontSize: 12 }]}
              >
                {" "}
                An error occurred while fetching data. Please try again later.
              </Text>
            </View>
          ) : loadingPopular ? (
            <View
              style={{
                height: Dimensions.get("window").height * 0.15,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(53, 63, 84, .3)",
                borderRadius: 20,
                marginTop: 8,
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <GameCarousel
              gameData={data}
              navigation={navigation}
            ></GameCarousel>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingHorizontal: 16,
    flexDirection: "column",
    backgroundColor: "#232526",
  },
  searchbar: {
    height: "15%",
    paddingHorizontal: 8,
  },
  bottomArea: {
    flex: 1,
    paddingHorizontal: 8,
  },
  header: {
    height: "10%",
    gap: 8,
    marginTop: 8,
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
    // marginTop: 8,
  },
});
