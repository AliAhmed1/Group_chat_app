import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DetailItem = (props) => {
  return (
    <View style={styles.itemCon}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{ textAlign: "right" }}>
        <Text style={styles.stocktext}>{props.value}</Text>
      </View>
    </View>
  );
};

//https://www.trucharts.com/Chart.aspx?Provider=DB&Code=FB&Type=3&Scale=0&IND=AreaRSI(14){U};VOLMA(60);MACD(12,26,9);ATR(10)&OVER=MA(13);MA(50);TCFast()&Skin=#33CC00Red&Size=520&RT=1&Start=20190224&End=20190824&Layout=2Line;Default;Price;HisDate&Cycle=DAY1&x=100&y=100

const styles = StyleSheet.create({
  itemCon: {
    flexDirection: "row",
    alignItems: "center",
    //margin: 6,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    color: "#FFF",
    marginHorizontal: 10,
  },
  stocktext: {
    fontWeight: "800",
    fontSize: 16,
    color: "#FFF",
    marginHorizontal: 10,
  },
});

export default DetailItem;
