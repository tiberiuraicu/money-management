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
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default Card;
