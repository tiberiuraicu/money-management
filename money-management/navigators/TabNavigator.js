import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PortofolioNavigator from "./PortofolioNavigator";
import WatchList from "../screens/WatchList/WatchList";
import Search from "../screens/Search/Search";
import History from "../screens/History/History";
import { useNetInfo } from "@react-native-community/netinfo";
import { Text, View,StatusBar } from "react-native";
const TabNavigator = () => {
  const Tab = createMaterialBottomTabNavigator();
  const netInfo = useNetInfo();

  //initial screen
  return (
    <NavigationContainer>
       <StatusBar
        animated={true}
        backgroundColor="#030455"
         />
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
      {!netInfo.isConnected && <Text style={{textAlign: 'center',color:"#9d174d"}}>Not connected</Text>}

    </NavigationContainer>
  );
};
export default TabNavigator;
