import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create({
  listContainer: {
    width: "100%",
    height:Dimensions.get('window').height
  },
  itemlist: {
    marginTop: "4%",
    height: "90%",
    paddingBottom: 20,
    marginBottom: 200,
  },
  portofolioValueContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  portofolioValueText: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
    paddingLeft: 10,
    alignSelf: "center",
  },
  itemCardCompanyName: {
    alignSelf: "center",
    color: "#374046",
    fontSize: 15,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  
});
