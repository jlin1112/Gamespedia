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

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const searchWidth = useRef(new Animated.Value(1)).current;

  const handleSearch = () => {
    console.log("search");
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
            onFocus={shrinkSearch}
            onBlur={expandSearch}
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
    // backgroundColor: '#eee',
    // padding: 10,
    flex: 1,
    paddingVertical: 16,
    borderColor: "red",
  },
  searchBar: {
    // flex:1,
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
    // paddingHorizontal: 10,
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
    // flex:1,
    flexDirection: "row",
    gap: 16,

    overflow: "hidden",
    // justifyContent:'space-between'
  },
  cancelButton: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    justifyContent: "center",
    // borderColor:'red',
    // borderWidth:2,
    // flex:1,
  },
});

export default SearchBar;
