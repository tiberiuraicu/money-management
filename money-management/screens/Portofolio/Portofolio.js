import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as portofolioServices from "./Portofolio.services";
import styles from "./Portofolio.styles";
import Card from "../../components/Card";
import CardRow from "../../components/CardRow";
import CustomText from "../../components/CustomText";
import CustomButton from "../../components/CustomButton";
import PortfolioRow from "../../components/PortfolioRow";
import AddNewTransaction from "./../../components/AddNewTransaction";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";

const Portofolio = ({ navigation }) => {
  const isFocused = useIsFocused();

  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [isCurrenciesModalVisible, setCurrenciesModalVisibility] =
    useState(false);

  const [editSymbol, setEditSymbol] = useState("");

  const [activityIndicator, setActivityIndicator] = useState(true);
  const [ownedSharesList, setOwnedSharesList] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [portofolioValue, setPortofolioValue] = useState();

  async function setPortofolioValueHandler() {
    setActivityIndicator(true);

    const [portofolioValue, sharesAnalyticsList] =
      await portofolioServices.getAnalyticsForAllShares();
    setActivityIndicator(false);
    setOwnedSharesList(sharesAnalyticsList);

    setPortofolioValue(portofolioValue);
  }

  async function toggleCurrenciesModal() {
    setCurrencies(await portofolioServices.getAvailableCurrencies());
    setCurrenciesModalVisibility(true)
  }

  const toggleEditModal = (symbol) => {
    setShareModalVisibility(!isShareModalVisible);
    setEditSymbol(symbol);
  };

  async function toggleDeleteModal(symbol) {
    Alert.alert(
      "Delete " + symbol ,
      "Are you sure you want to delete " + symbol + " ?",
      [
        {
          text: "Yes",
          onPress: async () => {
            await portofolioServices.deleteShareData(symbol);
            setPortofolioValueHandler();
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  useEffect(() => {
    if (isFocused) {
      setPortofolioValueHandler();
      
    }
  }, [isFocused]);

  return (
    <ScrollView
      style={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={setPortofolioValueHandler}
        />
      }
    >
      <View style={styles.portofolioValueContainer}>
        <Text style={styles.portofolioValueText}>{portofolioValue}</Text>
        <TouchableOpacity
          testID="money-multiple"
          onPress={toggleCurrenciesModal}
        >
          <MaterialCommunityIcons
            name="cash-multiple"
            color={"#4ade80"}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <CustomButton
        style={styles.addTransactionButton}
        onPress={() => {
          navigation.navigate("AddNewTransaction");
        }}
        text="ADD HOLDINGS"
      ></CustomButton>

      <View style={styles.itemlist}>
        {activityIndicator && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        <FlatList
          testID="sharesList"
          data={ownedSharesList}
          renderItem={(itemData) => (
            <PortfolioRow>
              <TouchableOpacity
                style={{ width: "80%" }}
                onPress={() =>
                  navigation.navigate("SharePage", {
                    symbol: itemData.item.symbol,
                  })
                }
              >
                <Card key={itemData.item.name}>
                  <Text style={styles.itemCardCompanyName}>
                    {itemData.item.companyName}
                  </Text>

                  <CardRow>
                    <CustomText>Total value</CustomText>
                    <CustomText>
                      {Number(itemData.item.shareTotalValue).toFixed(2)}
                    </CustomText>
                  </CardRow>

                  <CardRow>
                    <CustomText>Profit/Loss </CustomText>
                    <CustomText
                      style={{
                        color:
                          itemData.item.shareTotalProfit > 0 ? "green" : "red",
                      }}
                    >
                      {Number(itemData.item.shareTotalProfit).toFixed(2)}
                    </CustomText>
                  </CardRow>
                </Card>
              </TouchableOpacity>
              <View style={styles.actionsPanel}>
                <TouchableOpacity
                  testID="edit"
                  onPress={() => toggleEditModal(itemData.item.symbol)}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    color={"#848585"}
                    size={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="delete"
                  onPress={() => toggleDeleteModal(itemData.item.symbol)}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    color={"#FF8080"}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </PortfolioRow>
          )}
        />

        <Modal
          isVisible={isShareModalVisible}
          onRequestClose={() => {
            setShareModalVisibility(false);
          }}
          onModalHide={() => setPortofolioValueHandler()}
          statusBarTranslucent={true}
        >
          <TouchableOpacity
            onPress={() => {
              setShareModalVisibility(false);
              setPortofolioValueHandler();
            }}
          >
            <AddNewTransaction
              symbol={editSymbol}
              setModalVisible={setShareModalVisibility}
            />
          </TouchableOpacity>
        </Modal>

        <Modal
          isVisible={isCurrenciesModalVisible}
          onRequestClose={() => {
            setCurrenciesModalVisibility(false);
          }}
          onModalHide={() => setPortofolioValueHandler()}
          statusBarTranslucent={true}
        >
          <FlatList
            data={currencies}
            renderItem={(itemData) => (
              <Card>
                <TouchableOpacity
                  onPress={() => {
                    portofolioServices.setAppCurrency(itemData.item.symbol);
                    setPortofolioValueHandler();
                    setCurrenciesModalVisibility(false);
                  }}
                >
                  <CardRow>
                    <Text>{itemData.item.symbol}</Text>
                    <Text>{itemData.item.name}</Text>
                  </CardRow>
                </TouchableOpacity>
              </Card>
            )}
          ></FlatList>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Portofolio;
