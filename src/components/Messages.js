import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SnapshotViewIOS,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const randomTime = () => {
  const hrs = Math.round(Math.random() * 12);
  const mins = Math.round(Math.random() * 60);
  const hFormat = hrs < 10 ? "0" : "";
  const mFormat = mins < 10 ? "0" : "";
  const amPm = hrs < 12 ? "AM" : "PM";
  return String(hFormat + hrs + ":" + mFormat + mins + " " + amPm);
};

const Messages = ({ item, totalmembers, lastmessage, uri, unSeen }) => {
  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingHorizontal: 20,
          //flexWrap: "wrap",
          //flex: 1,
        }}
      >
        {/* <Image
          source={{ uri: uri }}
          style={{
            //flex: 1,
            height: 40,
            width: 40,
            borderRadius: 20,
            //borderWidth: 2,
            marginBottom: 0,
            //marginRight: 5,
            borderColor: "#147efb",
            //alignSelf: "center",
            //marginTop: 15
          }}
          source={{
            uri: "https://i.stack.imgur.com/l60Hf.png",
          }}
        /> */}

        <View>
          {!unSeen ? (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#147efb",
                marginHorizontal: 10,
              }}
            />
          ) : null}
        </View>

        <Image
          source={require("../../assets/icon.png")}
          // source={{ uri: itemPic }}
          style={{
            //flex: 1,
            height: 40,
            width: 40,
            borderRadius: 20,
            //borderWidth: 2,
            marginBottom: 0,
            //marginRight: 5,
            borderColor: "#147efb",
            //alignSelf: "center",
            //marginTop: 15
          }}
        />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.username}>#{item}</Text>
          </View>
          {/* <Text style={styles.preview}>{totalmembers} members </Text> */}
          <Text style={styles.preview}>
            {lastmessage > 10 ? `${lastmessage.slice(0, 40)}...` : lastmessage}
          </Text>
          {/* <Text style={styles.text}>{item.groupMembers}</Text> */}
        </View>
      </View>
    </View>
  );
};
export default Messages;

const styles = StyleSheet.create({
  container: {
    //paddingHorizontal: 10
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
    fontSize: 15,
    paddingLeft: 10,
  },
  preview: {
    //color: "#657786",
    color: "#7c818c",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    paddingTop: 5,
    //display: "flex",
    //paddingLeft: 10,
    paddingLeft: 10,
    //marginRight: 20,
    //flexShrink: 1,
    flexWrap: "wrap",
    //width: 0,
    //flexGrow: 1,
    //flex: 1,
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 2,
    borderBottomColor: "#60646C",
    borderBottomWidth: 0.5,

    //shadowColor: "#B9BABD",
    //marginHorizontal: 10,
    alignContent: "flex-start",
    shadowOpacity: 0.2,
    //marginVertical: 5,
    elevation: 1,

    //paddingRight: 20,
    paddingVertical: 5,
    flexDirection: "row",
    //marginLeft: 10,
    //paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
  },
});
