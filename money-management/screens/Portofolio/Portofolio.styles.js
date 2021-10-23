import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  listContainer: {
    width: "100%",
    backgroundColor:"#075985",
    height:"90%"

  },
  itemlist: {
    marginTop: "2.5%",
  },
  addTransactionButton:{
    height:"3.5%",
    marginTop:"1.5%",
    marginBottom:"0%"
  },
  portofolioValueContainer: {
    marginTop:"10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#075985",
  },
  portofolioValueText: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingLeft: 10,
    alignSelf: "center",
    color:"white"
  },
  itemCardCompanyName: {
    alignSelf: "center",
    color: "#374046",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
  },
});
