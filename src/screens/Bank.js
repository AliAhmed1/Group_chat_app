import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
  Share,
} from "react-native";

import {
  Icon,
  Header,
  Left,
  Right,
  Body,
  Button,
  Footer,
  FooterTab,
} from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        "Hey - I have an invite to StockChat and want you to join. Here is the link! https://stockchat.me",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Bank = (props) => {
  return (
    <View style={styles.container}>
      <Header
        style={{
          backgroundColor: "#03196D",
          borderBottomWidth: 0,
          flexDirection: "row",
          //marginTop: 25,
          marginHorizontal: 30,
          alignItems: "center",
          justifyContent: "center",
          //flex: 1
        }}
      >
        <Left>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="settings" size={30} color="#FFF" />
          </TouchableOpacity>
        </Left>
        <Body>
          {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.header}>$2,137.47</Text>
          </TouchableOpacity> */}
        </Body>
        <Right>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("Activity")}
          >
            <AntDesign
              style={{ paddingRight: 10 }}
              name="qrcode"
              size={30}
              color="#FFF"
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("LinkPortfolio")}
          >
            <Feather name="plus" size={30} color="#FFF" />
          </TouchableOpacity>
        </Right>
      </Header>
      <View style={styles.col}>
        <Text style={styles.balance}> Total Balance </Text>

        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.total}> $32,651.74</Text>
          <Text style={styles.change}> +20.13% this week </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ChartComp symbol="TSLA" /> */}

        <View
          style={{ backgroundColor: "white", margin: 20, borderRadius: 20 }}
        >
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Personal Checking </Text>
              <Text style={styles.header2}> Schwab </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>$12,137.47</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Investments </Text>
              <Text style={styles.header2}> Schwab </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>$12,137.47</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Cryptocurrency </Text>
              <Text style={styles.header2}> Coinbase </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>$12,137.47</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Credit </Text>
              <Text style={styles.header2}> American Express </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>$12,137.47</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", paddingLeft: 30 }}>
          <Text style={{ color: "#03196D", paddingRight: 20 }}> Expenses </Text>
          <Text style={{ color: "grey" }}> Earnings </Text>
        </View>
        <View
          style={{ backgroundColor: "white", margin: 20, borderRadius: 20 }}
        >
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Blue Bottle </Text>
              <Text style={styles.header2}> Food & Drink </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>- $5.47</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Blue Bottle </Text>
              <Text style={styles.header2}> Food & Drink </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>- $5.47</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.col2}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}> Blue Bottle </Text>
              <Text style={styles.header2}> Food & Drink </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.header}>- $5.47</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* <View
        style={{
          paddingBottom: 50,
          flexDirection: "row",
          justifyContent: "center",
          paddingHorizontal: 20
        }}
      >
        <Button
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => props.navigation.navigate("LinkPortfolio")}
          //   onPress={() => setModal(true)}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 19,
              fontWeight: "bold"
            }}
          >
            Add Account
          </Text>
        </Button>
        {/* <Button
          style={{ width: 150, alignItems: "center", justifyContent: "center" }}
          onPress={() => props.navigation.navigate("LinkPortfolio")}
        >
          <Text style={{ color: "#FFF", fontSize: 19, fontWeight: "bold" }}>
            Sell
          </Text>
        </Button>
      </View> */}
    </View>
  );
};
export default Bank;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
  },
  btn: {
    padding: 50,
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row",
  },
  seperator: {
    borderColor: "lightgrey",
    borderWidth: 0.5,
    marginLeft: 30,
    marginVertical: 10,
    width: "100%",
  },
  gradient: {
    height: "100%",
    //position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    //paddingHorizontal: 20,
    paddingTop: 30,
  },
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    //height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 50,
    paddingVertical: 10,
  },
  container: {
    height: "100%",
    //backgroundColor: "#000",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    //paddingTop: 30
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 30
    //paddingHorizontal: 20
  },
  header: {
    //fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    //flex: 1,
    fontSize: 20,
    //paddingLeft: 10
    //textAlign: "center"
  },

  balance: {
    //fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    //flex: 1,
    fontSize: 20,
    //paddingLeft: 10
    //textAlign: "center"
  },
  total: {
    //fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    //flex: 1,
    fontSize: 30,
    //paddingLeft: 10
    //textAlign: "center"
  },
  change: {
    //fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    //flex: 1,
    fontSize: 20,
    //textAlign: "center"
  },

  coins: {
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 25,
    paddingLeft: 10,
  },
  buycoins: {
    //fontFamily: "Montserrat_500Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    paddingLeft: 10,
  },
  coinrow: {
    paddingVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  proContainer: {
    //marginRight: -20,
    alignSelf: "center",
  },
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#000",
    // marginHorizontal: -20,
    //paddingHorizontal: 20
  },
  col: {
    flexDirection: "column",
    backgroundColor: "#03196D",
    //marginTop: 25,
    padding: 30,
    //alignItems: "center",
    justifyContent: "space-between",
  },
  col2: {
    flexDirection: "row",
    //marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    //borderBottomWidth: 0.5,
    // borderTopWidth: 0.5,
    // borderColor: "#7c818c",
    paddingVertical: 20,
    //backgroundColor: "grey"
  },
  stockchats: {
    //flexDirection: "row"
    marginVertical: 10,
    marginHorizontal: 20,
    //alignItems: "center"
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
  },
  invite: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 5,
    //paddingHorizontal: 20,
    paddingVertical: 10,
    width: 100,
  },
  earncoins: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: -10,
    paddingVertical: 5,
    width: 120,
    borderWidth: 1,
    borderColor: "lightgrey",
  },
  earnbox: {
    backgroundColor: "orange",
    //padding: 50,
    margin: 20,
    borderRadius: 20,
    justifyContent: "flex-start",
    height: 200,
  },
});
