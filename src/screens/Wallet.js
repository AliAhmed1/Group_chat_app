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
import StockGroupCard from "../components/StockGroupCard";
import firebase, { firestore } from "../database/firebase";

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

const Wallet = (props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.col}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Feather name="chevron-left" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.header}>Wallet</Text>
      </View>
      <View style={styles.col2}>
        <Text style={styles.header2}>ChatCoin Balance</Text>
      </View>
      <View style={styles.coinrow}>
        <Feather name="stop-circle" size={30} color="orange" />
        <Text style={styles.coins}>0</Text>
        <TouchableOpacity style={styles.invite}>
          <Text style={{ color: "#F5F8FA", fontWeight: "500" }}>
            {" "}
            Cash Out{" "}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.earnbox}>
        <View style={styles.earncoins}>
          <Text style={{ color: "orange", fontWeight: "800", paddingRight: 5 }}>
            Earn 100
          </Text>
          <Feather name="stop-circle" size={30} color="orange" />
        </View>

        <Text
          style={{
            color: "#F5F8FA",
            fontWeight: "800",
            fontSize: 18,
            paddingRight: 5,
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          Invite an investor who signs up
        </Text>

        <TouchableOpacity style={styles.btn} onPress={onShare} title="Share">
          <Text
            style={{
              color: "#F5F8FA",
              fontWeight: "500",
              paddingRight: 5,
              fontSize: 18,
            }}
          >
            Copy my link
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#F5F8FA",
            fontWeight: "700",
            fontSize: 14,
            paddingHorizontal: 20,
            textAlign: "center",
            paddingTop: 20,
          }}
        >
          Share your link with other investors. Once 5 people you refer sign up,
          you'll earn 100 coins.
        </Text>
      </View>

      <View style={styles.col2}>
        <Text style={styles.header2}>Buy ChatCoin</Text>
      </View>
      <View style={styles.coinrow}>
        <Feather name="stop-circle" size={30} color="orange" />
        <Text style={styles.buycoins}>100 COINS</Text>
        <TouchableOpacity style={styles.invite}>
          <Text style={{ color: "#F5F8FA", fontWeight: "500" }}> $9.99 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.coinrow}>
        <Feather name="stop-circle" size={30} color="orange" />
        <Text style={styles.buycoins}>1,000 COINS</Text>
        <TouchableOpacity style={styles.invite}>
          <Text style={{ color: "#F5F8FA", fontWeight: "500" }}> $99.99 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.coinrow}>
        <Feather name="stop-circle" size={30} color="orange" />
        <Text style={styles.buycoins}>10,000 COINS</Text>
        <TouchableOpacity style={styles.invite}>
          <Text style={{ color: "#F5F8FA", fontWeight: "500" }}> $399.99 </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.coinrow}>
        <Feather name="stop-circle" size={30} color="orange" />
        <Text style={styles.buycoins}>100,000 COINS</Text>
        <TouchableOpacity style={styles.invite}>
          <Text style={{ color: "#F5F8FA", fontWeight: "500" }}> $999.99 </Text>
        </TouchableOpacity>
      </View>

      <View></View>

      {/* <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          firebase
            .auth()
            .signOut()
            .then(function() {
              props.navigation.navigate("GetStarted");
            });
        }}
      >
        <Text style={{ color: "#F5F8FA", fontSize: 19, fontWeight: "bold" }}>
          Send to Bank
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};
export default Wallet;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
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
    backgroundColor: "#000",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    //paddingHorizontal: 20
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    paddingLeft: 10,
    //textAlign: "center"
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 18,
    paddingBottom: 10,
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
    flexDirection: "row",
    //marginTop: 25,
    marginHorizontal: 10,
    alignItems: "center",
    flex: 1,
  },
  col2: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
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
