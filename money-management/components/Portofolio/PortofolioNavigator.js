import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Portofolio from "./Portofolio";
import SharePageNavigator from "../SharePage/SharePageNavigator";
const Stack = createStackNavigator();

function PortofolioNavigator() {
  return (
    <Stack.Navigator initialRouteName="Portofolio">
      <Stack.Screen name="Portofolio" component={Portofolio} />
      <Stack.Screen name="SharePageNavigator" component={SharePageNavigator} />
    </Stack.Navigator>
  );
}
export default PortofolioNavigator;
