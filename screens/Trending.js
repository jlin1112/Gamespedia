import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";
import axios from "axios";
import Card from "../components/Card";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Trending() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);

  const [error, setError] = useState(false);

  const getTrending = async () => {
    try {
      const response = await axios.get(
        `https://gamespedia.vercel.app/trendingList`
      );

      setGameData(response.data);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    getTrending();
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
          <Text style={[styles.text]}>Trending</Text>
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
        ) : gameData.length > 0 ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={gameData}
              renderItem={({ item }) => {
                return <Card gameData={item} navigation={navigation} />;
              }}
              keyExtractor={(item) => item.id}
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
