/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { RootNavigator } from "./src/navigation";
import { flexChild } from "./src/styles/common";

export const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle={"dark-content"} />
        <Fragment>
          {Platform.select({
            android: (
              <KeyboardAvoidingView behavior="padding" enabled={true} style={flexChild}>
                <RootNavigator />
              </KeyboardAvoidingView>
            ),
            ios: <RootNavigator />,
          })}
        </Fragment>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
