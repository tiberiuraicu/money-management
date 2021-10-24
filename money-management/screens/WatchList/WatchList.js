import React, { useState, useEffect } from "react";
import {
  RefreshControl,
  ActivityIndicator,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { getWatchList } from "./WatchList.services";
import styles from "./WatchList.styles";
import Card from "../../components/Card";
import CardRow from "../../components/CardRow";
import CustomText from "../../components/CustomText";

const WatchList = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [activityIndicator, setActivityIndicator] = useState(true);
  const [watchListSharesList, setWatchListSharesList] = useState([]);

  async function setWatchListSharesListHandler() {
    setActivityIndicator(true);

    setWatchListSharesList(await getWatchList());
    setActivityIndicator(false);
  }

  useEffect(() => {
    if (isFocused) {
      setWatchListSharesListHandler();
    }
  }, [isFocused]);

  //PRE(premaket), REGULAR(regular)
  const getProfitLossColor = (number) => {
    let itemCardText = {};

    if (number > 0) itemCardText["color"] = "green";
    if (number < 0) itemCardText["color"] = "red";

    return itemCardText;
  };
  return (
    <ScrollView
      style={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={setWatchListSharesListHandler}
        />
      }
    >
      <View style={styles.itemlist}>
        {activityIndicator && (
          <ActivityIndicator size="large" color="#F2FCFE" />
        )}
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
              <Card key={itemData.item.name} style={styles.card}>
                <Text style={styles.itemCardCompanyName}>
                  {itemData.item.symbol}
                </Text>

                <CardRow>
                  <CustomText >Price </CustomText>
                  <CustomText
                    style={getProfitLossColor(
                      itemData.item.regularMarketChange
                    )}
                  >
                    {itemData.item.regularMarketPrice}
                    {"  "}
                    {itemData.item.regularMarketChange} ({" "}
                    {itemData.item.regularMarketChangePercent} %)
                  </CustomText>
                </CardRow>
                <CardRow>
                  <CustomText>Extended hours price</CustomText>
                  <CustomText
                    style={getProfitLossColor(
                      itemData.item.extendedHoursChange
                    )}
                  >
                    {itemData.item.extendedHoursPrice}
                    {"  "}
                    {itemData.item.extendedHoursChange} ({" "}
                    {itemData.item.extendedHoursChangePercent})
                  </CustomText>
                </CardRow>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default WatchList;
