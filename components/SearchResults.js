import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import GameCard from "./GameCard";
import SearchBar from "./SearchBar";
import gameData from "../uitils/gameData";

export default function SearchResults() {
  const d = new Date(1706227200 * 1000);
  return (
    <>
      <Text style={[styles.text, { marginBottom: 16 }]}>Results</Text>
      <FlatList
        data={gameData}
        renderItem={({ item }) => <GameCard gameData={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    // backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
    marginBottom: 16,
  },
  gameCard: {
    height: 100,
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(53, 63, 84, .2)",
    backdropFilter: "blur(10px)",
    overflow: "scroll",
  },
  gameCover: {
    resizeMode: "cover",
    width: 95,
    height: 95,
    borderRadius: 5,
  },
  gameInfo: {
    gap: 6,
  },
  gameText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  gameSubText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
});
