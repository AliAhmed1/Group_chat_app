import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinkPortfolioButton from "../LinkPortfolioButton";
import StockGroupCard from "../StockGroupCard";

const Stocks = ({ image, message }) => {
  return (
    <View style={styles.feed}>
      <Text style={styles.uname}>Portfolio</Text>

      <View style={{ paddingVertical: 20 }}>
        <StockGroupCard ticker="$SQ" pctchange="+2.51%"></StockGroupCard>
        <StockGroupCard ticker="$PENN" pctchange="+8.93%"></StockGroupCard>
        <StockGroupCard ticker="$TSLA" pctchange="+4.54%"></StockGroupCard>
        <StockGroupCard ticker="$GME" pctchange="+6.05%"></StockGroupCard>

        <View
          style={{
            //justifyContent: "center",
            alignItems: "center",
            paddingTop: 50
          }}
        ></View>
      </View>
    </View>
  );
};

export default Stocks;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold"
  },
  uname: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 20,
    //top: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: "#FFF"
  },
  header: {
    alignItems: "center",
    paddingTop: 10,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10
  },
  container: {
    flexDirection: "row",
    marginTop: 20,
    width: 300
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  message: {
    fontSize: 13,
    marginHorizontal: 15,
    fontFamily: "Montserrat_700Bold"
  },
  feed: {
    paddingTop: 35
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center"
  },

  text: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF"
  },
  link: {
    //fontFamily: "Montserrat_400Regular",
    color: "#147efb",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10
  }
});
