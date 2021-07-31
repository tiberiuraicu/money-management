import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import History from "../History/History";
import SharePage from "./SharePage";
const Tab = createMaterialTopTabNavigator();

function SharePageNavigator({ route, navigation }) {
  let symbol = route.params.symbol;
  return (
    <Tab.Navigator initialRouteName="SharePage">
      <Tab.Screen
        name="SharePage"
        initialParams={{ symbol: symbol }}
        component={SharePage}
      />
      <Tab.Screen
        name="History"
        initialParams={{ symbol: symbol }}
        component={History}
      />
    </Tab.Navigator>
  );
}
export default SharePageNavigator;
