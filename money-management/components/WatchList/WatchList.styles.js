import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listContainer: {
    width: "100%",
    height: "75%",
    // borderBottomWidth: 2,
    // borderBottomColor: "red",
  },

  itemlist: {
    height: "80%",
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 200,
  },
  shareCardData: {
    padding: 10,
    height: 80,
    width: "100%",
    paddingTop: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    marginBottom: "2%",
    backgroundColor: "#FFFFFF",
  },
  alanyticView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemCardText: {
    color: "#374046",
    fontStyle: "italic",
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
