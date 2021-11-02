import { StyleSheet } from "react-native";
import * as constants from "./../../constants/appConstants";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: constants.BACKGROUND_COLOR,
  },
  inputContainer: {
    height: 400,
    paddingTop: "10%",
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "#F2FCFE",
    borderRadius: 10,
  },
  switchContainer: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
  },
  switchText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  errorMessage: {
    color: "red",
    marginLeft: "5%",
    height: "5%",
  },
  input: {
    height: "15%",
  },
  searchTermInput:{
    borderRadius: 10,
    height: "15%",
    borderWidth: 1,
    margin: 11,
    paddingLeft: 10,
  },
  card: {
    width: "95%",
    alignSelf: "center",
  },
});
