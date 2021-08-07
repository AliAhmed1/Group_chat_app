import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LinkPortfolioButton from "../LinkPortfolioButton";

const PortfolioAuth = ({ image, message }) => {
  return (
    <View style={styles.feed}>
      {/* <Text style={styles.header}>Portfolio</Text> */}
      <Text style={styles.text}>Your portfolio is not connected.</Text>

      <View style={{ paddingVertical: 20, marginHorizontal: 10 }}>
        <View style={styles.feed}>
          {/* <Image
      source={require("../../assets/icon.png")}
      // source={{ uri: itemPic }}
      style={styles.avatar}
    /> */}
          <Text style={styles.header2}> Link your broker</Text>
          <Text style={styles.text}>
            Account values will always be private.
          </Text>
          {/* <Text style={styles.link}>Why link an account?</Text> */}
        </View>
        <View
          style={{
            //justifyContent: "center",
            alignItems: "center",
            paddingTop: 50
          }}
        >
          <LinkPortfolioButton></LinkPortfolioButton>
        </View>
      </View>
    </View>
  );
};

export default PortfolioAuth;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold"
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
