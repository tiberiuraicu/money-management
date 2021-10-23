import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listContainer: {
    width: "100%",
    backgroundColor:"#030455",
  },
  itemlist: {
    marginTop: "10%",
    paddingTop:"5%",
    paddingBottom:"10%",
    borderTopStartRadius:25,
    borderTopEndRadius:25,
    backgroundColor:"#F2FCFE"
  },
  addTransactionButton:{
    backgroundColor:"#677aa7",
    height:"3.5%",
    marginTop:"10%",
    marginBottom:"0%",
  },
  portofolioValueContainer: {
    marginTop:"10%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
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
