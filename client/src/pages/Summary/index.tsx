import axios from "axios";
import React, { Component, Fragment, FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-chart-kit";
import { CustomSpacer, Loading } from "../../components/Views";
import { centerHV, colorGreen, flexChild, fs16BoldBlack2, px, sh100, sh24, sh32, sh48 } from "../../styles";
import { DICTIONARY_CHART_COLORS } from "../../utils/chart-color";
import { DICTIONARY_CATEGORIES } from "../../dictionary/categories";
import { useIsFocused } from "@react-navigation/native";

interface IGroupedExpenses {
  name: string;
  amount: string;
}

export const Summary: FunctionComponent = () => {
  const [groupedExpenses, setGroupedExpenses] = useState<IGroupedExpenses[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isFocused = useIsFocused();

  const handleFetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://raplrb14t9.execute-api.ap-south-1.amazonaws.com/get_grouped_expenses");
      console.log("resp", response);
      setGroupedExpenses(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchExpenses();
  }, [isFocused]);

  const chartData = groupedExpenses.map((eachGroup: IGroupedExpenses, index: number) => {
    return {
      name: DICTIONARY_CATEGORIES[DICTIONARY_CATEGORIES.findIndex((eachCategory) => eachCategory.value === eachGroup.name)].label,
      amount: parseInt(eachGroup.amount, 10),
      color: DICTIONARY_CHART_COLORS[index],
      legendFontColor: "#7F7F7F",
      legendFontSize: 10,
    };
  });

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <SafeAreaView style={flexChild}>
      <View style={{ backgroundColor: colorGreen._1, height: sh48, ...centerHV }}>
        <Text style={fs16BoldBlack2}>Expense Summary</Text>
      </View>
      {loading === true ? (
        <Loading />
      ) : (
        <Fragment>
          <CustomSpacer space={sh32} />
          <View style={flexChild}>
            {/* <View style={{ ...px(100), backgroundColor: "red" }}> */}
            <PieChart
              data={chartData}
              width={380}
              height={300}
              chartConfig={chartConfig}
              accessor={"amount"}
              backgroundColor={"transparent"}
              paddingLeft={"40"}
              // paddingR
              // center={[0, 50]}
              // absolute={true}
              // hasLegend={false}
              // center={[10, 90]}
              avoidFalseZero={true}
            />
            {/* </View> */}
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
};
