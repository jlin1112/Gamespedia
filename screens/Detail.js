import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Vibration,
} from "react-native";
import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import Carousel from "react-native-reanimated-carousel";
import YoutubePlayer from "react-native-youtube-iframe";
import ScrollIndicator from "../components/ScrollIndicator";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import saveGame from "../uitils/saveGame";
import { GameDataContext } from "../uitils/GameDataContext";

const windowWidth = Dimensions.get("window").width;

export default function Detail() {
  // const token = useContext(TokenContext)
  const { libraryList, setLibraryList } = useContext(GameDataContext);
  const navigation = useNavigation();

  //states for displaying images and videos
  const [playing, setPlaying] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const [gameData, setGameData] = useState(null);
  const [screenLoading, setScreenLoading] = useState(true);
  const [screenError, setScreenError] = useState(false);

  const [onPC, setOnPC] = useState(false);

  const [displayItems, setDisplayItems] = useState(null);

  const createDisplayItemsArray = (data) => {
    const arr = [];
    data[0].cover &&
      arr.push({
        type: "image",
        url: data[0].cover.url.replace("t_thumb", "t_cover_big"),
      });
    data[0].screenshots &&
      data[0].screenshots.map((shot) =>
        arr.push({ type: "image", url: shot.url })
      );
    data[0].videos &&
      arr.push({
        type: "video",
        url: data[0].videos[0].video_id,
      });
    return arr;
  };

  const handleAdding = async (item) => {
    const newItem = { data: Date.now(), name: item[0].name, id: item[0].id };
    try {
      saveGame(newItem);
      setLibraryList((prev) => [...prev, newItem]);
    } catch (error) {
      return;
    }
  };

  const route = useRoute();
  const { IGDB_id } = route.params;

  useEffect(() => {
    async function getData() {
      setScreenLoading(true);

      try {
        const response = await axios.post(`http://${process.env.EXPO_PUBLIC_API_URL}/detail`, {
          gameID: IGDB_id,
        });

        setGameData(response.data);
        const display = createDisplayItemsArray(response.data);

        setDisplayItems(display);

        setOnPC(response.data[0].platforms.some((item) => item.id === 6));
        setTimeout(() => {
          setScreenLoading(false);
        }, 500);
      } catch (error) {
        setScreenLoading(false);
        setScreenError(true);
      }
    }
    getData();
  }, []);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageError(true);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  if (screenLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#232526",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (screenError) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#232526",
          paddingHorizontal: 16,
        }}
      >
        <Text style={[styles.text, { textAlign: "center" }]}>
          An error occurred while fetching data. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {gameData && (
        <ScrollView>
          <View style={{ marginBottom: 8 }}>
            {displayItems.length > 0 && (
              <Carousel
                width={windowWidth - 16}
                height={(windowWidth / 16) * 9}
                autoPlay={false}
                data={displayItems}
                scrollAnimationDuration={300}
                // mode="parallax"
                onSnapToItem={(index) => {
                  setActiveCard(index);
                }}
                renderItem={({ index }) =>
                  displayItems[index].type === "image" ? (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        // borderRadius: 6,
                        overflow: "hidden",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {loading && (
                        <View style={styles.loadingContainer}>
                          <ActivityIndicator size="large" />
                        </View>
                      )}
                      {!imageError ? (
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "contain",
                          }}
                          source={{
                            uri:
                              "https:" +
                              displayItems[index].url.replace(
                                "t_thumb",
                                "t_720p"
                              ),
                          }}
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                        />
                      ) : (
                        <Text style={styles.text}>
                          Image currently unavailable
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                      }}
                    >
                      {!videoError ? (
                        <YoutubePlayer
                          width={windowWidth}
                          height={(windowWidth / 16) * 9}
                          play={playing}
                          videoId={displayItems[index].url}
                          onChangeState={onStateChange}
                          onError={handleVideoError}
                        />
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={styles.text}>
                            Video currently unavailable
                          </Text>
                        </View>
                      )}
                    </View>
                  )
                }
              />
            )}

            <ScrollIndicator index={activeCard} length={displayItems.length} />
          </View>

          <Text style={styles.title}>{gameData[0].name}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text style={styles.text}>
              {gameData[0].first_release_date &&
                new Date(
                  gameData[0].first_release_date * 1000
                ).toLocaleDateString("default")}
            </Text>
            <Text style={styles.text}>
              {gameData[0].rating && gameData[0].rating.toFixed(1) + "/100"}
            </Text>
          </View>

          <View
            style={{
              marginBottom: 16,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {gameData[0].game_modes?.map((mode, index) => {
              return (
                <Text style={styles.text} key={index}>
                  {mode.name}
                </Text>
              );
            })}
          </View>

          {gameData[0].platforms && (
            <View style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {gameData[0].platforms.map((platform, index) => {
                  return (
                    <View style={styles.label} key={index}>
                      <Text style={styles.subtext}>{platform.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {gameData[0].involved_companies && (
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8 }]}>
                Involved Companies:
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {gameData[0].involved_companies.map((company, index) => {
                  return (
                    <View style={styles.label} key={index}>
                      <Text style={styles.subtext}>{company.company.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {gameData[0].themes && (
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8 }]}>Themes:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {gameData[0].themes.map((theme, index) => {
                  return (
                    <View style={styles.label} key={index}>
                      <Text style={styles.subtext}>{theme.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {gameData[0].summary && (
            <View style={{ marginBottom: 16 }}>
              <Text style={[styles.text, { marginBottom: 8 }]}>Summary:</Text>
              <View>
                {gameData[0].summary && (
                  <Text style={[styles.subtext, { lineHeight: 22 }]}>
                    {gameData[0].summary}
                  </Text>
                )}
              </View>
            </View>
          )}

          {gameData && (
            <View style={styles.buttons}>
              {libraryList.some((item) => item.id === gameData[0].id) ? (
                <Pressable
                  style={({ pressed }) =>
                    pressed
                      ? [styles.button2, { opacity: 0.8 }]
                      : styles.button2
                  }
                  onPress={() => {
                    navigation.navigate("Collections");
                  }}
                >
                  <Text style={styles.buttonText2}>Already in Collections</Text>
                </Pressable>
              ) : (
                <Pressable
                  style={({ pressed }) =>
                    pressed ? [styles.button, { opacity: 0.8 }] : styles.button
                  }
                  onPress={() => handleAdding(gameData)}
                >
                  <Text style={styles.buttonText}>Add to Collections</Text>
                </Pressable>
              )}

              <Pressable
                style={({ pressed }) =>
                  pressed ? [styles.button, { opacity: 0.8 }] : styles.button
                }
                onPress={() =>
                  navigation.navigate("Editions", {
                    gameName: gameData[0].name,
                    onPC: onPC,
                  })
                }
              >
                <Text style={styles.buttonText}>Pricing Details</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232526",
    paddingHorizontal: 8,
    paddingBottom: 40,
  },
  imageContainer: {
    width: windowWidth - 16,
    height: (windowWidth - 16) * 0.4,
  },
  artwork: {
    flex: 1,
    resizeMode: "cover",
    marginBottom: 16,
    borderRadius: 6,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  subtext: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  label: {
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },
  button: {
    borderColor: "#ffffff",
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  button2: {
    borderColor: "#ffffff",
    borderWidth: 1,
    backgroundColor: "#232526",
    borderRadius: 6,
  },
  buttonText: {
    color: "#232526",
    padding: 8,
  },
  buttonText2: {
    color: "#ffffff",
    padding: 8,
  },
});
