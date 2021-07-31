import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Button,
} from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import financeServices from "../../services/financeServices";
import styles from "./AddNewTransaction.styles";
import * as transactionServices from "./AddNewTransaction.services";
import * as storage from "../../services/storageServices";

const AddNewTransaction = () => {
  const [symbol, setSymbol] = useState("");
  const [priceAtBuy, setPriceAtBuy] = useState("");
  const [investedAmount, setInvestedAmount] = useState("");
  const [autocompleteNames, setAutocompleteNames] = useState([]);

  async function setAutocompleteNamesHandler(searchTerm) {
    setAutocompleteNames(await financeServices.getAutoCompleteData(searchTerm));
  }

  async function addNewTransaction() {
    const transaction = {
      priceAtBuy: priceAtBuy,
      investedAmount: investedAmount,
      transactionKey: Math.random().toString(),
    };
    transactionServices.addTransaction(transaction, symbol);
  }

  const clearAllData = () => {
    storage.default.clearAllData();
  };

  return (
    <SafeAreaView
      style={styles.container}
      keyboardShouldPersistTaps={"handled"}
    >
      <View style={styles.inputContainer}>
        <SearchableDropdown
          selectedItems={symbol}
          onItemSelect={(item) => {
            setSymbol(item);
          }}
          containerStyle={{ padding: 7 }}
          itemStyle={styles.dropdownItems}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={autocompleteNames}
          textInputProps={{
            placeholder: "Share symbol",
            style: styles.dropdownTextInput,
            onTextChange: (text) => {
              setAutocompleteNamesHandler(text);
            },
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder=" Price at buy"
          placeholderTextColor="#788793"
          onChangeText={setPriceAtBuy}
        />
        <TextInput
          style={styles.textInput}
          placeholder=" Invested amount"
          keyboardType="numeric"
          placeholderTextColor="#788793"
          onChangeText={setInvestedAmount}
        />
        <TouchableOpacity
          style={styles.addTransactionButton}
          onPress={addNewTransaction}
        >
          <Text style={styles.addTransactionText}>ADD TRANSACTION</Text>
        </TouchableOpacity>
      </View>
      {/* <View>
        <Button
          style={styles.button}
          title="Delete all data"
          onPress={transactionServices.clearAllData}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default AddNewTransaction;
