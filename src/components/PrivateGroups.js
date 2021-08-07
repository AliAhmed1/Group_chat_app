import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Linking,
} from "react-native";
import * as Permissions from "expo-permissions";
import { Icon, Header, Left, Right, Body, Button } from "native-base";
import Messages from "../components/Messages";
import TrendingStocks from "../components/TrendingStocks";
import { Feather } from "@expo/vector-icons";
import fire, { firestore } from "../database/firebase";
import StockGroupCard from "../components/StockGroupCard";
import ChartComp from "../components/ChartComp";
import ChatTabs from "../components/Tabs/ChatTabs";

const Private = (props) => {
  const isVisible = useIsFocused();
  const [groups, setGroups] = useState([]);
  const [publicgroups, setpublicgroups] = useState([]);
  const [Chatheads, setChatheads] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // askPermission();
    props.navigation.setOptions({
      gesturesEnabled: false,
    });

    if (isVisible) {
      getChats();
    }
  }, [isVisible]);

  const refreshChats = () => {
    setRefreshing(true);
    getChats();
  };

  async function askPermission() {
    try {
      const { existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Enable Notifications",
          "Open your notification settings and turn on notifications for ChartBot",
          [
            { text: "cancel", onPress: () => console.log("cancel") },
            { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
          ],
          { cancelable: false }
        );
        return;
      }
    } catch (e) {
      alert(e.message);
      console.log(e);
    }
  }

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
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          tintColor="#fff"
          titleColor="#fff"
          colors={["#fff"]}
          refreshing={refreshing}
          onRefresh={refreshChats}
        />
      }
    >
      {/* <TrendingStocks {...props} /> */}

      <StockGroupCard
        ticker="$COMINGSOON"
        //pctchange="+3.521%"
        // onPress={() => {
        //   props.navigation.navigate("StockChat", {
        //     itemName: "$NET",
        //     // itemId: item.id,
        //     // itemName: item.login,
        //     itemPic: "https://i.stack.imgur.com/l60Hf.png"
        //   });
        // }}
        msg="Private groups coming soon"
      />

      {/* <View style={styles.card}> */}
      {/* <FlatList
        data={publicgroups}
        keyExtractor={(item, index) => "key" + index}
        renderItem={({ item }) => {
          const name = item.groupName;
          const totalmembers =
            item && item.totalmembers ? item.totalmembers : 0;
          const lastmessage = item && item.lastmessage ? item.lastmessage : "";
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Discussion", {
                  item,
                  itemPic: "https://i.stack.imgur.com/l60Hf.png",
                });
              }}
            >
              <Messages
                item={name}
                totalmembers={totalmembers}
                lastmessage={lastmessage}
              ></Messages>
            </TouchableOpacity>
          );
        }}
      /> */}
      {/* </View> */}

      {/* <FlatList
            data={groups}
            keyExtractor={(item, index) => "key" + index}
            renderItem={({ item }) => {
              // console.log("FLAAAAAAAAAATIST ==>", item);
              const name = item.GroupName;
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("GroupChat", {
                      groupName: name,
                      itemPic: "https://i.stack.imgur.com/l60Hf.png"
                    });
                  }}
                >
                  <Messages item={name}></Messages>
                </TouchableOpacity>
              );
            }}
          /> */}
      {/* </View> */}
    </ScrollView>
  );
};
export default Private;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
  },
  // card: {
  //   marginLeft: 400,
  //   width: 400,
  //   flexDirection: "row",
  // },
  btn: {
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#FFF",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 20,
    marginHorizontal: 10,
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
  container: {
    //height: "100%",
    backgroundColor: "#000",
    // left: 0,
    // right: 0,
    // top: 0,
    //paddingBottom: 30
    //paddingHorizontal: 20,
    //paddingTop: 10
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    //paddingTop: 0,
    paddingHorizontal: 20,
  },
  header: {
    fontFamily: "Montserrat_700Bold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
  },
  logotext: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    fontSize: 22,
    paddingLeft: 10,
    width: 300,
  },
  greeting: {
    //fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 30,
    width: "70%",
    padding: 20,
    //paddingVertical: 10
  },
  balance: {
    //fontFamily: "Montserrat_400Regular",
    color: "#FFF",
    flex: 1,
    fontSize: 30,
    fontWeight: "700",
    width: "70%",
    paddingHorizontal: 20,
    //paddingVertical: 10
  },
  change: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "lightgrey",
    flex: 1,
    fontSize: 20,
    //fontWeight: "700",
    width: "70%",
    paddingHorizontal: 20,
    //paddingVertical: 10
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
  invite: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  col: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
  },
  stockchats: {
    //flexDirection: "row"
    marginVertical: 10,
    marginHorizontal: 20,
    //alignItems: "center"
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    //paddingBottom: 15,
    paddingVertical: 10,
    paddingLeft: 15,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: "#000",
    flex: 1,
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 5,
    shadowColor: "#000",
    //marginHorizontal: 10,
    //shadowOpacity: 0.5,
    //marginVertical: 5,
    //elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#35383F"
    //backgroundColor: "#35383F",
    //backgroundColor: "#000"
    backgroundColor: "#000",
    //borderRadius: 20,
    // paddingHorizontal: 20,
    //paddingVertical: 20,
  },
});
