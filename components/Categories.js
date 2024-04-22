import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import getImageSource from "../uitils/getImageSource";

const genres = [
  [
    { name: "Action", id: 25 },
    { name: "Adventure", id: 31 },
  ],
  [
    { name: "Role-Playing", id: 12 },
    { name: "Shooter", id: 5 },
  ],
  [
    { name: "Platform", id: 8 },
    { name: "Strategy", id: 15 },
  ],
  [
    { name: "Sports", id: 14 },
    { name: "Simulation", id: 13 },
  ],
  [
    { name: "Card & Board Game", id: 35 },
    { name: "Racing", id: 10 },
  ],
  [
    { name: "Point-and-click", id: 2 },
    { name: "Visual Novel", id: 34 },
  ],
];

export default function Categories({ navigation }) {
  const handlePress = (genre) => {
    navigation.navigate("List", { genre: genre });
  };

  return (
    <>
      <Text style={styles.text}>Explore by Genre</Text>
      <ScrollView
        style={styles.ScrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {genres.map((genre, index) => {
            return (
              <View style={styles.row} key={index}>
                {genre.map((g) => {
                  return (
                    <View style={styles.genreContainer} key={g.id}>
                      <Pressable
                        style={({ pressed }) =>
                          !pressed
                            ? styles.button
                            : [
                                styles.button,
                                { backgroundColor: "rgba(53, 63, 84, .3)" },
                              ]
                        }
                        onPress={() => handlePress(g)}
                      >
                        <Image source={getImageSource(g.name)} />
                        <Text style={styles.genre}>{g.name}</Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
  },
  ScrollView: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  genreContainer: {
    flex: 0.48,
    borderRadius: 5,
    height: 100,
    backgroundColor: "rgba(53, 63, 84, .2)",
    backdropFilter: "blur(10px)",
  },
  genre: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 16,
    color: "#ffffff",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
