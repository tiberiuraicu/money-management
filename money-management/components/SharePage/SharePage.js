import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, ScrollView, FlatList, Text } from "react-native";
import styles from "./SharePage.styles";
import { getShareMetrics, getShareEarnings } from "./SharePage.services";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const SharePage = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [shareData, setshareData] = useState([]);
  const [shareEarnings, setShareEarnings] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
        strokeWidth: 2, // optional
      },
    ],
    legend: ["EPS Actual"], // optional
  });
  const { symbol } = route.params;
  const setshareDataHandler = async () => {
    setshareData(await getShareMetrics(symbol));
  };

  const setShareEarningsHandler = async () => {
    let response = await getShareEarnings(symbol);
    let x = {};
    x["labels"] = response.EPS.date;
    x["datasets"] = [];

    x.datasets.push({
      data: response.EPS.actual,
      color: (opacity = 1) => "blue",

      strokeWidth: 2,
    });

    setShareEarnings(x);
  };

  useEffect(() => {
    if (isFocused) {
      setshareDataHandler();
      setShareEarningsHandler();
    }
  }, [isFocused]);

  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `black`,
    strokeWidth: 2, // optional, default 3
    useShadowColorFromDataset: false, // optional
    strokeWidth: 0,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "black",
    },
    // propsForVerticalLabels: {
    //   r: "6",
    //   strokeWidth: "2",
    //   stroke: "black",
    // },
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.companyName}>{symbol}</Text>
      <View style={styles.itemlist}>
        <View
          style={{
            backgroundColor: "white",
            paddingTop: "5%",
          }}
        >
          <Text>EPS</Text>
          <LineChart
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: "80%",
            }}
            data={shareEarnings}
            width={
              Dimensions.get("window").width -
              (Dimensions.get("window").width * 5) / 100
            }
            height={220}
            chartConfig={chartConfig}
            withShadow={false}
            res
          />
        </View>
        <FlatList
          data={shareData}
          renderItem={(itemData) => (
            <View style={styles.shareCardData}>
              <View style={styles.alanyticView}>
                <Text style={styles.itemCardText}>{itemData.item.name}</Text>

                <Text style={styles.itemCardText}>{itemData.item.value}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default SharePage;
