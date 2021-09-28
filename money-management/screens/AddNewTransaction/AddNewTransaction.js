import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Switch,
  Button,
  ScrollView,
  Keyboard,
} from "react-native";

import styles from "./AddNewTransaction.styles";
import * as transactionServices from "./AddNewTransaction.services";
import * as models from "../../models/models";
import TextInputCustom from "../../components/TextInputCustom";
import Card from "../../components/Card";
import CardRow from "../../components/CardRow";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";

const AddNewTransaction = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [placeholders, setPlaceholders] = useState({
    price: "Price at buy",
    amount: "Number of shares bought",
    transactionType: "BUY",
  });

  const [symbol, setSymbol] = useState("");

  const [symbolValidation, setSymbolValidation] = useState(false);
  const [symbolValidationErrorMessage, setSymbolValidationErrorMessage] =
    useState("");

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

  const [autocompleteNames, setAutocompleteNames] = useState([]);

  async function setAutocompleteNamesHandler(searchTerm) {
    setSymbol(searchTerm);

    setSymbolValidation(false);
    setSymbolValidationErrorMessage("");

    if (searchTerm === "") {
      setSymbolValidation(false);
      setSymbolValidationErrorMessage("This field cannot be empty");
    }
    setAutocompleteNames(
      await transactionServices.getAutoCompleteData(searchTerm)
    );
  }

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

  async function addNewTransaction() {
    var transaction = new models.default.getTransaction(
      price,
      numberOfShares,
      placeholders.transactionType
    );
    transactionServices.addTransaction(transaction, symbol);
  }

  function toggleSwitch() {
    setIsEnabled(!isEnabled);

    setPlaceholders({
      price: "Price at " + (isEnabled ? "buy" : "sell"),
      amount: "Number of shares " + (isEnabled ? "bought" : "sold"),
      transactionType: isEnabled ? "BUY" : "SELL",
    });
  }
  return (
    <ScrollView keyboardShouldPersistTaps="always" scrollEnabled={false}>
      <View style={styles.switchContainer}>
        <Switch
          testID="buySellSwitch"
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor="#f4f3f4"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {placeholders.transactionType}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInputCustom
          testID="searchTerm"
          value={symbol}
          placeholder=" Search term"
          onChangeText={setAutocompleteNamesHandler}
          contextMenuHidden={true}
        />
        {!symbolValidation && (
          <Text testID="symbolErrorMessage" style={styles.errorMessage}>
            {symbolValidationErrorMessage}
          </Text>
        )}
        <View>
          <FlatList
            data={autocompleteNames}
            keyboardShouldPersistTaps="always"
            renderItem={(itemData) => (
              <TouchableOpacity
                key={itemData.item.name}
                onPress={() => {
                  setSymbol(itemData.item.symbol);
                  setAutocompleteNames([]);
                  setSymbolValidation(true);
                }}
              >
                <Card>
                  <CardRow>
                    <CustomText>{itemData.item.symbol}</CustomText>
                    <CustomText>{itemData.item.name}</CustomText>
                  </CardRow>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
        <TextInputCustom
          testID="price"
          keyboardType="numeric"
          placeholder={placeholders.price}
          onChangeText={setPriceHandler}
          contextMenuHidden={true}
        />
        {!priceValidation && (
          <Text style={styles.errorMessage}>{priceValidationErrorMessage}</Text>
        )}
        <TextInputCustom
          testID="amount"
          placeholder={placeholders.amount}
          keyboardType="numeric"
          onChangeText={setNumberOfSharesHandler}
          contextMenuHidden={true}
        />
        {!numberOfSharesValidation && (
          <Text testID="amountErrorMessage" style={styles.errorMessage}>
            {numberOfSharesValidationErrorMessage}
          </Text>
        )}
        <CustomButton
          testID="addTransactionButton"
          onPress={() => {
            Keyboard.dismiss();
            if (symbolValidation && priceValidation && numberOfSharesValidation)
              addNewTransaction();
          }}
          text="ADD TRANSACTION"
        ></CustomButton>
      </View>
      <View>
        <Button
          style={styles.button}
          title="Delete all data"
          onPress={transactionServices.clearAllData()}
        />
      </View>
    </ScrollView>
  );
};

export default AddNewTransaction;
