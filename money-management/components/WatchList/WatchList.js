import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as financeServices from "../../services/financeServices";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import styles from "./WatchList.styles";

const WatchList = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [ownedSharesList, setOwnedSharesList] = useState([]);
  const [portofolioValue, setPortofolioValue] = useState();
  const [chartData, setchartData] = useState([]);

  async function setPortofolioValueHandler() {
    try {
      var sharesAnalyticsList =
        await financeServices.default.getAnalyticsForAllShares();
      setOwnedSharesList(sharesAnalyticsList);
      var portofolioValue = 0;
      var data = [];

      sharesAnalyticsList.map((item) => {
        portofolioValue += item.shareTotalValue;
        data.push({
          name: item.symbol,
          population: item.shareTotalValue,
          color: item.pieChartColor,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        });
      });
      setchartData(data);
      setPortofolioValue(portofolioValue.toFixed(2));
    } catch (exception) {}
  }

  useEffect(() => {
    if (isFocused) {
      setPortofolioValueHandler();
    }
  }, [isFocused]);

  return (
    <View style={styles.listContainer}>
      <View>
        <View style={styles.portofolioValueContainer}>
          <Text style={styles.portofolioValueText}>
            Portofolio value {portofolioValue}
          </Text>
        </View>
      </View>
      <View style={styles.itemlist}>
        <FlatList
          data={ownedSharesList}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SharePageNavigator", {
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
                  <Text style={styles.itemCardText}>Total value</Text>
                  <Text style={styles.itemCardText}>
                    {Number(itemData.item.shareTotalValue).toFixed(2)}
                  </Text>
                </View>
                <View style={styles.alanyticView}>
                  <Text style={styles.itemCardText}>Profit </Text>
                  <Text style={styles.itemCardText}>
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

export default WatchList;
