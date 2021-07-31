import React from "react";
import AddNewTransaction from "./components/AddNewTransaction/AddNewTransaction";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PortofolioNavigator from "./components/Portofolio/PortofolioNavigator";
import WatchList from "./components/WatchList/WatchList";

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  //initial screen
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        barStyle={{
          backgroundColor: "white",
          fontSize: 15,
          borderTopWidth: 2,
          // borderTopColor: "red",
        }}
      >
        <Tab.Screen
          name="Portofolio"
          component={PortofolioNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="chart-arc"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WatchList"
          component={WatchList}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="eye" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Add new transaction"
          component={AddNewTransaction}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
