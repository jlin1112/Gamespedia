import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import axios from "axios";
import Card from "../components/Card";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function List() {
  const navigation = useNavigation();
  const route = useRoute();
  const { genre } = route.params;

  const [offset, setOffSet] = useState(0);

  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState(false);

  const searchGenre = async () => {
    setSearching(true);
    try {
      const headers = {
        "Client-ID": process.env.EXPO_PUBLIC_ClientId,
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_Bearer}`,
      };
      const requestBody = `fields name,cover.url,total_rating, first_release_date,themes.name,genres.name; where category = 0 & version_parent= null & genres = (${genre.id}) & total_rating_count != null; sort total_rating_count desc; limit 20; offset ${offset};`;

      const response = await axios.post(
        "https://api.igdb.com/v4/games",
        requestBody,
        { headers }
      );

      setOffSet((prev) => prev + 20);

      setTimeout(() => {
        setSearching(false);
      }, 500);

      setSearchResult([...searchResult, ...response.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSearching(false);
      setSearchResult([]);
      setError(true);
    }
  };

  useEffect(() => {
    searchGenre();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={[styles.text, { marginBottom: 8 }]}>{genre.name}</Text>

          <Pressable>
            <Text style={{ color: "#ffffff", fontSize: 12, fontWeight: "500" }}>
              Sort
            </Text>
          </Pressable>
        </View>

        {loading ? (
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
            <ActivityIndicator size="large" />
          </View>
        ) : searchResult.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={searchResult}
              renderItem={({ item }) => {
                return <Card gameData={item} navigation={navigation} />;
              }}
              keyExtractor={(item) => item.id}
              onEndReached={searchGenre}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                searching ? <ActivityIndicator size="large" /> : null
              }
            />
          </View>
        ) : (
          error && (
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
              <Text style={[styles.subText, { textAlign: "center" }]}>
                An error occurred while fetching data. Please try again later.
              </Text>
            </View>
          )
        )}
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
    paddingHorizontal: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  subText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
