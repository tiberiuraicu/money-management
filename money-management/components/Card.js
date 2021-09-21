import React from "react";
import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.shareCardData, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  shareCardData: {
    padding: 10,
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    marginBottom: "2%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10
  },
});

export default Card;
