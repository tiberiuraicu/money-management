import React from "react";
import AddNewTransaction from "./components/AddNewTransaction/AddNewTransaction";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PortofolioNavigator from "./components/Portofolio/PortofolioNavigator";
import WatchList from "./components/WatchList/WatchList";
import Search from "./components/Search/Search";
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
              <MaterialCommunityIcons name="eye" color={color} size={25} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={28} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
