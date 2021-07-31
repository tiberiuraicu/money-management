import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    height: 400,
    marginTop: "45%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  dropdownTextInput: {
    height: 60,
    color: "#788793",
    fontSize: 18,
    margin: "1.5%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdownItems: {
    width: "100%",
    padding: 10,
    marginTop: 2,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    borderRadius: 10,
    height: "15%",
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
  },
  addTransactionText: {
    color: "#ffffff",
    fontSize: 15,
    lineHeight: 20,
    alignSelf: "center",
  },
});
