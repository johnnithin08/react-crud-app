import { Screen } from "@react-navigation/elements";
import React, { Component, FunctionComponent, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NewDropdown } from "../../components/Dropdown/Dropdown";
import { CustomTextInput } from "../../components/Input/Input";
import { CustomSpacer } from "../../components/Views";
import { flexChild, px, sh16, sh24, sh32, sw24, sw48 } from "../../styles";

export const Details: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>("");

  const handleExpenseCategory = (text: string) => {
    setCategory(text);
  };
  return (
    <SafeAreaView>
      <CustomSpacer space={sh32} />
      <View style={{ ...px(sw48) }}>
        <CustomTextInput label="Name" onChangeText={setName} spaceToLabel={sh16} />
        <CustomSpacer space={sh24} />
        <CustomTextInput keyboardType="numeric" label="Amount" spaceToLabel={sh16} onChangeText={setAmount} />
        <CustomSpacer space={sh24} />
        <NewDropdown items={[{ label: "1", value: "1" }]} placeholder={"Select One"} handleChange={handleExpenseCategory} value={""} />
      </View>
    </SafeAreaView>
  );
};
