import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInputComponent,
  TouchableHighlight,
  Alert,
  Share,
} from "react-native";
import fire, { firestore } from "../../database/firebase";
import {
  Ionicons,
  Entypo,
  EvilIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

export default function AddMember({ route, navigation }) {
  const [isloading, setloading] = useState(true);
  const [ParticipentsIDS, setParticipentsID] = useState([]);
  const [AllUsers, SetUsers] = useState([]);

  // const [ShowSelected, ShowSelectedUser] = useState(false)
  // const [selectedReceipents, SetselectedReceipents] = useState([])
  // const [selectedReceipentsids, SetselectedReceipentsids] = useState([])

  const { groupName } = route.params;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey - I have an invite to StockChat and want you to join. Here is the link! https://stockchatapp.me",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    isloading && fetchedUsers();
  });

  function fetchedUsers() {
    var UserId = fire.auth().currentUser.uid;

    firestore
      .collection("users")
      .doc(UserId)
      .collection("Groups")
      .doc(groupName)
      .collection("Participents")
      .doc("IDsofParticipants")
      .get()
      .then(function (snapshot) {
        setParticipentsID(snapshot.data().PartcipentsList);
        console.log("PARTICIPENTS FROM GROUP CHAT", ParticipentsIDS);
      })
      .then(() => {
        var items = [];
        console.log("ITEMS ********", items);
        for (var i = 0; i < ParticipentsIDS.length; i++) {
          firestore
            .collection("users")
            .doc(ParticipentsIDS[i])
            .get()
            .then((snapshot) => {
              console.log("SNAPSHOOOOOOOOT", snapshot.data());
              items.push({
                id: snapshot.data().id,
                Name: snapshot.data().Name,
                email: snapshot.data().email,
              });
            })
            .then(() => {
              SetUsers(items);
              setloading(false);
            });
        }
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View
        style={{
          flexDirection: "row",
          height: 80,
          width: "100%",
          //backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "space-around",
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
            color: "#FFF",
          }}
        >
          {groupName}
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

      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddMoreMember", {
              groupName: groupName,
              ParticipentsIDS: ParticipentsIDS,
            })
          }
        >
          <View style={{ flexDirection: "column", paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 60,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#147efb",
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#F5F8FA",
                }}
              >
                <Feather name="user-plus" size={20} color="#F5F8FA" />
              </View>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
                Add Members
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} title="Share">
          <View style={{ flexDirection: "column", paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 60,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "#147efb",
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "#F5F8FA",
                }}
              >
                <Feather name="link" size={20} color="#F5F8FA" />
              </View>
              <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
                Share Invite Link
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.viewseparator} />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: 20,
            marginBottom: 20
          }}
        >
          Owners
        </Text>

        <View style={styles.listseparator} /> */}

        {/* <View style={{ flexDirection: "column", paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              height: 60,
              marginBottom: 10,
              marginTop: 10
            }}
          >
            <View
              style={{
                borderRadius: 100,
                backgroundColor: "grey",
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: "#F5F8FA"
              }}
            >
              <Feather name="user" size={20} color="#F5F8FA" />
            </View>
            <Text>&nbsp;&nbsp;&nbsp;&nbsp;</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>@StockChat</Text>
          </View> 
        </View>*/}

        <View style={styles.viewseparator} />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            paddingLeft: 20,
            marginBottom: 20,
            color: "#FFF",
          }}
        >
          Members
        </Text>
        <View style={styles.listseparator} />

        <FlatList
          data={AllUsers}
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item }) => {
            console.log("FLAAAAAAAAAATIST ==>", item);
            return (
              <TouchableOpacity>
                <View
                  style={{ flexDirection: "column", paddingHorizontal: 20 }}
                >
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
                      @{item.Name}
                    </Text>
                  </View>
                </View>
                <View style={styles.listseparator} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  viewseparator: {
    borderColor: "#F5F8FA",
    borderWidth: 0.5,
    marginBottom: 20,
  },
  listseparator: {
    borderColor: "#F5F8FA",
    borderWidth: 0.5,
    //marginVertical: 30
  },
});
