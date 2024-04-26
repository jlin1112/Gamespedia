import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  View,
  ScrollView,
} from "react-native";

export default function About() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={[styles.title, { marginBottom: 8 }]}>Info</Text>

          <View style={{ gap: 8 }}>
            <Text style={styles.title}>About the Developer</Text>
            <Text style={[styles.text, { fontWeight: "700", paddingLeft: 8 }]}>
              Jiahao Wesley Lin
            </Text>
            <Text style={[styles.text, { fontWeight: "700", paddingLeft: 8 }]}>
              jiahaolin96@gmail.com
            </Text>
            <Text style={[styles.subText, { paddingLeft: 8 }]}>
              Thank you so much for using this demo app! As the developer behind
              <Text style={{ fontStyle: "italic" }}> Gamespedia </Text>, I am
              always looking to improve, so feel free to contact me via email if
              you have any feedback, suggestions, questions or just want to say
              hello. I'd love to hear from you! Happy exploring!
            </Text>
          </View>

          <View style={{ gap: 8, marginVertical: 16 }}>
            <Text style={styles.title}>About the App</Text>

            <Text style={[styles.title, { marginBottom: 8, paddingLeft: 6 }]}>
              Usage:
            </Text>

            <View>
              <Text style={[styles.text, { paddingLeft: 16 }]}>
                &#8226; Data and Access
              </Text>
              <Text
                style={[styles.subText, { marginBottom: 8, paddingLeft: 40 }]}
              >
                - <Text style={{ fontStyle: "italic" }}>Gamespedia</Text> is
                designed for game exploring. It{" "}
                <Text style={{ fontWeight: "700" }}>WILL NOT</Text> require{" "}
                <Text style={{ fontWeight: "700" }}>ANY</Text> personal
                information nor system access.
              </Text>
              <Text style={[styles.text, { paddingLeft: 16 }]}>
                &#8226; Limitation
              </Text>
              <Text
                style={[styles.subText, { marginBottom: 8, paddingLeft: 40 }]}
              >
                - Currently{" "}
                <Text style={{ fontStyle: "italic" }}>Gamespedia</Text> only
                provides pricing and edition information for video games that
                are available on PC, and in limited stores only.
              </Text>
            </View>

            <View>
              <Text style={[styles.title, { marginBottom: 8, paddingLeft: 6 }]}>
                Third-Party Sources:
              </Text>
              <View>
                <Text style={[styles.text, { paddingLeft: 16 }]}>
                  &#8226; IGDB API
                </Text>
                <Text
                  style={[styles.subText, { marginBottom: 8, paddingLeft: 40 }]}
                >
                  - Provides detailed information about games, including
                  screenshots, videos, release dates, ratings, and summaries.
                </Text>
              </View>
              <View>
                <Text
                  style={[styles.text, { marginBottom: 8, paddingLeft: 16 }]}
                >
                  &#8226; CheapShark API
                </Text>
                <Text
                  style={[styles.subText, { marginBottom: 8, paddingLeft: 40 }]}
                >
                  - Retrieves editions and pricing information for games,
                  helping users find the best deals available.
                </Text>
              </View>
              <Text style={[styles.text, { paddingLeft: 16 }]}>
                &#8226; Icons by Icons8 and Expo vector-icons
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flexDirection: "column",
    backgroundColor: "#232526",
  },

  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },

  subText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 24,
  },
});
