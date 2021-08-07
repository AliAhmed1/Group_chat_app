import React, { useState, useEffect, useRef } from "react";

import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  FlatList,
} from "react-native";
import {
  Ionicons,
  Entypo,
  EvilIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import fire, { firestore } from "../database/firebase";

var itm = [];

export default function CreateMsg({ navigation }) {
  const [isloading, setloading] = useState(true);
  const [AllUsers, SetUsers] = useState([]);

  useEffect(() => {
    isloading && fetchedUsers();
  });

  function fetchedUsers() {
    var items = [];

    firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        snapshot.forEach((anotherSnapshot) => {
          if (anotherSnapshot.data().id === fire.auth().currentUser.uid) {
            console.log("Current user profile");
          } else {
            items.push({
              id: anotherSnapshot.data().id,
              Name: anotherSnapshot.data().Name,
              email: anotherSnapshot.data().email,
            });
          }
        });
      })
      .then(() => {
        SetUsers(items);
        setloading(false);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        padding: 18,
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          height: 80,
          //width: "100%",
          //backgroundColor: "#000",
          alignItems: "center",
          //justifyContent: "space-around",
          paddingTop: 30,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          // style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="left"
            size={30}
            color="#FFF"
            style={{ marginTop: 20 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginTop: 20,
            paddingLeft: 30,
            color: "#FFF",
          }}
        >
          {/* {groupName} */}
          Send a DM
        </Text>
        <Entypo
          name="info"
          size={24}
          color="#F5F8FA"
          style={{ marginTop: 20 }}
          //   onPress={() =>
          //     navigation.navigate("GroupInfo", { groupName: groupName })
          //   }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={AllUsers}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            console.log("FLAAAAAAAAAATIST ==>", item);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChatRoom", {
                    name: item.Name,
                    uid: item.id,
                    title: item.Name,
                  });
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      height: 60,
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      //source={{ uri: uri }}
                      style={{
                        //flex: 1,
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        //borderWidth: 2,
                        marginBottom: 0,
                        marginRight: 5,
                        borderColor: "#147efb",
                        //alignSelf: "center",
                        //marginTop: 15
                      }}
                      source={{
                        url: "https://i.stack.imgur.com/l60Hf.png",
                      }}
                    />
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#FFF",
                      }}
                    >
                      {item.Name}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </ScrollView>
    </View>
  );
}
