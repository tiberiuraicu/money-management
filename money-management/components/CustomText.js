import React from "react";
import { StyleSheet, Text } from "react-native";

const CustomText = (props) => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#374046",
    fontStyle: "italic",
  },
});

export default CustomText;
