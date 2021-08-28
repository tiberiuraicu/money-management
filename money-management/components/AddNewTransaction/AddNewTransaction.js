import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Button,
  FlatList,
  Switch,
} from "react-native";
import financeServices from "../../services/financeServices";
import styles from "./AddNewTransaction.styles";
import * as transactionServices from "./AddNewTransaction.services";
import * as storage from "../../services/storageServices";

const AddNewTransaction = () => {
  const [symbol, setSymbol] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [placeholders, setPlaceholders] = useState({
    price: "Price at buy",
    amount: "Number of shares bought",
    transactionType: "BUY",
  });
  const [price, setPrice] = useState("");
  const [numberOfShares, setNumberOfShares] = useState("");
  const [autocompleteNames, setAutocompleteNames] = useState([]);

  async function setAutocompleteNamesHandler(searchTerm) {
    setSymbol(searchTerm);
    setAutocompleteNames(await financeServices.getAutoCompleteData(searchTerm));
  }

  async function addNewTransaction() {
    var transaction = {};
    if (placeholders.transactionType === "BUY")
      transaction = {
        price: price,
        numberOfShares: numberOfShares,
        transactionKey: Math.random().toString(),
        transactionType: placeholders.transactionType,
      };
    else if (placeholders.transactionType === "SELL")
      transaction = {
        price: price,
        numberOfShares: numberOfShares,
        transactionKey: Math.random().toString(),
        transactionType: placeholders.transactionType,
      };
    transactionServices.addTransaction(transaction, symbol);
  }

  const clearAllData = () => {
    storage.default.clearAllData();
  };

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if (isEnabled) {
      setPlaceholders({
        price: "Price at buy",
        amount: "Number of shares bought",
        transactionType: "BUY",
      });
    } else if (!isEnabled) {
      setPlaceholders({
        price: "Price at sell",
        amount: "Number of shares sold",
        transactionType: "SELL",
      });
    }
  };
  const flatListStyle = () => {
    if (autocompleteNames.length == 0) return { height: 0 };
    else return { height: 20 };
  };
  return (
    <SafeAreaView
      style={styles.container}
      keyboardShouldPersistTaps={"handled"}
    >
      <View
        style={{
          marginTop: "5%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {placeholders.transactionType}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={symbol}
          style={styles.textInput}
          placeholder=" Search term"
          placeholderTextColor="#788793"
          onChangeText={setAutocompleteNamesHandler}
        />
        <View style={flatListStyle}>
          <FlatList
            data={autocompleteNames}
            keyboardShouldPersistTaps="always"
            renderItem={(itemData) => (
              <TouchableOpacity
                onPress={() => {
                  setSymbol(itemData.item.symbol);
                  setAutocompleteNames([]);
                }}
              >
                <View key={itemData.item.name} style={styles.shareCardData}>
                  <View style={styles.alanyticView}>
                    <Text style={styles.itemCardText}>
                      {itemData.item.symbol}
                    </Text>
                    <Text style={styles.itemCardText}>
                      {itemData.item.name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder={placeholders.price}
          placeholderTextColor="#788793"
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.textInput}
          placeholder={placeholders.amount}
          keyboardType="numeric"
          placeholderTextColor="#788793"
          onChangeText={setNumberOfShares}
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
          onPress={clearAllData}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default AddNewTransaction;
