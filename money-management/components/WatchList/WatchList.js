import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getWatchList } from "./WatchList.services";
import styles from "./WatchList.styles";

const WatchList = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [watchListSharesList, setWatchListSharesList] = useState([]);

  async function setWatchListSharesListHandler() {
    setWatchListSharesList(await getWatchList());
  }

  useEffect(() => {
    if (isFocused) {
      setWatchListSharesListHandler();
    }
  }, [isFocused]);

  //PRE(premaket), REGULAR(regular)
  const getProfitLossColor = (number) => {
    let itemCardText = {
      color: "#374046",
      fontStyle: "italic",
    };

    if (number > 0) itemCardText["color"] = "green";
    if (number < 0) itemCardText["color"] = "red";

    return itemCardText;
  };
  function getExtendedHours(item) {
    if (item.marketState === "POST") return;
    <View style={styles.alanyticView}>
      <Text style={styles.itemCardText}>Extended hours price </Text>
      <Text style={getProfitLossColor(item.extendedHoursChange)}>
        {item.extendedHoursPrice}
        {"  "}
        {item.extendedHoursChange} ( {item.extendedHoursChangePercent * 100})
      </Text>
    </View>;
    if (item.marketState === "PRE")
      return (
        <View style={styles.alanyticView}>
          <Text style={styles.itemCardText}>Extended hours price </Text>
          <Text style={getProfitLossColor(item.extendedHoursChange)}>
            {item.extendedHoursPrice}
            {"  "}
            {item.extendedHoursChange} ( {item.extendedHoursChangePercent * 100}
            )
          </Text>
        </View>
      );
  }
  return (
    <View style={styles.listContainer}>
      <View style={styles.itemlist}>
        <FlatList
          data={watchListSharesList}
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
                    {itemData.item.symbol}
                  </Text>
                </View>

                <View style={styles.alanyticView}>
                  <Text style={styles.itemCardText}>Regular market price </Text>
                  <Text
                    style={getProfitLossColor(
                      itemData.item.regularMarketChange
                    )}
                  >
                    {itemData.item.regularMarketPrice}
                    {"  "}
                    {itemData.item.regularMarketChange} ({" "}
                    {itemData.item.regularMarketChangePercent})
                  </Text>
                </View>
                {getExtendedHours(itemData.item)}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default WatchList;
