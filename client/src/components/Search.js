import React, { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/colors";

const Search = ({ data, filterParam, onFilter }) => {
  const [searchText, setSearchText] = useState("");

  const handleFilter = (text) => {
    const filtered = data.filter((item) => item[filterParam].toLowerCase().includes(text.toLowerCase()));
    onFilter(filtered);
  };

  const handleTextChange = (text) => {
    setSearchText(text);
    if (text.length === 0) onFilter(data);
    else handleFilter(text);
  };

  const handleCancelPress = () => {
    setSearchText('');
    onFilter(data);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchText}
        placeholder={`Search by ${filterParam}`}
        placeholderTextColor={colors.text}
        onChangeText={handleTextChange}
        onEndEditing={() => handleFilter(searchText)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleFilter()}>
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.text,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 16,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    marginLeft: 16,
  },
});

export default Search;
