import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  ActivityIndicator,
  View,
  ScrollView,
  FlatList,
  Text,
  RefreshControl
} from "react-native";
import styles from "./SharePage.styles";
import { getShareMetrics, getShareEarnings } from "./SharePage.services";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
} from "victory-native";
import Svg from "react-native-svg";
import Card from "../../components/Card";
import CardRow from "../../components/CardRow";
import CustomText from "../../components/CustomText";

const SharePage = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const [activityIndicator, setActivityIndicator] = useState(true);
  const [shareData, setshareData] = useState([]);
  const [shareEarnings, setShareEarnings] = useState({
    EPS: {
      estimate: [],
      actual: [],
    },
  });
  var { symbol } = route.params;
  const setshareDataHandler = async () => {
    setActivityIndicator(true);

    setshareData(await getShareMetrics(symbol));
    setActivityIndicator(false);
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            setshareDataHandler();
            setShareEarningsHandler();
          }}
        />
      }
    >
      <Text style={styles.companyName}>{symbol}</Text>
      {activityIndicator && <ActivityIndicator size="large" color="#F2FCFE" />}
      <View >
        <FlatList
          data={shareData}
          renderItem={(itemData) => (
            <Card key={itemData.item.name} style={styles.card}>
              <CardRow>
                <CustomText>{itemData.item.name}</CustomText>
                <CustomText>{itemData.item.value}</CustomText>
              </CardRow>
            </Card>
          )}
        />
        <View
          style={{
            backgroundColor: "white",
            paddingTop: "5%",
            width:"95%",alignSelf:"center",
            borderTopEndRadius:10,
            borderTopStartRadius:10
          }}
        >
          <Text style={styles.chartTitle}>EPS last 4 quarters</Text>
        </View>
      </View>
      <View
        style={{  marginBottom:50, paddingTop: 10, backgroundColor: "white", width:"95%",alignSelf:"center" }}
      >
        <Svg>
          <VictoryChart
            theme={VictoryTheme.material}
            padding={{ top: 100, left: 50, right: 30, bottom: 40 }}
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
                padding={{ top: 20, bottom: 20 }}
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
