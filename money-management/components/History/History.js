import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import styles from "./History.styles";
import { getShareHistory } from "./History.services";

const History = ({ route, navigation }) => {
  const [shareHistory, setShareHistory] = useState([]);

  const isFocused = useIsFocused();

  const { symbol } = route.params;

  const setShareHistoryHandler = async () => {
    setShareHistory(await getShareHistory(symbol));
  };

  useEffect(() => {
    if (isFocused) {
      setShareHistoryHandler();
    }
  }, [isFocused]);

  return (
    <View style={styles.itemlist}>
      <FlatList
        data={shareHistory}
        renderItem={(itemData) => (
          <View style={styles.shareCardData}>
            <View style={styles.alanyticView}>
              <Text style={styles.itemCardText}>Price at buy</Text>
              <Text style={styles.itemCardText}>
                {itemData.item.priceAtBuy}
              </Text>
            </View>
            <View style={styles.alanyticView}>
              <Text style={styles.itemCardText}>Invested amount</Text>

              <Text style={styles.itemCardText}>
                {itemData.item.investedAmount}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default History;
