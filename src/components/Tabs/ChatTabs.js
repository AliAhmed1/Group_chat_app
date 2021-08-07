import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WSBTrends from "../WSBTrends";
import InsiderTrades from "../InsiderTrades";
import Notifications from "../Notifications";
import OptionsAlerts from "../OptionsAlerts";
import PublicGroups from "../PublicGroups";
import PrivateGroups from "../PrivateGroups";
import {
  View,
  Text,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Tab = createMaterialTopTabNavigator();

function ChatTabs() {
  return (
    <Tab.Navigator
      lazy={true}
      // tabBarOptions={{
      //   activeTintColor: "#FFF",
      //   inactiveTintColor: "#657786",
      //   showIcon: true,
      //   tabStyle: { height: 50, backgroundColor: "#000" },
      //   indicatorStyle: { backgroundColor: "#FFF", borderWidth: 0 },
      //   iconStyle: { width: "100%" },
      //   style: { justifyContent: "center", backgroundColor: "#000" },
      //   labelStyle: { fontWeight: "700" },
      // }}
      tabBarOptions={{
        scrollEnabled: true,
        activeTintColor: "#FFF",
        inactiveTintColor: "#657786",
        indicatorStyle: { backgroundColor: "#000", borderWidth: 0 },
        initialLayout: { width: Dimensions.get("window").width },

        tabStyle: {
          width: "auto",
        },
        style: { backgroundColor: "#000" },
        labelStyle: {
          fontWeight: "700",
          fontSize: 18,
        },
      }}
    >
      <Tab.Screen name="Notifications" component={Notifications} />

      {/* <Tab.Screen name="Private Groups" component={PrivateGroups} /> */}
      <Tab.Screen name="Groups" component={PublicGroups} />
      <Tab.Screen name="WSB Trends" component={WSBTrends} />
      <Tab.Screen name="Discover" component={PublicGroups} />
    </Tab.Navigator>
  );
}

export default ChatTabs;
