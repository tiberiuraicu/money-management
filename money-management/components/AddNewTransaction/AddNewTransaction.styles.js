import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    height: 600,
    marginTop: "5%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  shareCardData: {
    width: "94%",
    margin: "2%",
    paddingTop: "2%",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderWidth: 1,
  },
  alanyticView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemCardText: {
    color: "#374046",
    fontStyle: "italic",
  },
  textInput: {
    borderRadius: 10,
    height: "10%",
    color: "#212121",
    borderWidth: 1,
    fontSize: 18,
    margin: 11,
    paddingLeft: 10,
  },
  addTransactionButton: {
    width: "80%",
    height: "10%",
    backgroundColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "10%",
    marginTop: "10%",
    marginBottom: "10%",
  },
  addTransactionText: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 20,
    alignSelf: "center",
  },
});
