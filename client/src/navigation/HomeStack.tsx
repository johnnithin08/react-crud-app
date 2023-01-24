import React, { Component, FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Details, Expenses } from "../pages";

const StackNavigator = createNativeStackNavigator<HomeStackType>();
const { Navigator, Screen } = StackNavigator;

export const HomeStack: FunctionComponent = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Expenses" component={Expenses} />
      <Screen name="Details" component={Details} />
    </Navigator>
  );
};
