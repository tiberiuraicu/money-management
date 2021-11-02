import React from "react";
import { StyleSheet, Text } from "react-native";

const ErrorMessage = (props) => {
  function errorMessageColor(errorTruthValue) {
    return {
      color: !errorTruthValue ? "red" : "transparent",
      marginLeft: "5%",
      height: "5%",
    };
  }
  return (
    <Text
      style={{ ...errorMessageColor(props.errorTruthValue), ...props.style }}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#374046",
    fontStyle: "italic",
  },
});

export default ErrorMessage;
