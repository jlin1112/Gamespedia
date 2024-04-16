import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Text,
  Pressable,
  Animated,
} from "react-native";
import axios from "axios";

const SearchBar = ({ fadeIn, fadeOut, setSearchResult, setSearchingResult, setSearchError }) => {
  const [searchText, setSearchText] = useState(null);

  const searchWidth = useRef(new Animated.Value(1)).current;

  const handleSearch = async () => {
    setSearchError(false)
    setSearchResult(null)
    setSearchingResult(true)
    if(!searchText){
      setSearchingResult(false)
      return
    }
    try {
      const headers = {
        "Client-ID": process.env.EXPO_PUBLIC_ClientId,
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_Bearer}`,
      };
      const requestBody = `fields name,cover.url,total_rating,genres.name, first_release_date; where category = 0 & version_parent= null & total_rating != null; search "${searchText}";limit 40;`;

      const response = await axios.post(
        "https://api.igdb.com/v4/games",
        requestBody,
        { headers }
      )
      response.data.sort( (a,b) => {
        return b.total_rating - a.total_rating;
      } )
      setTimeout(() => {
        setSearchingResult(false)
      },1000)
     
      setSearchResult(response.data)
     
    } catch (error) {
      setSearchingResult(false)
      setSearchError(true)
    }
  };

  const expandSearch = () => {
    setSearchText("");
    Animated.timing(searchWidth, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Keyboard.dismiss();
  };

  const shrinkSearch = () => {
    Animated.timing(searchWidth, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = () => {
    shrinkSearch();
    fadeOut();
  };
  const handleBlur = () => {
    expandSearch();
    fadeIn();
  };

  return (
    <View style={styles.container}>
      <View style={styles.animateContainer}>
        <Animated.View
          style={[
            styles.searchBar,
            {
              width: searchWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ["75%", "100%"],
              }),
            },
          ]}
        >
          <TextInput
            style={[styles.input]}
            placeholder="Search for Games"
            placeholderTextColor={"#232526"}
            onChangeText={setSearchText}
            value={searchText}
            onSubmitEditing={handleSearch}
            spellCheck={false}
            onFocus={handleFocus}
            onBlur={handleBlur}
            blurOnSubmit={true}
          />
        </Animated.View>
        <Animated.View style={[styles.cancelButton]}>
          <Pressable onPress={expandSearch}>
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    borderColor: "red",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    paddingHorizontal: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  buttons: {
    gap: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  animateContainer: {
    flexDirection: "row",
    gap: 16,
    overflow: "hidden",
  },
  cancelButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    justifyContent: "center",
  },
});

export default SearchBar;
