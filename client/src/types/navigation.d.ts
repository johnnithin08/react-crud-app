declare type HomeStackType = {
  Expenses: undefined;
  Details: undefined;
};

declare type HomeStackNavigationProp =
  import("@react-navigation/native-stack").NativeStackNavigationProp<HomeStackType>;
