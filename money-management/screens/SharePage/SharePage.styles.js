import { StyleSheet } from "react-native";
import * as constants from "./../../constants/appConstants"

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor:constants.BACKGROUND_COLOR,
  },
  companyName: {
    marginTop: "5%",
    marginBottom: "5%",
    alignSelf: "center",
    color: "white",
    fontSize: 20,
  },

  chartTitle: {
    color: "#374046",
    fontStyle: "italic",
    marginLeft: "10%",
  },
  card:{
    width:"95%",
    alignSelf:"center"
  }
});
