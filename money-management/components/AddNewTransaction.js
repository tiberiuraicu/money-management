import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Keyboard,
  StyleSheet,
} from "react-native";

import * as transactionServices from "../screens/AddNewTransaction/AddNewTransaction.services";
import * as models from "./../models/models";
import TextInputCustom from "./TextInputCustom";
import CustomButton from "./CustomButton";

const AddNewTransaction = (props) => {
  const symbol = props.symbol;
  const setModalVisible = props.setModalVisible;

  const [price, setPrice] = useState("");
  const [priceValidation, setPriceValidation] = useState(false);
  const [priceValidationErrorMessage, setPriceValidationErrorMessage] =
    useState("");

  const [numberOfShares, setNumberOfShares] = useState("");
  const [numberOfSharesValidation, setNumberOfSharesValidation] =
    useState(false);
  const [
    numberOfSharesValidationErrorMessage,
    setNumberOfSharesValidationErrorMessage,
  ] = useState("");

  function setNumberOfSharesHandler(numberOfSharesEntered) {
    const re = /^[0-9]*\.?[0-9]*$/;
    if (numberOfSharesEntered === "" || !re.test(numberOfSharesEntered)) {
      if (numberOfSharesEntered === "") {
        setNumberOfSharesValidation(false);
        setNumberOfSharesValidationErrorMessage("This field cannot be empty");
      }
      if (!re.test(numberOfSharesEntered)) {
        setNumberOfSharesValidation(false);
        setNumberOfSharesValidationErrorMessage("Only numbers accepted");
      }
    } else {
      setNumberOfSharesValidation(true);
      setNumberOfSharesValidationErrorMessage("");
    }
    setNumberOfShares(numberOfSharesEntered);
  }

  function setPriceHandler(price) {
    const re = /^[0-9]*\.?[0-9]*$/;
    if (price === "" || !re.test(price)) {
      if (price === "") {
        setPriceValidation(false);
        setPriceValidationErrorMessage("This field cannot be empty");
      }
      if (!re.test(price)) {
        setPriceValidation(false);
        setPriceValidationErrorMessage("Only numbers accepted");
      }
    } else {
      setPriceValidation(true);
      setPriceValidationErrorMessage("");
    }
    setPrice(price);
  }

  async function editHoldings() {
    var transaction = new models.default.getTransaction(
      price,
      numberOfShares,
      "BUY",
      "BUY"
    );
    transactionServices.editHoldings(symbol, transaction);
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.inputContainer}>
            <TextInputCustom
              style={{ height: "15%" }}
              testID="searchTerm"
              value={symbol}
              editabile="false"
              contextMenuHidden={true}
            />

            <TextInputCustom
              style={{ height: "15%" }}
              testID="price"
              keyboardType="numeric"
              placeholder="Medium price"
              onChangeText={setPriceHandler}
              contextMenuHidden={true}
            />
            <View height={priceValidationErrorMessage === "" ? 0 : 10}>
              {!priceValidation && (
                <Text style={styles.errorMessage}>
                  {priceValidationErrorMessage}
                </Text>
              )}
            </View>
            <TextInputCustom
              style={{ height: "15%" }}
              testID="amount"
              placeholder="Number of shares"
              keyboardType="numeric"
              onChangeText={setNumberOfSharesHandler}
              contextMenuHidden={true}
            />
            <View height={numberOfSharesValidationErrorMessage === "" ? 0 : 5}>
              {!numberOfSharesValidation && (
                <Text testID="amountErrorMessage" style={styles.errorMessage}>
                  {numberOfSharesValidationErrorMessage}
                </Text>
              )}
            </View>
            <CustomButton
              style={{ height: "15%" }}
              testID="addTransactionButton"
              onPress={() => {
                Keyboard.dismiss();

                if (priceValidation && numberOfSharesValidation) {
                  editHoldings();
                  setModalVisible(false);
                }
              }}
              text="EDIT"
            ></CustomButton>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginBottom: "50%",
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    height: 350,

    marginLeft: "5%",
    marginRight: "5%",
  },

  errorMessage: {
    color: "red",
    marginLeft: "5%",
  },
});

export default AddNewTransaction;
