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
import StockGroupCard from "../components/StockGroupCard";
import Messages from "../components/Messages";
import { useIsFocused } from "@react-navigation/native";

import firebase, { firestore } from "../database/firebase";
import { Icon, Header, Left, Right, Body, Button } from "native-base";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const DirectMessages = (props) => {
  const isVisible = useIsFocused();
  const [groups, setGroups] = useState([]);
  const [publicgroups, setpublicgroups] = useState([]);

  const [Chatheads, setChatheads] = useState([]);

  useEffect(() => {
    // props.navigation.push("StockDetails", {symbol:"TSLA"})
    if (isVisible) {
      getChats();
    }
  }, [isVisible]);

  function getChats() {
    const db = firestore;
    var groupArray = [];
    var pubgroupArray = [];

    var ChatHeadsArr = [];
    var UserId = fire.auth().currentUser.uid;

    db.collection("publicgroups").onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        if (change.type == "added") {
          console.log("New Group: ", change.doc.data());
          pubgroupArray.push(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified Group: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed Group", change.doc.data());
        }
        setpublicgroups(pubgroupArray);
      });
    });

    db.collection("users")
      .doc(UserId)
      .collection("Groups")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          groupArray.push(change.doc.data());
          setGroups(groupArray);
        });
      });

    db.collection("users")
      .doc(UserId)
      .collection("ChatHeads")
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (anotherSnapshot) {
          console.log("anotherSnapshot.doc.data()", anotherSnapshot.doc.data());

          // ChatHeadsArr.push(anotherSnapshot.doc.data())
          for (var i = 0; i < anotherSnapshot.doc.data.length; i++) {
            ChatHeadsArr.push({
              name: anotherSnapshot.doc.data().name,
              uid: anotherSnapshot.doc.data().uid,
            });
          }
          setChatheads(ChatHeadsArr);
        });
      });
  }
  return (
    <View style={styles.container}>
      <Header
        style={{
          backgroundColor: "#000",
          borderBottomWidth: 0.2,
          borderBottomColor: "#F5F8FA",
        }}
      >
        <Left>
          <Feather
            style={{
              color: "#FFF",
              paddingHorizontal: Platform.OS === "ios" ? 20 : 15,
              fontSize: 30,
              fontWeight: "bold",
            }}
            name="chevron-left"
            onPress={() => props.navigation.goBack()}
          />
        </Left>

        <Body>
          <Text style={styles.header}>Messages</Text>
        </Body>

        <Right>
          <Feather
            style={{
              color: "#FFF",
              fontWeight: "bold",
              paddingHorizontal: Platform.OS === "ios" ? 10 : 10,
              fontSize: 30,
            }}
            name="plus"
            onPress={() => props.navigation.navigate("CreateChat")}
          />
        </Right>
      </Header>

      {/* <View style={styles.feed}>
        <Text style={styles.text}>No new messages</Text>
      </View> */}

      <ScrollView style={{ paddingVertical: 20, marginHorizontal: 10 }}>
        <FlatList
          data={Chatheads}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            console.log("FLAAAAAAAAAATIST ==>", item);
            const name = item.name;
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ChatRoom", {
                    name: item.name,
                    uid: item.uid,
                    title: item.name,
                  });
                }}
              >
                <Messages item={name}></Messages>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};
export default DirectMessages;

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
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  container: {
    height: "100%",
    backgroundColor: "#000",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingHorizontal: 20,
    //paddingTop: 60
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    width: "105%",
    //flex: 1,
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
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
  ops: {
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    //height: "75%",
    // backgroundColor: "#000",
    // marginHorizontal: -20,
    paddingHorizontal: 20,
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
