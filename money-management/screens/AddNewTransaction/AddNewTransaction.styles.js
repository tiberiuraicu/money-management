import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#030455",
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
  errorMessage: {
    color: "red",
    marginLeft: "5%",
    height:"5%"
  },
  input:{
    height:"15%",
  },
  card:{
    width:"95%",
    alignSelf:"center"
  }
});
