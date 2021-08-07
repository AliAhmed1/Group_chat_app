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
} from "react-native";

import LinkPortfolioButton from "../components/LinkPortfolioButton";
import { Feather } from "@expo/vector-icons";

const LinkPortfolio = (props) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.col}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Feather name="chevron-left" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
        <View style={styles.feed}>
          <Image
            source={require("../../assets/icon.png")}
            // source={{ uri: itemPic }}
            style={styles.avatar}
          />
          <Text style={styles.header}> Link your broker</Text>
          <Text style={styles.text}>
            Account and trade values will be private
          </Text>
          {/* <Text style={styles.link}>Why link an account?</Text> */}
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 200,
        }}
      >
        <LinkPortfolioButton></LinkPortfolioButton>
      </View>
    </ScrollView>
  );
};
export default LinkPortfolio;

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
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    position: "absolute",
    bottom: 10,
    right: 110,
    top: 300,
    height: 50,
    backgroundColor: "#147efb",
    borderRadius: 100,
    flexDirection: "row",
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
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 24,
    paddingBottom: 10,
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
  },
  text: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
  },
  link: {
    //fontFamily: "Montserrat_400Regular",
    color: "#147efb",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#000",
    // marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
  },
  col: {
    flexDirection: "row",
    //marginTop: 25,
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
});
