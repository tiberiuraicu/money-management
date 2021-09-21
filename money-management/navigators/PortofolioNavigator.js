import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Portofolio from "../screens/Portofolio/Portofolio";
import SharePage from "../screens/SharePage/SharePage";
import AddNewTransaction from "../screens/AddNewTransaction/AddNewTransaction";
const Stack = createStackNavigator();

function PortofolioNavigator() {
  return (
    <Stack.Navigator initialRouteName="Portofolio">
      <Stack.Screen name="Portofolio" component={Portofolio} />
      <Stack.Screen name="SharePage" component={SharePage} />
      <Stack.Screen name="AddNewTransaction" component={AddNewTransaction} />
    </Stack.Navigator>
  );
}
export default PortofolioNavigator;
