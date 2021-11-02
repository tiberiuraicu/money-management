import { StyleSheet } from "react-native";
import * as constants from "./../../constants/appConstants";

export default StyleSheet.create({
  listContainer: {
    width: "100%",
    flex: 1,
    paddingTop: "10%",
    backgroundColor: constants.BACKGROUND_COLOR,
    paddingBottom: "10%",
  },

  itemlist: {
    flex: 1,
    paddingBottom: "10%",
  },

  itemCardCompanyName: {
    alignSelf: "center",
    color: "#374046",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  card: {
    width: "95%",
    alignSelf: "center",
  },
});
