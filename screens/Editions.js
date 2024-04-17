import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Editions() {
  const navigation = useNavigation();
  const route = useRoute();
  const { gameName, onPC } = route.params;
  const [editionList, setEditionList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const cleanString = (str) => str.replace(/[\W_]/g, "").toLowerCase();

  useEffect(() => {
    const getEdition = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://www.cheapshark.com/api/1.0/games?title=${gameName}`
        );

        const testArr = [];
        response.data.map((d) =>
          testArr.push({ name: d.external, gameID: d.gameID })
        );

        const filteredGames = testArr.filter((game) => {
          const cleanDataName = cleanString(gameName);
          const cleanName = cleanString(game.name);
          const exactName = cleanName.replace(/edition/g, "").trim();
          return (
            exactName.startsWith(cleanDataName) &&
            !cleanName.includes("bundle") &&
            !cleanName.includes("gog")
          );
        });

        setEditionList(filteredGames);

        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    if (onPC) {
      getEdition();
    } else {
      setEditionList([]);
    }
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#232526",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#232526",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "700" }}>
          An error occurred while fetching data. Please try again later.
        </Text>
      </View>
    );
  }

  if (editionList) {
    return (
      <View style={styles.container}>
        {editionList.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Choose an Edition</Text>
          </View>
        )}

        {editionList.length > 0 ? (
          <ScrollView>
            {editionList.map((edition) => {
              return (
                <View key={edition.gameID}>
                  <Pressable
                    style={styles.card}
                    onPress={() =>
                      navigation.navigate("Pricing", { gameID: edition.gameID })
                    }
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 16,
                        fontWeight: "700",
                      }}
                    >
                      {edition.name}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View>
            <Text style={[styles.title, { marginBottom: 6 }]}>
              Pricing Info Not Available.
            </Text>
            <Text style={styles.text}>
              The app currently provides detailed pricing information only for
              games available on PC, including stores such as Steam, Epic, GOG,
              Green Man Gaming, Origin, and Uplay.
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232526",
    paddingHorizontal: 8,
    paddingBottom: 40,
    gap: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "rgba(53, 63, 84, .3)",
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 16,
    marginBottom: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});