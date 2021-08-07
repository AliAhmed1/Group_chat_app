import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import {
  AntDesign,
  Entypo,
  EvilIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";

import Icon from "@expo/vector-icons/AntDesign";

// import { Camera } from 'expo-camera';
import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
} from "react-native-gifted-chat";
import fire, { firestore } from "../../database/firebase";
import * as ImagePicker from "expo-image-picker";

const screen = Dimensions.get("window");
var itm = [];

export default function GroupChat({ route, navigation }) {
  console.log("hellooooooo in group chat000");
  const [messages, setMessages] = useState([]);
  const [ParticipentsIDS, setParticipentsID] = useState([]);
  const [image, setImage] = useState(null);
  const [isloading, setLoading] = useState(true);
  var UserId = fire.auth().currentUser.uid;
  const { groupName, itemPic } = route.params;

  useEffect(() => {
    isloading && Fetched();
  });

  function Fetched() {
    var data = [];
    firestore
      .collection("users")
      .doc(UserId)
      .collection("Groups")
      .doc(groupName)
      .collection("Participents")
      .doc("IDsofParticipants")
      .get()
      .then(function (snapshot) {
        for (var i = 0; i < snapshot.data().PartcipentsList.length; i++) {
          if (
            snapshot.data().PartcipentsList[i] === fire.auth().currentUser.uid
          ) {
            console.log("CURRENT USER IN PARTICIPENTS");
          } else {
            data.push(snapshot.data().PartcipentsList[i]);
          }
        }
      })
      .then(() => {
        setParticipentsID(data);
      });

    firestore
      .collection("users")
      .doc(UserId)
      .collection("Groups")
      .doc(groupName)
      .collection("Messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          let firebaseData = doc.data();
          firebaseData.createdAt = firebaseData.createdAt
            .toDate()
            .toUTCString();
          console.log("FIREBBBBBBASEDATTTTA", firebaseData);
          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().toUTCString(),
            ...firebaseData,
          };
          // console.log("DDDDDDDDDAAAAAAAAAAATTTTTTTTTTA", data)
          return data;
        });

        setMessages(messages);
        setLoading(false);
      });
  }

  renderSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View
          //source={SendIcon}
          style={{
            width: 60,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#147efb",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",

            //marginRight: 15
          }}
        >
          {/* <Feather name="arrow-up" color="#F5F8FA" size={28} fontWeight={900} /> */}
          <FontAwesome5
            name="arrow-up"
            color="#F5F8FA"
            size={20}
            fontWeight={900}
          />

          {/* <Text style={{ fontWEight: "700", color: "#F5F8FA" }}>Send</Text> */}
        </View>
      </Send>
    );
  };

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#147efb",
          },
          left: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  };

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#000",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          paddingTop: 10,
        }}
      />
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    // var _ = this;
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = fire.storage().ref("images").child(new Date().toDateString());
    ref
      .put(blob)

      .then((result) => {
        result.ref.getDownloadURL().then((url) => {
          console.log(url);
          var UserId = fire.auth().currentUser.uid;
          const message = [
            {
              _id: new Date().toUTCString(),
              image: url,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: fire.auth().currentUser.displayName,
                avatar: "https://placeimg.com/140/140/any",
              },
            },
          ];

          var ref = firestore.collection("users").doc();
          var newPostKey = ref.id;
          for (var i = 0; i < message.length; i++) {
            if (message[i].image) {
              console.log("true");

              firestore
                .collection("users")
                .doc(UserId)
                .collection("Groups")
                .doc(groupName)
                .collection("Messages")
                .doc(newPostKey)
                .set({
                  _id: message[i]._id,
                  createdAt: message[i].createdAt,
                  image: message[i].image,
                  user: {
                    _id: 2,
                    name: fire.auth().currentUser.displayName,
                  },
                });

              for (var x = 0; x < ParticipentsIDS.length; x++) {
                console.log(
                  "PARTICIPENTS FROM ONSEND FUNC",
                  ParticipentsIDS[x]
                );
                firestore
                  .collection("users")
                  .doc(ParticipentsIDS[x])
                  .collection("Groups")
                  .doc(groupName)
                  .collection("Messages")
                  .orderBy("createdAt")
                  .doc(newPostKey)
                  .set({
                    _id: message[i]._id,
                    createdAt: message[i].createdAt,
                    image: message[i].image,
                    user: {
                      _id: 2,
                      // avatar: fire.auth().currentUser.photoURL,
                      name: fire.auth().currentUser.displayName,
                    },
                  });
              }
            } else {
              console.log("false");
            }
          }

          setMessages(GiftedChat.append(messages, message));
        });
      });
  };

  function onSend(newMessage = []) {
    var UserId = fire.auth().currentUser.uid;

    var ref = firestore.collection("users").doc();
    var newPostKey = ref.id;
    for (var i = 0; i < newMessage.length; i++) {
      firestore
        .collection("users")
        .doc(UserId)
        .collection("Groups")
        .doc(groupName)
        .collection("Messages")
        .doc(newPostKey)
        .set({
          _id: newMessage[i]._id,
          createdAt: newMessage[i].createdAt,
          text: newMessage[i].text,
          user: {
            _id: 2,
            name: fire.auth().currentUser.displayName,
          },
        });

      for (var x = 0; x < ParticipentsIDS.length; x++) {
        console.log("PARTICIPENTS FROM ONSEND FUNC", ParticipentsIDS[x]);
        firestore
          .collection("users")
          .doc(ParticipentsIDS[x])
          .collection("Groups")
          .doc(groupName)
          .collection("Messages")
          .doc(newPostKey)
          .set({
            _id: newMessage[i]._id,
            createdAt: newMessage[i].createdAt,
            text: newMessage[i].text,
            user: {
              _id: 2,
              name: fire.auth().currentUser.displayName,
            },
          });
      }
    }
    setMessages(GiftedChat.append(messages, newMessage));
  }

  const CustomView = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <TouchableOpacity>
          <Feather name="dollar-sign" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="at-sign" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}>
          <Ionicons name="md-images" size={26} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="gif" size={35} color="#3e7af0" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.username}> {groupName}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("GroupInfo", { groupName: groupName })
            }
          >
            <Image
              onPress={() =>
                navigation.navigate("GroupInfo", { groupName: groupName })
              }
              source={{ uri: itemPic }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
        <GiftedChat
          isAnimated={true}
          renderAccessory={CustomView}
          renderAvatar={null}
          messages={messages}
          renderSend={renderSend}
          renderBubble={renderBubble}
          textInputStyle={styles.textInput}
          isTyping={true}
          renderUsernameOnMessage={true}
          renderInputToolbar={(props) => customtInputToolbar(props)}
          multiline
          placeholder={"Enter a message..."}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 2,
            name: fire.auth().currentUser.displayName,
          }}
          parsePatterns={(linkStyle) => [
            {
              type: "phone",
              style: linkStyle,
              // onPress: this.onPressPhoneNumber
            },
            {
              pattern: /#(\w+)/,
              style: {
                ...linkStyle,
                color: "#FFF",
                fontWeight: "bold",
                textDecorationLine: "underline",
              },
              // onPress: this.onPressHashtag
            },
            {
              pattern: /\$(\w+)/,
              style: {
                ...linkStyle,
                color: "#FFF",
                fontWeight: "bold",
                textDecorationLine: "underline",
              },
              // onPress: this.onPressHashtag
            },
            {
              pattern: /\@(\w+)/,
              style: {
                ...linkStyle,
                color: "#FFF",
                fontWeight: "bold",
                textDecorationLine: "underline",
              },
              // onPress: this.onPressHashtag
            },
          ]}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 20,
    lineHeight: 20,
    paddingLeft: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  ImageStyle: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  flatList: {
    left: 0,
    right: 0,
    top: 0,
    height: "80%",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 10,
  },

  main: {
    backgroundColor: "#000",
    height: "100%",
    //paddingHorizontal: 20,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  username: {
    color: "#FFF",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
