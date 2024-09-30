import { CommonActions } from "@react-navigation/native";

const resetTo = (navigation: any, routeName: string, params?: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
};

export default resetTo;
