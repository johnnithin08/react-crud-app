import React, {
  Component,
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {FlatList, Image, Pressable, Text, View, ViewStyle} from 'react-native';
import axios from 'axios';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {CustomSpacer} from '../../../components/Views';
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
  sh12,
  sh16,
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
} from '../../../styles';
import {findCategoryImage} from '../../../utils/category-mapper';
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {NunitoRegular} from '../../../constants/fonts';

interface IExpenseItem {
  id: number;
  name: string;
  category: string;
  amount: string;
}

interface IExpensesProp {
  navigation: HomeStackNavigationProp;
}

export const Expenses: FunctionComponent<IExpensesProp> = ({
  navigation,
}: IExpensesProp) => {
  const [expenseList, setExpenseList] = useState<IExpenseItem[]>([]);

  const handleFetch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get_expenses');
      console.log('resp', response.data.message);
      setExpenseList(response.data.message);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleAddExpense = () => {
    navigation.navigate('Details');
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const addViewStyle: ViewStyle = {
    ...border(colorBlack._1, sw1, sw100),
    ...absolutePosition,
    ...centerHV,
    backgroundColor: colorGreen._1,
    height: sh40,
    width: sh40,
    bottom: 20,
    right: 20,
  };
  return (
    <SafeAreaView style={flexChild}>
      <View style={{backgroundColor: colorGreen._1, height: sh48, ...centerHV}}>
        <Text style={fs16BoldBlack2}>Expenses</Text>
      </View>
      <FlatList
        data={expenseList}
        renderItem={({item, index}) => {
          const {id, name, category, amount} = item;
          const getCategoryImage = findCategoryImage(category);
          console.log('cat', category);
          return (
            <Fragment key={id}>
              {index !== 0 ? <CustomSpacer space={sh12} /> : null}
              <View
                style={{
                  backgroundColor: colorWhite._1,
                  ...border(colorTransparent, sw1, sw8),
                  ...flexChild,
                  ...px(sw24),
                  ...py(sh12),
                }}>
                <View style={flexRow}>
                  <View>
                    <Image
                      source={getCategoryImage}
                      style={{...imageContain, height: 60, width: 50}}
                    />
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
                  </View>
                </View>
              </View>
            </Fragment>
          );
        }}
        keyboardShouldPersistTaps="always"
        keyExtractor={(item: IExpenseItem, index: number) => `${item}-${index}`}
      />
      <Pressable style={addViewStyle} onPress={handleAddExpense}>
        {/* <FontAwesome5 name="plus" size={sh24} /> */}
      </Pressable>
    </SafeAreaView>
  );
};
