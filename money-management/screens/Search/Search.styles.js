import { StyleSheet } from "react-native";
import * as constants from "./../../constants/appConstants";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: constants.BACKGROUND_COLOR,
  },
  textInput: {
    borderColor: "white",
    height: 50,
    marginTop: 50,
    color: "white",
  },
  card: {
    width: "95%",
    alignSelf: "center",
  },
});
