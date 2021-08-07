import React, { Component } from "react";
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

import { Feather } from "@expo/vector-icons";

const randomTime = () => {
  const hrs = Math.round(Math.random() * 12);
  const mins = Math.round(Math.random() * 60);
  const hFormat = hrs < 10 ? "0" : "";
  const mFormat = mins < 10 ? "0" : "";
  const amPm = hrs < 12 ? "AM" : "PM";
  return String(hFormat + hrs + ":" + mFormat + mins + " " + amPm);
};

const StockGroupCard = ({
  ticker,
  pctchange,
  name,
  uri,
  count,
  onPress,
  image,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.username}>{ticker}</Text>
      <Text style={styles.change}>{pctchange}</Text>
    </TouchableOpacity>
  );
};

export default StockGroupCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  gradientStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  count: {
    color: "#F5F8FA",
    fontFamily: "Montserrat_700Bold",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    color: "#FFF",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
  },
  duration: {
    color: "#FFF",
    fontSize: 12,
    //flex: 1,

    //position: "absolute",
    fontFamily: "Montserrat_600SemiBold",
  },
  username: {
    color: "#FFF",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  change: {
    color: "#33CC00",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  preview: {
    color: "#FFF",
    //fontFamily: "Montserrat_300SemiBold",
    fontSize: 15,
    paddingLeft: 10,
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 2,
    shadowColor: "lightgrey",
    marginHorizontal: 10,
    shadowOpacity: 0.5,
    marginVertical: 5,
    //elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#000"
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    //paddingHorizontal: 40,
    alignItems: "center",
    //marginTop: 15,
    //marginBottom: 20,
    justifyContent: "space-between",
    height: 80,
  },
});
