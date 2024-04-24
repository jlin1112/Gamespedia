import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Popularity", value: "1" },
  { label: "Release Date (New to Old)", value: "2" },
];

const DropdownComponent = ({sortValue, setSortValue, loading}) => {
  

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      value={sortValue}
      onChange={(item) => {
        setSortValue(item.value);
      }}
      disable={loading}
      mode="modal"
      containerStyle={styles.dropdownContainer}
      itemContainerStyle={styles.itemContainer}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal:8,
    height: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  dropdownContainer: {
    width: 200,
    borderRadius: 12,
    overflow: "hidden",
  },

  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
