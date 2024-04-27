import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React from "react";

const Card = React.memo(({ gameData, navigation }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        !pressed
          ? styles.trendingCard
          : [styles.trendingCard, { backgroundColor: "rgba(53, 63, 84, .6)" }]
      }
      key={gameData.id}
      onPress={() =>
        navigation.navigate("Detail", {
          IGDB_id: gameData.id,
        })
      }
    >
      <Image
        source={{
          uri:
            "https:" + gameData.cover?.url.replace("t_thumb", "t_cover_big") ||
            "",
        }}
        style={styles.trendingImage}
      />

      <View style={styles.trendingTextContainer}>
        <Text
          style={[styles.trendingText, { textAlign: "left" }]}
          numberOfLines={1}
        >
          {gameData.name || ""}
        </Text>
        <Text style={styles.trendingText}>
          {gameData.total_rating && gameData.total_rating.toFixed(1) + "/100"}
        </Text>

        <View style={styles.themesText}>
          {gameData.genres &&
            gameData.genres.map((genre, index) => {
              if (index < 3) {
                return (
                  <Text style={styles.themesSubText} key={index}>
                    {genre.name === "Hack and slash/Beat 'em up"
                      ? "Action"
                      : genre.name === "Role-playing (RPG)"
                      ? "RPG"
                      : genre.name === "Turn-based strategy (TBS)"
                      ? "TBS"
                      : genre.name === "Real Time Strategy (RTS)"
                      ? "RTS"
                      : genre.name}
                  </Text>
                );
              }
            })}
        </View>
      </View>
    </Pressable>
  );
});

export default Card;

const styles = StyleSheet.create({
  trendingCard: {
    backgroundColor: "rgba(53, 63, 84, .3)",
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.15,
    gap: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  trendingImage: {
    width: Dimensions.get("window").height * 0.13,
    height: "100%",
    resizeMode: "stretch",
    borderRadius: 6,
  },
  trendingTextContainer: {
    flex: 1,
    marginRight: 12,
    alignItems:'flex-start'
    // alignItems: "center",
  },
  trendingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 8,
  },
  themesText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 6,
  },
  themesSubText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
    marginTop: 8,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
  },
});
