import React, { Component, Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Image, ImageStyle, Pressable, Text, View, ViewStyle } from "react-native";
import axios from "axios";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CustomFlexSpacer, CustomSpacer, Loading } from "../../../components/Views";
import {
  absolutePosition,
  border,
  centerHV,
  colorBlack,
  colorGreen,
  colorTransparent,
  colorWhite,
  flexChild,
  flexGrow,
  flexRow,
  fs12BoldBlack2,
  fs14BoldBlack2,
  fs16BoldBlack2,
  imageContain,
  px,
  py,
  sh1,
  sh10,
  sh100,
  sh12,
  sh16,
  sh20,
  sh24,
  sh40,
  sh48,
  sh50,
  sh8,
  spaceBetweenHorizontal,
  sw1,
  sw100,
  sw24,
  sw40,
  sw54,
  sw8,
} from "../../../styles";
import { findCategoryImage } from "../../../utils/category-mapper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { NunitoRegular } from "../../../constants/fonts";
import { useIsFocused } from "@react-navigation/native";

interface IExpenseItem {
  id: number;
  name: string;
  category: string;
  amount: string;
}

interface IExpensesProp {
  navigation: HomeStackNavigationProp;
}

export const Expenses: FunctionComponent<IExpensesProp> = ({ navigation }: IExpensesProp) => {
  const [expenseList, setExpenseList] = useState<IExpenseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://raplrb14t9.execute-api.ap-south-1.amazonaws.com/get_expenses");
      setExpenseList(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.post("https://raplrb14t9.execute-api.ap-south-1.amazonaws.com/delete_expense", { id: id });
      // setExpenseList(response.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    navigation.navigate("Details");
  };

  useEffect(() => {
    handleFetch();
  }, [isFocused]);

  const addViewStyle: ViewStyle = {
    ...border(colorBlack._1, sw1, sw100),
    ...absolutePosition,
    ...centerHV,
    backgroundColor: colorGreen._1,
    height: sh40,
    width: sh40,
    bottom: sh10,
    right: sh20,
  };

  const imageStyle: ImageStyle = {
    ...imageContain,
    height: sh50,
    width: sh50,
  };

  const editIconStyle: ViewStyle = {
    ...centerHV,
    ...border(colorBlack._1, sh1, sh100),
    height: sh40,
    width: sh40,
  };
  return (
    <SafeAreaView style={flexChild}>
      <View style={{ backgroundColor: colorGreen._1, height: sh48, ...centerHV }}>
        <Text style={fs16BoldBlack2}>Expenses</Text>
      </View>
      {loading === true ? (
        <Loading />
      ) : (
        <Fragment>
          <View>
            <FlatList
              data={expenseList}
              renderItem={({ item, index }) => {
                const { id, name, category, amount } = item;
                const handleEdit = () => {
                  navigation.navigate("Details", { id: id.toString() });
                };

                const handleDelete = async () => {
                  await handleDeleteExpense(id);
                  await handleFetch();
                };
                const getCategoryImage = findCategoryImage(category);

                return (
                  <Fragment key={id}>
                    {index !== 0 ? <CustomSpacer space={sh12} /> : null}
                    <View
                      style={{
                        ...border(colorTransparent, sw1, sw8),
                        ...flexChild,
                        ...px(sw24),
                        ...py(sh12),
                        backgroundColor: colorWhite._1,
                      }}>
                      <View style={flexRow}>
                        <View>
                          <Image source={getCategoryImage} style={imageStyle} />
                        </View>
                        <CustomSpacer isHorizontal={true} space={sw24} />
                        <View
                          style={{
                            ...flexChild,
                            ...py(sh8),
                            ...flexRow,
                          }}>
                          <View style={spaceBetweenHorizontal}>
                            <Text style={fs12BoldBlack2}>{name}</Text>
                            <Text style={fs12BoldBlack2}>{amount}</Text>
                          </View>
                          <CustomFlexSpacer />
                          {/* <View style={flexRow}> */}
                          <View style={{ ...centerHV, ...flexRow }}>
                            <Pressable style={editIconStyle} onPress={handleEdit}>
                              <FontAwesome5 color={colorBlack._1} name="edit" size={20} />
                            </Pressable>
                            <CustomSpacer isHorizontal={true} space={sh16} />
                            <Pressable style={editIconStyle} onPress={handleDelete}>
                              <FontAwesome5 color={colorBlack._1} name="trash" size={20} />
                            </Pressable>
                          </View>
                          {/* </View> */}
                        </View>
                      </View>
                    </View>
                  </Fragment>
                );
              }}
              ListFooterComponent={() => <CustomSpacer space={sh48} />}
              keyboardShouldPersistTaps="always"
              keyExtractor={(item: IExpenseItem, index: number) => `${item}-${index}`}
            />
            <CustomSpacer space={sh24} />
          </View>
          <Pressable style={addViewStyle} onPress={handleAddExpense}>
            <FontAwesome5 name="plus" size={sh24} />
          </Pressable>
        </Fragment>
      )}
    </SafeAreaView>
  );
};
