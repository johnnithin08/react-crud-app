import { Screen } from "@react-navigation/elements";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import React, { Component, FunctionComponent, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NewDropdown } from "../../components/Dropdown/Dropdown";
import { CustomTextInput } from "../../components/Input/Input";
import { CustomButton } from "../../components/Touchables/Button";
import { CustomSpacer } from "../../components/Views";
import { ActionButtons } from "../../components/Views/ActionButtons";
import { DICTIONARY_CATEGORIES } from "../../dictionary/categories";
import {
  centerHV,
  centerVertical,
  flexChild,
  flexRow,
  fs12BoldBlack2,
  fs16BoldBlack2,
  fs24BoldBlack2,
  px,
  sh16,
  sh24,
  sh32,
  sw24,
  sw48,
} from "../../styles";

interface DetailsProps {
  navigation: HomeStackNavigationProp;
  route: RouteProp<HomeStackType, "Details">;
}

export const Details: FunctionComponent<DetailsProps> = ({ navigation, route }: DetailsProps) => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [category, setCategory] = useState<string>("");
  let id: string | undefined;
  if (route.params !== undefined) {
    const { id: expenseId } = route.params;
    id = expenseId;
  }

  const handleExpenseCategory = (text: string) => {
    setCategory(text);
  };

  const handleBack = () => {
    navigation.navigate("Expenses");
  };

  const handleAddExpense = async () => {
    try {
      const response = await axios.post("http://localhost:3001/add_expense", {
        name: name,
        amount: amount,
        category: DICTIONARY_CATEGORIES[DICTIONARY_CATEGORIES.findIndex((eachValue) => eachValue.label === category)].value,
      });
      console.log("resp", response.data.message);
      navigation.navigate("Expenses");
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleEditExpense = async () => {
    try {
      const response = await axios.post("http://localhost:3001/edit_expense", {
        id: id,
        name: name,
        amount: amount,
        category: DICTIONARY_CATEGORIES[DICTIONARY_CATEGORIES.findIndex((eachValue) => eachValue.label === category)].value,
      });
      console.log("resp", response.data.message);
      navigation.navigate("Expenses");
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleFetch = async () => {
    console.log("id", id);
    try {
      const response = await axios.post("http://localhost:3001/get_expense", {
        id: id.toString(),
      });
      console.log("resp", response.data.message[0]);
      const data = response.data.message[0];
      setAmount(data.amount.toString());
      setName(data.name);
      setCategory(DICTIONARY_CATEGORIES[DICTIONARY_CATEGORIES.findIndex((eachCategory) => eachCategory.value === data.category)].label);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSave = () => {
    if (id !== undefined) {
      handleEditExpense();
    } else {
      handleAddExpense();
    }
  };

  useEffect(() => {
    if (id !== undefined) {
      handleFetch();
    }
  }, []);
  return (
    <SafeAreaView>
      <CustomSpacer space={sh32} />
      <View style={{ ...px(sh24) }}>
        <View style={{ ...flexRow, ...centerVertical }}>
          <Pressable onPress={handleBack}>
            <FontAwesome5 name="arrow-left" size={sh24} />
          </Pressable>
          <CustomSpacer isHorizontal={true} space={sh24} />
          <Text style={fs24BoldBlack2}>Details</Text>
        </View>
        <CustomSpacer space={sh32} />
        <CustomTextInput label="Name" onChangeText={setName} spaceToLabel={sh16} value={name} />
        <CustomSpacer space={sh24} />
        <CustomTextInput keyboardType="numeric" label="Amount" spaceToLabel={sh16} onChangeText={setAmount} value={amount} />
        <CustomSpacer space={sh24} />
        <NewDropdown
          items={DICTIONARY_CATEGORIES}
          label={"Category"}
          placeholder={"Select One"}
          handleChange={handleExpenseCategory}
          spaceToLabel={sh16}
          value={category}
        />
        <CustomSpacer space={sh32} />
        <View>
          <ActionButtons handleCancel={handleBack} handleContinue={handleSave} labelContinue={"Save"} />
        </View>
      </View>
    </SafeAreaView>
  );
};
