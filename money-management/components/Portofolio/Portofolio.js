import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as portofolioServices from "./Portofolio.services";
import styles from "./Portofolio.styles";
const Portofolio = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [ownedSharesList, setOwnedSharesList] = useState([]);
  const [portofolioValue, setPortofolioValue] = useState();

  async function setPortofolioValueHandler() {
    const [portofolioValue, sharesAnalyticsList] =
      await portofolioServices.getAnalyticsForAllShares();
    setOwnedSharesList(sharesAnalyticsList);

    setPortofolioValue(portofolioValue.toFixed(2));
  }

  useEffect(() => {
    if (isFocused) {
      setPortofolioValueHandler();
    }
  }, [isFocused]);

  const getProfitLossColor = (number) => {
    let itemCardText = {
      color: "#374046",
      fontStyle: "italic",
    };

    if (number > 0) itemCardText["color"] = "green";
    if (number < 0) itemCardText["color"] = "red";

    return itemCardText;
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.portofolioValueContainer}>
        <Text style={styles.portofolioValueText}>
          Portofolio value {portofolioValue}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addTransactionButton}
        onPress={() => {
          navigation.navigate("AddNewTransaction");
        }}
      >
        <Text style={styles.addTransactionText}>ADD HOLDINGS</Text>
      </TouchableOpacity>

      <View style={styles.itemlist}>
        <FlatList
          data={ownedSharesList}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SharePage", {
                  symbol: itemData.item.symbol,
                })
              }
            >
              <View key={itemData.item.symbol} style={styles.shareCardData}>
                <View>
                  <Text style={styles.itemCardCompanyName}>
                    {itemData.item.companyName}
                  </Text>
                </View>
                <View style={styles.alanyticView}>
                  <Text style={styles.itemCardLabel}>Total value</Text>
                  <Text style={styles.itemCardLabel}>
                    {Number(itemData.item.shareTotalValue).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.alanyticView}>
                  <Text style={styles.itemCardLabel}>Profit/Loss </Text>
                  <Text
                    style={getProfitLossColor(
                      Number(itemData.item.shareTotalProfit).toFixed(2)
                    )}
                  >
                    {Number(itemData.item.shareTotalProfit).toFixed(2)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Portofolio;
