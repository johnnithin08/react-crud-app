declare type HomeStackType = {
  Expenses: undefined;
  Details: { id: string } | undefined;
};

declare type HomeStackNavigationProp = import("@react-navigation/native-stack").NativeStackNavigationProp<HomeStackType>;
