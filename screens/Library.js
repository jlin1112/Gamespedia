import { useState, useRef, useEffect, useCallback, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  Platform,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { GameDataContext } from "../uitils/GameDataContext";

export default function Library({ navigation }) {
  const {libraryList, setLibraryList} = useContext(GameDataContext)
  const [items, setItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false)

  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getAsyncItems = async () => {
        try {
          const existingGameDataJSON = await AsyncStorage.getItem("library");
          const existingGameData = existingGameDataJSON
            ? JSON.parse(existingGameDataJSON)
            : [];

          setItems(existingGameData);
        } catch (error) {
          setItems(null);
        }
      };
      getAsyncItems();
    }, [])
  );

  const handleLongPress = (item) => {
    setModalVisible(true);
    setDeleteItem(item);
  };

  const handleDelete = async () => {
    setDeleting(true)
    const updatedGameData = items.filter((item) => item.id != deleteItem.id);
    setItems(updatedGameData);
    try {
      const updatedGameDataJSON = JSON.stringify(updatedGameData);
      await AsyncStorage.setItem("library", updatedGameDataJSON);
      setDeleting(false)
      
    } catch (error) {
     setDeleting(false)
      return;
    }
    setModalVisible(false);
  };




  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setDeleteItem(null);
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          {deleting? <ActivityIndicator /> :  <View
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              borderRadius: 10,
              marginHorizontal: 8,
            }}
          >
            <Text
              style={{ marginBottom: 16, textAlign: "center", fontSize: 16 }}
            >
              Remove
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                {deleteItem?.name}
              </Text>
              from your library?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Pressable onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
              </Pressable>
              <Pressable onPress={handleDelete}>
                <Text style={{ color: "#FF033E" }}>Remove</Text>
              </Pressable>
            </View>
          </View>}
         
        </View>
      </Modal>

      <View style={{ paddingHorizontal: 8 }}>
        <Text style={[styles.text, { marginBottom: 16 }]}>Library</Text>

        <View>
          {libraryList.length > 0 ? (
            <FlatList
              data={libraryList}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={({ pressed }) =>
                      !pressed
                        ? styles.trendingCard
                        : [
                            styles.trendingCard,
                            { backgroundColor: "rgba(53, 63, 84, .6)" },
                          ]
                    }
                    key={item.id}
                    onPress={() =>
                      navigation.navigate("Detail", {
                        IGDB_id: item.id,
                      })
                    }
                    onLongPress={() => handleLongPress(item)}
                  >
                    <View style={styles.trendingTextContainer}>
                      <Text
                        style={[styles.trendingText, { textAlign: "left" }]}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={[styles.trendingText, { textAlign: "left" }]}
                      >
                        Saved on : {new Date(item.data).toLocaleDateString()}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.id}
              // showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.text}>No Games Yet</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    // paddingHorizontal: 16,
    flexDirection: "column",
    backgroundColor: "#232526",
  },

  text: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  trendingCard: {
    backgroundColor: "rgba(53, 63, 84, .3)",
    flexDirection: "row",
    // height: Dimensions.get("window").height * 0.15,
    gap: 16,
    borderRadius: 20,
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
    // marginRight: 12,
    // alignItems: "center",
    padding: 16,
  },
  trendingText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    // marginTop: 8,
  },
});
