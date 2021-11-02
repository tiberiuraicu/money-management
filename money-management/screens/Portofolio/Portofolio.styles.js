import { StyleSheet } from "react-native";
import * as constants from "./../../constants/appConstants";

export default StyleSheet.create({
  listContainer: {
    width: "100%",
    backgroundColor: constants.BACKGROUND_COLOR,
  },
  itemlist: {
    marginTop: "10%",
    paddingTop: "5%",
    paddingBottom: "10%",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#F2FCFE",
  },
  addTransactionButton: {
    backgroundColor: "#677aa7",
    height: "3.5%",
    marginTop: "10%",
    marginBottom: "0%",
  },
  portofolioValueContainer: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  portofolioValueText: {
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 10,
    alignSelf: "flex-end",
    color: "white",
  },
  itemCardCompanyName: {
    alignSelf: "center",
    color: "#374046",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  actionsPanel: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#FFFFFF",
    
    borderRadius: 10,
    width: "15%",
    marginBottom: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    alignItems: "center",
  },
});
