import React from "react";
import { StyleSheet, View } from "react-native";

const PortfolioRow= (props) => {
  return <View style={styles.row}>{props.children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default PortfolioRow;
