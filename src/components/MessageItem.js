import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import firebase, { firestore } from "./../database/firebase";

function getTime(date) {
  try {
    date = date.toDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return hours + ":" + minutes + " " + newformat;
  } catch (err) {
    console.log(err);
    return "";
  }
}

const MessageItem = ({ item, image, message }) => {
  const userID = firebase.auth().currentUser.uid;
  function messageView() {
    if (userID === item.senderId) {
      return (
        <View style={styles.SentContainer}>
          <View style={styles.sentBubble}>
            <Text style={styles.sentMessage}>{item.message}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",

              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.duration}>{item.username}</Text>
            <Text style={styles.duration}>
              {item.date_time !== undefined && item.date_time != null
                ? getTime(item.date_time)
                : ""}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.receivedContainer}>
          {/* <Image source={{ uri: image }} style={styles.img} /> */}
          <Image
            style={styles.img}
            source={{
              uri: "https://i.stack.imgur.com/l60Hf.png",
            }}
          />
          <View>
            <View style={styles.recievedBubble}>
              <Text style={styles.message}>{item.message}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.recievedDuration}>{item.username}</Text>
              <Text style={styles.recievedDuration}>
                {item.date_time !== undefined && item.date_time != null
                  ? getTime(item.date_time)
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
  return messageView();
};

export default MessageItem;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "right",
    alignSelf: "flex-end",
  },
  recievedDuration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "left",
  },
  receivedContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingRight: 20,

    //width: "auto"
  },
  SentContainer: {
    marginVertical: 15,
    alignSelf: "flex-end",
    borderRadius: 30,
    //width: "auto"
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 0,
    marginRight: 5,
    borderColor: "#147efb",
  },
  message: {
    fontSize: 15,
    marginHorizontal: 5,
    fontWeight: "500",
    //fontFamily: "Montserrat_700Bold"
  },
  sentMessage: {
    fontSize: 15,
    marginHorizontal: 5,
    //fontFamily: "Montserrat_700Bold",
    color: "#F5F8FA",
    fontWeight: "500",
  },
  sentBubble: {
    backgroundColor: "#147efb",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomRightRadius: 5,
    //width: "auto"
  },
  recievedBubble: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 5,
    width: "auto",
    marginRight: 25,
  },
});
