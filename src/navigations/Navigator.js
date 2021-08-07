import React, { useState } from "react";
import * as Linking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Feather } from "@expo/vector-icons";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

import Home from "../screens/Home";
import Discussion from "../screens/Discussion";
import StockChat from "../screens/StockChat";
import StockProfile from "../screens/StockProfile";

import Settings from "../screens/Settings";

import Chat from "../screens/Chat";
import Icon from "@expo/vector-icons/Ionicons";
import Icon2 from "@expo/vector-icons/Entypo";

import AddGroup from "../screens/Sub/AddGroup";
import AddGroupMember from "../screens/Sub/AddGroup_Members";
import AddMoreGroupMember from "../screens/Sub/AddMore_GroupMembers";
import GroupChat from "../screens/Sub/GroupChat";
import GroupInfo from "../screens/Sub/GroupInfo";

import GetStarted from "../screens/OnBoarding/GetStarted";
import ChoosingUsername from "../screens/OnBoarding/ChoosingUsername";
import VerifyPhoneNumber from "../screens/OnBoarding/VerifyPhoneNumber";
import PhoneNumber from "../screens/OnBoarding/PhoneNumber";
import LinkPortfolio from "../screens/LinkPortfolio";
import InviteFriends from "../screens/OnBoarding/InviteFriends";
import Notification from "../screens/OnBoarding/Notification";
import Success from "../screens/OnBoarding/Success";
import Login from "../screens/login";
import SignUp from "../screens/signup";
import CreateMsg from "../screens/CreateMsg";
import ChatRoom from "../screens/ChatRoom";
import fire, { firestore } from "../database/firebase";
import { useLinkProps } from "@react-navigation/native";
import Email from "../screens/OnBoarding/Email";
import Password from "../screens/OnBoarding/Password";
import StockDetails from "../components/StockDetails";
import TrendingStocks from "../components/TrendingStocks";
import Wallet from "../screens/Wallet";
import GroupProfile from "../screens/Sub/GroupProfile";
import Activity from "../screens/Activity";
import DirectMessages from "../screens/DirectMessages";
import LargeCap from "../components/Screeners/DefaultScreeners/LargeCap";
import MostVolatile from "../components/Screeners/DefaultScreeners/MostVolatile";
import Overbought from "../components/Screeners/DefaultScreeners/Overbought";
import Oversold from "../components/Screeners/DefaultScreeners/Oversold";
import PopularStocks from "../components/Screeners/DefaultScreeners/PopularStocks";
import TopGainers from "../components/Screeners/DefaultScreeners/TopGainers";
import Profile from "../screens/Profile";
import Editprofile from "../screens/Editprofile";
import Bank from "../screens/Bank";
import NavigationServices from "../Util/NavigationServices";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#147efb",
        inactiveTintColor: "#AAB8C2",
        style: {
          //height: "15%",
          //paddingTop: 15,
          paddingBottom: 10,
          backgroundColor: "#000",
          alignContent: "center",
          borderTopColor: "#282c34",
        },

        swipeEnabled: false,
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={30} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="Alerts"
        component={Activity}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Feather name="trending-up" color={color} size={30} />
          ),
        }}



      /> */}

      <Tab.Screen
        name="Chat"
        component={Chat}
        swipeEnabled={false}
        options={{
          tabBarLabel: "",
          swipeEnabled: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles" color={color} size={35} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          gestureEnabled: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const SideDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Chat" component={Chat} />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();
// const screenOptionStyle = {
//   headerShown: false
// };

const ChatStackNavigator = () => {
  const [isUser, SetUser] = useState(false);

  // const _deepLinking = () => {
  //   // If the app is already open, the app is foregrounded and a Linking event is fired
  //   Linking.addEventListener("url", (event) => {
  //     console.log("event", url);
  //     // _handleOpenURL(event.url);
  //   });

  //   // If the app is not already open, it is opened and the url is passed in as the initialURL
  //   Linking.getInitialURL()
  //     .then((url) => {
  //       console.log("event", url);
  //       if (url.includes("group")) {
  //         const item = url.split("group/")[1];
  //         console.log("item", item);
  //         NavigationServices.navigate("Discussion", { item });
  //       }
  //       // _handleOpenURL(url);
  //     })
  //     .catch((err) => {
  //       console.warn("Deep-Linking Error", err);
  //     });
  // };

  const _handleOpenURL = (url) => {
    if (url) {
      if (userExists) {
        const route = url.replace(/.*?:\/\//g, "");
        const id = route.match(/\/([^\/]+)\/?$/)[1];

        if (url.includes("classified_share")) {
          NavigationService.navigate("ClassifiedDetail", { classifiedId: id });
        } else if (url.includes("advertisement_share")) {
          NavigationService.navigate("AdvertismentDetail", { id });
        }
      }
    }
  };

  React.useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        SetUser(true);
        console.log("IF ===> ", isUser);
        // _deepLinking();
      } else {
        SetUser(false);
        console.log("ELSE ===>", isUser);
      }
    });
  });
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="ChoosingUsername"
        component={ChoosingUsername}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Password"
        component={Password}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="VerifyPhoneNumber"
        component={VerifyPhoneNumber}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PhoneNumber"
        component={PhoneNumber}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="LinkPortfolio"
        component={LinkPortfolio}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InviteFriends"
        component={InviteFriends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={BottomTabNavigator}
        //component={Chat}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="CreateChat"
        component={CreateMsg}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddMember"
        component={AddGroupMember}
        //options={{ title: "Add Receipents" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddMoreMember"
        component={AddMoreGroupMember}
        //options={{ title: "Add Receipents" }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Discussion"
        component={Discussion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockChat"
        component={StockChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockProfile"
        component={StockProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StockDetails"
        component={StockDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrendingStocks"
        component={TrendingStocks}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bank"
        component={Bank}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupProfile"
        component={GroupProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LargeCap"
        component={LargeCap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MostVolatile"
        component={MostVolatile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Overbought"
        component={Overbought}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Oversold"
        component={Oversold}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PopularStocks"
        component={PopularStocks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopGainers"
        component={TopGainers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DirectMessages"
        component={DirectMessages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Editprofile"
        options={{ headerShown: false }}
        component={Editprofile}
      />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
