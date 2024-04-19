import {
  Text,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Pressable,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRef } from "react";

// import { TokenContext } from "../uitils/TokenContext";
import Card from "../components/Card";
import { useNavigation, useScrollToTop } from "@react-navigation/native";

export default function Recommend({
  loadNextGroup,
  loadingPopular,
  loadingPopularError,
  displayData,
  fetchPopularGames
}) {
  const navigation = useNavigation();
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text style={styles.carouselTitle}>Recommended</Text>

        <Pressable onPress={loadNextGroup} disabled={loadingPopular}>
          <Text style={{ color: "#ffffff", fontSize: 12, fontWeight: "500" }}>
            Reload
          </Text>
        </Pressable>
      </View>
      {loadingPopularError ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(53, 63, 84, .3)",
            borderRadius: 20,
            marginTop: 8,
            gap:16,
          }}
        >
          <Text style={[styles.text, { textAlign: "center"}]}>
            An error occurred while fetching data. Please try again later.
          </Text>
          <Pressable onPress={fetchPopularGames} style={styles.button}><Text style={styles.text}>Retry</Text></Pressable>
        </View>
      ) : loadingPopular ? (
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
        <View style={{ flex: 1 }}>
          <FlatList
          ref={ref}
            data={displayData}
            renderItem={({ item }) => {
              return <Card gameData={item} navigation={navigation} />;
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({

  carouselTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    // marginTop: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  button:{
    borderColor:'#ffffff', borderWidth:1, borderRadius:6, padding:8
  }
});
