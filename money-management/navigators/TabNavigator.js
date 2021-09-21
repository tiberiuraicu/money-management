import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PortofolioNavigator from "./PortofolioNavigator";
import WatchList from "../screens/WatchList/WatchList";
import Search from "../screens/Search/Search";
import History from "../screens/History/History";
const TabNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();

  //initial screen
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{
          backgroundColor: "white",
          fontSize: 15,
          borderTopWidth: 2,
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
        {/* <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" color={color} size={25} />
            ),
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigator;
