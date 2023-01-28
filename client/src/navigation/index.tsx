import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { Details } from "../pages";
import { HomeStack } from "./HomeStack";
import { Summary } from "../pages/Summary";

const TabNavigator = createBottomTabNavigator();
const { Navigator, Screen } = TabNavigator;

export const RootNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeStack} />
      <Screen name="Summary" component={Summary} />
    </Navigator>
  );
};
