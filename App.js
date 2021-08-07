import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChatStackNavigator from "./src/navigations/Navigator";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import { AppLoading } from "expo";
import NavigationServices from "./src/Util/NavigationServices";

const App = () => {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationServices.setTopLevelNavigator(navigatorRef);
      }}
    >
      <ChatStackNavigator />
    </NavigationContainer>
  );
};
export default App;
