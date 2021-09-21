import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./History.styles";
import { getShareHistory,getHistory } from "./History.services";
import Card from "../../components/Card";
import CardRow from "../../components/CardRow";
import CustomText from "../../components/CustomText";

const History = ({ route, navigation }) => {
  const [shareHistory, setShareHistory] = useState([]);

  const isFocused = useIsFocused();

  // const { symbol } = route.params;

  const setShareHistoryHandler = async () => {
  // await getShareHistory(symbol)
  await getHistory()
  };

  useEffect(() => {
    if (isFocused) {
      setShareHistoryHandler();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={shareHistory}
        renderItem={(itemData) => (
          <Card>
            <CardRow>
              <CustomText>Price at buy</CustomText>
              <CustomText>{itemData.item.priceAtBuy}</CustomText>
            </CardRow>
            <CardRow>
              <CustomText>Invested amount</CustomText>
              <CustomText>{itemData.item.investedAmount}</CustomText>
            </CardRow>
          </Card>
        )}
      />
    </View>
  );
};

export default History;
