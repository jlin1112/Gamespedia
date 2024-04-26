import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Card from "./Card";

import ScrollIndicator from "./ScrollIndicator";

export default function GameCarousel({ gameData, navigation }) {
  const width = Dimensions.get("window").width - 16;
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
                  <Card gameData={gameData[index]} navigation={navigation} />
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
    borderRadius: 12,
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
    textAlign: "left",
    alignItems: "flex-start",
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
    justifyContent: "center",
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
