import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./SharePage.styles";
import { getShareMetrics, getShareEarnings } from "./SharePage.services";
// import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  Bar,
  VictoryGroup,
  VictoryLegend,
} from "victory-native";
import Svg from "react-native-svg";
const SharePage = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [shareData, setshareData] = useState([]);
  const [shareEarnings, setShareEarnings] = useState({
    EPS: {
      estimate: [],
      actual: [],
    },
  });
  var { symbol } = route.params;
  const setshareDataHandler = async () => {
    setshareData(await getShareMetrics(symbol));
  };

  const setShareEarningsHandler = async () => {
    setShareEarnings(await getShareEarnings(symbol));
  };
  useEffect(() => {
    if (isFocused) {
      setshareDataHandler();
      setShareEarningsHandler();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.companyName}>{symbol}</Text>
      <View style={styles.itemlist}>
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
        <View
          style={{
            backgroundColor: "white",
            paddingTop: "5%",
          }}
        >
          <Text style={styles.chartTitle}>EPS last 4 quarters</Text>
        </View>
      </View>
      <View
        style={{ paddingBottom: 50, paddingTop: 10, backgroundColor: "white" }}
      >
        <Svg>
          <VictoryChart
            theme={VictoryTheme.material}
            padding={{ top: 100, left: 40, right: 20, bottom: 40 }}
            style={{
              background: { fill: "white" },
            }}
          >
            <VictoryLegend
              x={20}
              y={10}
              title="Legend"
              centerTitle
              orientation="horizontal"
              gutter={20}
              style={{
                border: { stroke: "black" },
                title: { fontSize: 20 },
              }}
              data={[
                { name: "Estimate", symbol: { fill: "blue" } },
                { name: "Actual", symbol: { fill: "green" } },
              ]}
            />
            <VictoryGroup offset={30} colorScale={["blue", "green"]}>
              <VictoryBar
                padding={{ top: 20, bottom: 60 }}
                activateData={false}
                data={shareEarnings.EPS.estimate}
              />
              <VictoryBar
                activateData={false}
                data={shareEarnings.EPS.actual}
              />
            </VictoryGroup>
          </VictoryChart>
        </Svg>
      </View>
    </ScrollView>
  );
};

export default SharePage;
