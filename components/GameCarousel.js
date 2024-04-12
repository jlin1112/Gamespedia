import { useState } from "react";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";

import ScrollIndicator from "./ScrollIndicator";

export default function GameCarousel({ gameData, navigation, title }) {
  const width = Dimensions.get("window").width - 32;
  const height = Dimensions.get("window").height * 0.15;

  const [activeCard, setActiveCard] = useState(0);

  return (
    <>
      {gameData && (
        <>
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Carousel
                width={width}
                height={height}
                autoPlay={false}
                data={gameData}
                scrollAnimationDuration={300}
                onSnapToItem={(index) => setActiveCard(index)}
                renderItem={({ index }) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    style={styles.trendingCard}
                    key={index}
                    onPress={() =>
                      navigation.navigate("Detail", {
                        IGDB_id: gameData[index].id,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri:
                          "https:" +
                            gameData[index].cover.url.replace(
                              "t_thumb",
                              "t_cover_big"
                            ) || "",
                      }}
                      style={styles.trendingImage}
                    />

                    <View style={styles.trendingTextContainer}>
                      <Text style={styles.trendingText}>
                        {gameData[index].name || ""}
                      </Text>
                      <Text style={styles.trendingText}>
                        {gameData[index].total_rating?.toFixed(1) + "/100"}
                      </Text>

                      <View style={styles.themesText}>
                        {gameData[index].genres &&
                          gameData[index].genres.map((genre, index) => {
                            return (
                              <Text style={styles.themesSubText} key={index}>
                                {genre.name === "Hack and slash/Beat 'em up"
                                  ? "Action"
                                  : genre.name === "Role-playing (RPG)"
                                  ? "Role-Playing"
                                  : genre.name === "Turn-based strategy (TBS)"
                                  ? "Strategy"
                                  : genre.name}
                              </Text>
                            );
                          })}
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          <ScrollIndicator index={activeCard} length={gameData.length} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(53, 63, 84, .3)",
    borderRadius: 20,
    height: Dimensions.get("window").height * 0.15,
    marginTop: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },
  trendingCard: {
    // flex: 1,
    flexDirection: "row",
    height: "100%",
    gap: 16,
  },
  trendingImage: {
    width: Dimensions.get("window").height * 0.13,
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 6,
  },
  trendingTextContainer: {
    flexShrink: 1,
  },
  trendingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    //  alignSelf:'center'
    marginTop: 8,
    // flexWrap:'wrap',
  },
  themesText: {
    flexDirection: "row",
    justifyContent: "center",
    // flexShrink:1,
    flexWrap: "wrap",
    gap: 6,
  },
  themesSubText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    //  alignSelf:'center'
    marginTop: 8,
    // flexWrap:'wrap',
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
  },
});
