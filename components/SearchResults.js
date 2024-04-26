import { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Card from "./Card";
import { useNavigation, useScrollToTop } from "@react-navigation/native";

export default function SearchResults({
  searchResult,
  setSearchResult,
  searchingResult,
}) {
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text style={[styles.text, { marginBottom: 8 }]}>Results</Text>

        <Pressable onPress={() => setSearchResult(null)}>
          <Text style={{ color: "#ffffff", fontSize: 12, fontWeight: "500" }}>
            Clear
          </Text>
        </Pressable>
      </View>

      {searchingResult ? (
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
      ) : (
        searchResult.length > 0 && (
          <View style={{ flex: 1 }}>
            <FlatList
              ref={ref}
              data={searchResult}
              renderItem={({ item }) => {
                return <Card gameData={item} navigation={navigation} />;
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        )
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
});
