import React from "react";
import { StyleSheet, View } from "react-native";

const CustomRow= (props) => {
  return <View style={styles.row}>{props.children}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CustomRow;
