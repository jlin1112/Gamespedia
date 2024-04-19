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
  FlatList,
  Animated,
} from "react-native";
import { useContext, useRef } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useEffect, useState } from "react";
import axios from "axios";
import shuffleArray from "../uitils/shuffleArray";
// import { TokenContext } from "../uitils/TokenContext";
import Card from "../components/Card";
import Recommend from "../components/Recommend";

export default function Search({ navigation }) {
  // const token = useContext(TokenContext);

  //whole data and data to be displayed
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  //setting search result and set is searching result
  const [searchResult, setSearchResult] = useState(null);
  const [searchingResult, setSearchingResult] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const [startIndex, setStartIndex] = useState(15);
  // const [shuffledData, setShuffledData] = useState(null)
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingPopularError, setLoadingPopularError] = useState(false);

  const [searching, setSearching] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const loadNextGroup = () => {
    setLoadingPopularError(false);
    setLoadingPopular(true);
    let nextGroup;
    if (startIndex + 15 < data.length) {
      nextGroup = data.slice(startIndex, startIndex + 15);
      setStartIndex(startIndex + 15);
    } else {
      nextGroup = data.slice(0, 15);
      setStartIndex(15);
    }
    setDisplayData((prev) => nextGroup);
    setTimeout(() => {
      setLoadingPopular(false);
    }, 500);
  };

  const fadeIn = () => {
    setSearching(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    setSearching(true);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  };

  async function fetchPopularGames() {
    setSearchError(false);
    setLoadingPopularError(false);
    setLoadingPopular(true);
    try {
      const response = await axios.get("http://192.168.1.79:3000/popular");
      const popularGameData = response.data;
      const shuffledData = shuffleArray(popularGameData);
      setData(shuffledData);
      setDisplayData(shuffledData.slice(0, 15));
      setLoadingPopular(false);
    } catch (error) {
      setLoadingPopularError(true);
      setLoadingPopular(false);
    }
  }

  useEffect(() => {
    fetchPopularGames();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchbar}>
        <Text style={styles.text}>Search</Text>
        <SearchBar
          fadeIn={fadeIn}
          fadeOut={fadeOut}
          setSearchResult={setSearchResult}
          setSearchingResult={setSearchingResult}
          setSearchError={setSearchError}
        />
      </View>
      <View style={styles.bottomArea}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            flex: 1,
            pointerEvents: searching && "none",
          }}
        >
          {searchError ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(53, 63, 84, .3)",
                borderRadius: 20,
                marginTop: 8,
              }}
            >
              <Text
                style={[
                  styles.subText,
                  { textAlign: "center", marginBottom: 8 },
                ]}
              >
                An error occurred while fetching data. Please try again later.
              </Text>
              <Pressable
                style={{
                  borderColor: "#ffffff",
                  borderWidth: 1,
                  padding: 6,
                  borderRadius: 6,
                }}
                onPress={() => setSearchError(false)}
              >
                <Text style={styles.subText}>Dismiss</Text>
              </Pressable>
            </View>
          ) : searchResult ? (
            searchResult.length > 0 ? (
              <SearchResults
                searchResult={searchResult}
                setSearchResult={setSearchResult}
                searchingResult={searchingResult}
              />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text style={[styles.text]}>No Games Found</Text>
                <Pressable onPress={() => setSearchResult(null)}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    Clear
                  </Text>
                </Pressable>
              </View>
            )
          ) : (
            !searchingResult && (
              <Recommend
                loadNextGroup={loadNextGroup}
                loadingPopular={loadingPopular}
                loadingPopularError={loadingPopularError}
                displayData={displayData}
                fetchPopularGames={fetchPopularGames}
              />
            )
          )}
          {/* popular games section */}
        </Animated.View>
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
  subText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
