import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Clipboard,
  Text,
  TouchableOpacity,
  View,
  Image,
  Share,
  Linking,
} from "react-native";
import firebase, { firestore } from "./../database/firebase";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/AntDesign";
import TrendingStocks from "../components/TrendingStocks";
import * as _firebase from "firebase";

import {
  GiftedChat,
  Send,
  Bubble,
  InputToolbar,
  Time,
  SystemMessage,
} from "react-native-gifted-chat";
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

function Discussion({ route, navigation }) {
  const { item, itemPic } = route.params;

  const [message, setMessage] = useState("");
  const [data, setData] = useState(item);
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState(
    firebase.auth().currentUser.displayName
  );
  const [userid, setUserid] = useState(firebase.auth().currentUser.uid);
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState(firebase.auth().currentUser.email);

  const getData = async () => {
    console.log("Hii i ii ii ");

    firestore
      .collection("publicgroups")
      .doc("YlzfERExKSZr71rUbIIK")
      .get()
      .then((s) => {
        console.log("s", s.data());
        setData(s.data());
      });

    // const user = await firestore
    //   .collection("users")
    //   .doc("0C1WxzhOf6XhJ5syDe9PvtZGNtU2")
    //   .get();

    // console.log("item", userDocument);
    // firestore
    //   .collection("publicgroups")
    //   .doc("YlzfERExKSZr71rUbIIK")
    //   .onSnapshot(function (snapshot) {
    //     const messages = querySnapshot.docs.map((doc) => {
    //       console.log("doc", doc);
    //     });
    //   });
  };

  useEffect(() => {
    // getData();
    getUserJoinedAlreadyOrNot();
    getMessages();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${item.shareLink}`,
        // message: `Share this link to invite your friends ${item.shareLink}`,
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

  const getMessages = () => {
    const unsubscribeListener = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          let firebaseData = doc.data();
          firebaseData.createdAt = firebaseData.createdAt
            .toDate()
            .toUTCString();
          console.log("userid is", userid);
          console.log("mainid is", firebaseData["user"]["_id"]);
          firebaseData["user"]["userid"] = firebaseData["user"]["_id"];

          firebaseData["user"]["_id"] =
            firebaseData["user"]["_id"] == userid ? 1 : 2;
          firebaseData["user"]["_id"] = 2;

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          return data;
        });
        setMessages(messages);
      });
    return () => unsubscribeListener();
  };

  function getUserJoinedAlreadyOrNot() {
    firestore
      .collection("members")
      .doc(item.groupID)
      .collection("member")
      .where("userID", "==", userid)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(function (doc) {
            if (doc.data() != null) {
              setIsJoined(true);
            } else {
              setIsJoined(false);
              showAlertToJoinGroup();
            }
          });
        } else {
          showAlertToJoinGroup();
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  function showAlertToJoinGroup() {
    Alert.alert(
      Strings.JoinChat,
      Strings.JoinChatConfirmMessage,
      [
        {
          text: "Yes",
          onPress: () => {
            joinGroup();
          },
        },
        {
          text: "No",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  }

  function joinGroup() {
    const groupMemberRef = firestore
      .collection("members")
      .doc(item.groupID)
      .collection("member")
      .doc();
    groupMemberRef
      .set({
        userID: userID,
      })
      .then(function (docRef) {
        setIsJoined(true);
        Alert.alert(Strings.joinMessage);
        setMessage("");
      })
      .catch(function (error) {
        setIsJoined(false);
        Alert.alert(Strings.JoinGroupError);
      });
  }

  const onPressCashtag = (cashtag) => {
    let symbol = cashtag.replace("$", "");
    if (isNaN(symbol)) {
      navigation.navigate("StockDetails", {
        symbol: symbol,
        screen: "StockDetails",
      });
    }
  };

  const lastMessage = async (message) => {
    await firestore.collection("publicgroups").doc(item.groupID).update({
      lastmessage: message,
    });
  };

  function updateUnseenMessages(groupId) {
    const db = firestore;
    var UserId = fire.auth().currentUser.uid;
    console.log("=", UserId);

    var ref = db.collection("UnSeenMessages").doc(`${groupId}`);
    ref.set({
      time: new Date().getTime(),
    });

    var ref = db.collection("publicgroups").doc(`${groupId}`);
    ref.update({
      time: new Date().getTime(),
    });
  }

  function onSend(newMessage = []) {
    console.log("------------------newMessage", item.groupID);
    const messageRef = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .doc();
    for (let i = 0; i < newMessage.length; i++) {
      newMessage[i]["user"]["_id"] = 2;
      messageRef
        .set({
          _id: newMessage[i]._id,
          messageID: messageRef.id,
          createdAt: newMessage[i].createdAt,
          senderEmail: userEmail,
          text: newMessage[i].text,
          user: {
            _id: userid,
            name: username,
          },
        })
        .then(function (docRef) {
          updateUnseenMessages(item.groupID);
          setMessages(GiftedChat.append(messages, newMessage));
          let message = newMessage[i].text;
          lastMessage(message);
          let symbol = /\$(\w+)/.exec(message);

          if (
            symbol !== null &&
            symbol !== "null" &&
            symbol.length > 0 &&
            isNaN(symbol[1])
          ) {
            navigation.push("StockDetails", {
              symbol: symbol[1].trim().toUpperCase(),
            });
          }
        })
        .catch(function (error) {
          Alert.alert(error.message);
          console.log("Error:", error);
        });
    }
    setMessages(GiftedChat.append(messages, newMessage));
  }

  function likeMessage(selectedMessage = {}) {
    const messageRef = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .doc(selectedMessage.messageID);
    messageRef
      .update({
        likes: _firebase.firestore.FieldValue.increment(1),
      })
      .then(function () {
        messageRef.set(
          {
            likedBy: {
              [firebase.auth().currentUser.uid]: true,
              // [`23`]: true,
            },
          },
          { merge: true }
        );
      })
      .catch(function (error) {
        Alert.alert(error.message);
        console.log("Error:", error);
      });
  }

  function unLikeMessage(selectedMessage = {}) {
    const messageRef = firestore
      .collection("message")
      .doc(item.groupID)
      .collection("messages")
      .doc(selectedMessage.messageID);
    messageRef
      .update({
        likes: _firebase.firestore.FieldValue.increment(-1),
      })
      .then(function () {
        messageRef.set(
          {
            likedBy: {
              [firebase.auth().currentUser.uid]: false,
              // [`23`]: true,
            },
          },
          { merge: true }
        );
      })
      .catch(function (error) {
        Alert.alert(error.message);
        console.log("Error:", error);
      });
  }

  const renderBubble = (props) => {
    let checkLikedBy =
      props.currentMessage.likedBy &&
      props.currentMessage.likedBy[firebase.auth().currentUser.uid];

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.push("Profile", {
              uid: props.currentMessage.user.userid,
            })
          }
        >
          <Text style={styles.username}>{props.currentMessage.user.name}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", flex: 1, paddingRight: 20 }}>
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: "transparent",
                //backgroundColor: "#303135",
                //backgroundColor: "#303135",
                marginRight: 10,
                alignSelf: "stretch",
                //flex: 1
              },
              right: {
                //backgroundColor: "transparent"
                alignSelf: "stretch",
                marginRight: 10,
                //backgroundColor: "#303135"
              },
            }}
            textStyle={{
              left: {
                color: "#FFF",
              },
              right: {
                color: "#FFF",
              },
            }}
          />

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              !checkLikedBy
                ? likeMessage(props.currentMessage)
                : unLikeMessage(props.currentMessage)
            }
          >
            <FontAwesome5
              name="heart"
              color={!checkLikedBy ? "grey" : "pink"}
              size={20}
              fontWeight={900}
            />
            <Text
              style={{
                color: "grey",
                textAlign: "center",
                paddingLeft: 5,
                fontSize: 18,
              }}
            >
              {props.currentMessage.likes ? props.currentMessage.likes : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View
          //source={SendIcon}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#147efb",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            //marginBottom: -25
            //marginRight: 15
          }}
        >
          {/* <Feather name="arrow-up" color="#F5F8FA" size={28} fontWeight={900} /> */}
          <FontAwesome5
            name="arrow-up"
            color="#FFF"
            size={20}
            fontWeight={900}
          />
        </View>
      </Send>
    );
  };

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#000",
          borderTopWidth: null,
          marginBottom: -10,
        }}
      />
    );
  };

  /** render the time labels in the bubble */
  const renderTime = () => {
    return (
      <Time
        textStyle={{
          right: {
            //color: Colors.snow,
            fontFamily: "Montserrat-Light",
            fontSize: 14,
          },
          left: {
            ///color: Colors.snow,
            fontFamily: "Montserrat-Light",
            fontSize: 14,
          },
        }}
      />
    );
  };

  const report = async (message) => {
    try {
      const result = Linking.openURL(
        "mailto:stockchatapp@gmail.com?subject=Report This Message&body=Hey, I'd like to report this message --> " +
          message
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const onLongPress = (context, currentMessage) => {
    if (currentMessage.text) {
      const options = ["Report", "Copy Text", "Cancel"];
      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            case 0:
              report(currentMessage.text);
              break;
            case 1:
              Clipboard.setString(currentMessage.text);
              break;
          }
        }
      );
    }
  };

  const CustomView = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 40,
          backgroundColor: "#FFF",
        }}
      >
        <TouchableOpacity>
          <Feather name="dollar-sign" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="at-sign" size={22} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="md-images" size={26} color="#3e7af0" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="gif" size={35} color="#3e7af0" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" color="#FFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.header}> {item.groupName}</Text>
        {/* <TouchableOpacity
          style={{ paddingRight: 20 }}
          onPress={() => {
            //share link here
            onShare();
          }}
        >
          <Icon name="link" color="#FFF" size={24} />
        </TouchableOpacity> */}
        <TouchableOpacity
        // onPress={() =>
        //   navigation.push("StockDetails", {
        //     symbol: "SQ"
        //   })
        // }
        // onPress={() => navigation.navigate("GroupProfile")}
        >
          <Image
            source={require("../../assets/icon.png")}
            // source={{ uri: itemPic }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* <View>
        <TrendingStocks></TrendingStocks>
      </View> */}

      <GiftedChat
        isAnimated={true}
        renderAccessory={CustomView}
        renderSystemMessage={renderSystemMessage}
        //onPressActionButton={() => _navigateToStockDetails}
        //showUserAvatar={true}
        //showAvatarForEveryMessage={true}
        textInputProps={{
          style: {
            backgroundColor: "#303135",

            borderRadius: 30,
            fontSize: 20,
            color: "#FFF",
            paddingLeft: 20,
            paddingRight: 20,
            width: "100%",
            marginHorizontal: 30,
            flex: 1,
            height: "auto",
            paddingTop: 10,
            paddingBottom: 10,
          },
        }}
        scrollToBottom
        inverted={true}
        onLongPress={onLongPress}
        timeTextStyle={{ left: { color: "#FFF" }, right: { color: "#FFF" } }}
        //renderTime={renderTime}
        renderAvatar={null}
        messages={messages}
        renderSend={renderSend}
        renderBubble={renderBubble}
        //textInputStyle={styles.textInput}
        //isTyping={true}
        //renderUsernameOnMessage={true}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        multiline
        placeholder={"Enter a message..."}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
          name: username,
        }}
        parsePatterns={(linkStyle) => [
          {
            type: "phone",
            style: linkStyle,
            // onPress: this.onPressPhoneNumber
          },
          // {
          //   type: "url",
          //   style: {
          //     color: "#FFF",
          //     fontWeight: "bold",
          //     //textDecorationLine: "underline"
          //     onPress: this.props.openURL
          //   }
          // },
          {
            pattern: /#(\w+)/,
            style: {
              ...linkStyle,
              color: "#FFF",
              fontWeight: "bold",
              //textDecorationLine: "underline"
            },
            // onPress: this.onPressHashtag
          },
          {
            pattern: /\$(\w+)/,

            style: {
              ...linkStyle,
              color: "#33CC00",
              fontWeight: "bold",
              //textDecorationLine: "underline"
            },
            onPress: onPressCashtag,
          },
          {
            pattern: /\@(\w+)/,
            style: {
              ...linkStyle,
              color: "#147efb",
              fontWeight: "bold",
              //textDecorationLine: "underline"
            },
            // onPress: this.onPressHashtag
          },
        ]}
      />
    </View>
  );
}
export default Discussion;

const styles = StyleSheet.create({
  input: {
    //width: 80
  },
  ImageStyle: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  flatList: {
    //position: "absolute",
    left: null,
    right: null,
    top: null,
    height: "100%",
  },
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15,
    color: "#FFF",
  },

  main: {
    backgroundColor: "#000",
    height: "100%",
    paddingHorizontal: 0,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    //backgroundColor: "#303135"
  },
  username: {
    color: "#147efb",
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    flex: 1,
    paddingVertical: 5,
    position: "relative",
    paddingLeft: 10,
  },

  // textInput: {
  //   backgroundColor: "#000",
  //   borderRadius: 30,
  //   marginRight: 20,
  //   marginLeft: 20,
  //   fontSize: 20,
  //   color: "#FFF",
  //   paddingLeft: 20
  // },

  linkStyle: {
    color: "#FFF",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    //position: "absolute",
    // left: null,
    // right: null,
    // top: null,
    // height: "100%"
  },
  header: {
    color: "#FFF",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    marginLeft: 20,
    textAlign: "center",
  },
  systemMessageText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "bold",
  },
});
