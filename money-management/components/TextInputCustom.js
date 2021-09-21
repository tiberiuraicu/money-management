import React from "react";
import { StyleSheet, TextInput } from "react-native";

const TextInputCustom = (props) => {
  return (
    <TextInput
      {...props}
      style={{ ...styles.textInput, ...props.style }}
      placeholderTextColor="#788793"
      placeholder={props.placeholder}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 10,
    height: "10%",
    color: "#212121",
    borderWidth: 1,
    fontSize: 18,
    margin: 11,
    paddingLeft: 10,
  },
});

export default TextInputCustom;
