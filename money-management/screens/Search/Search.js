import React, { useState } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import financeServices from "../../services/financeServices";
import styles from "./Search.styles";
import * as searchServices from "./Search.services";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../components/Card";
import TextInputCustom from "../../components/TextInputCustom";
import CustomText from "../../components/CustomText";
import CardRow from "../../components/CardRow";

const Search = ({ navigation }) => {
  const [autocompleteNames, setAutocompleteNames] = useState([]);
  const [watchList, setWatchList] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  async function setAutocompleteNamesHandler(searchTerm) {
    setSearchTerm(searchTerm);
    setWatchList(await searchServices.getWatchList());

    setAutocompleteNames(await financeServices.getAutoCompleteData(searchTerm));
  }

  function addOrRemoveFromWatchListSymbol(symbol) {
    if (watchList === null) {
      return (
        <MaterialCommunityIcons name="plus-circle" color={"black"} size={26} />
      );
    } else if (watchList[symbol] !== undefined)
      return (
        <MaterialCommunityIcons name="minus-circle" color={"black"} size={26} />
      );
    else if (watchList[symbol] === undefined) {
      return (
        <MaterialCommunityIcons name="plus-circle" color={"black"} size={26} />
      );
    }
  }
  async function addToWatchListHandler(symbol) {
    await searchServices.addToWatchList(symbol);
    setAutocompleteNamesHandler(searchTerm);
  }

  return (
    <SafeAreaView
      style={styles.container}
      keyboardShouldPersistTaps={"handled"}
    >
      <TextInputCustom
        style={styles.textInput}
        placeholder=" Search term"
        onChangeText={setAutocompleteNamesHandler}
      />
      <FlatList
        data={autocompleteNames}
        keyboardShouldPersistTaps="always"
        renderItem={(itemData) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SharePage", {
                symbol: itemData.item.symbol,
              });
            }}
          >
            <Card key={itemData.item.name} style={styles.card}>
              <CardRow>
                <CustomText>{itemData.item.interfaceSymbol}</CustomText>
                <CustomText>{itemData.item.name}</CustomText>
                <TouchableOpacity
                  onPress={() => {
                    addToWatchListHandler(itemData.item.symbol);
                  }}
                >
                  {addOrRemoveFromWatchListSymbol(itemData.item.symbol)}
                </TouchableOpacity>
              </CardRow>
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
