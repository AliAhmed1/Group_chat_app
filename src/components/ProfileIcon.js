import React, { Component, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Linking,
  ScrollView,
  ActivityIndicator,
  ActionSheetIOS,
  Modal,
} from "react-native";
import { Icon, Header, Left, Right, Body, Button } from "native-base";
import { WebView } from "react-native-webview";

import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import LinkPortfolioButton from "../components/LinkPortfolioButton";
import PortfolioAuth from "../components/Cards/PortfolioAuth";
import Stocks from "../components/Cards/Stocks";
import LinkInBio from "../components/LinkInBio";
import ChatTabs from "../components/Tabs/ChatTabs";

const { height } = Dimensions.get("screen");

class ProfileIcon extends Component {
  state = {
    images: [],
    currentUser: firebase.default.auth().currentUser.uid,
    userDetails: {},
    userKey: "",
    user: "",
    following: false,
    blockedusers: [],
    showModal: false,
  };
  static navigationOptions = {
    gesturesEnabled: false,
  };

  componentDidMount() {
    if (this.props.route.params && this.props.route.params.uid) {
      this.setState(
        {
          user: this.props.route.params.uid,
        },
        () => this.fetchUsers()
      );
    } else {
      this.setState(
        {
          user: firebase.default.auth().currentUser.uid,
        },
        () => this.fetchUsers()
      );
    }
  }

  actionSheet = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Block User"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: "dark",
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          this.block();
        } else if (buttonIndex === 2) {
          setResult("🔮");
        }
      }
    );

  fetchUsers = async () => {
    const db = firebase.default.firestore();
    var users = db.collection("users");
    users
      .where("id", "==", this.state.user)
      .get()
      .then((s) => {
        s.docs.forEach((doc) => {
          this.setState({
            userDetails: doc.data(),
            userKey: doc.id,
            following: doc.data().followers,
            blockedusers: doc.data().blockedusers,
          });
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  follow = async () => {
    const uid = this.state.user;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        followers: firebase.firestore.FieldValue.arrayUnion(uid),
      })

      .then((s) => this.fetchUsers())
      .catch((e) => console.log("e", e));
  };

  unFollow = async () => {
    const uid = this.state.user;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        followers: firebase.firestore.FieldValue.arrayRemove(uid),
      })

      .then((s) => {
        this.fetchUsers();
      })
      .catch((e) => console.log("e", e));
  };

  block = async () => {
    const uid = this.state.user;

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        blockedusers: firebase.firestore.FieldValue.arrayUnion(uid),
      })

      .then((s) => this.fetchUsers())
      .catch((e) => console.log("e", e));
  };

  unBlock = async () => {
    const uid = this.state.user;
    let udetails = this.state.userDetails;
    udetails.followers = [{ id: true }];

    firebase.default
      .firestore()
      .collection("users")
      .doc(this.state.userKey)
      .update({
        blockedusers: firebase.firestore.FieldValue.arrayRemove(uid),
      })

      .then((s) => {
        this.fetchUsers();
      })
      .catch((e) => console.log("e", e));
  };

  ActivityIndicatorLoadingView() {
    return (
      <View style={{ backgroundColor: "#000" }}>
        <ActivityIndicator
          color="#000"
          size="large"
          style={styles.ActivityIndicatorStyle}
        />
      </View>
    );
  }

  render() {
    const { userKey, userDetails, following, blockedusers, user } = this.state;
    let isFollowing = false;
    let isBlocked = false;

    if (following && following.includes(user)) {
      isFollowing = true;
    }

    if (blockedusers && blockedusers.includes(user)) {
      isBlocked = true;
    }

    return (
      <View style={styles.container}>
        <Image
          source={
            userDetails.image && userDetails.image !== ""
              ? { uri: userDetails.image }
              : require("../../assets/placeholderimage.png")
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#FFF",
          }}
        />
      </View>
    );
  }
}

export default ProfileIcon;

const styles = StyleSheet.create({
  container: {},
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  buttonContainer: {
    display: "flex",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#000",
  },
  webViewContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
  },
  close: {
    alignSelf: "flex-end",
    padding: 6,
    marginRight: 20,
    marginTop: 10,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  root: {
    //   backgroundColor: theme['color-basic-100'],
    marginTop: 10,
  },
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 17,
  },
  userInfo: {
    flexDirection: "row",
    paddingVertical: 18,
  },
  bordered: {
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
  section: {
    flex: 1,
    alignItems: "center",
  },
  space: {
    marginBottom: 3,
    // color: theme["color-basic-1000"],
  },
  separator: {
    backgroundColor: "transparent",
    alignSelf: "center",
    flexDirection: "row",
    flex: 0,
    width: 1,
    height: 42,
  },
  buttons: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  button: {
    flex: 1,
    alignSelf: "center",
  },

  add: {
    backgroundColor: "#939393",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  unfollow: {
    //borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    //width: "80%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 5,
    backgroundColor: "#7c818c",
  },
  follow: {
    //borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    //width: "80%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 5,
    backgroundColor: "#147efb",
  },
  editprofile: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3,
  },

  biolink: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3,
    marginVertical: 5,
  },

  blockview: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "#ff3636",
    borderRadius: 3,
  },
  change: {
    color: "#33CC00",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    paddingLeft: 10,
  },
  block: {
    //borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3,
  },

  feed: {
    paddingTop: 20,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  headertitle: {
    width: "82%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  pickimage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  name: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 10,
  },
  changeusername: {
    marginTop: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  // change: {
  //   marginTop: 10,
  //   height: 40,
  //   borderColor: "gray",
  //   borderWidth: 1
  // },
  save: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    borderColor: "silver",
    borderRadius: 3,
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  uname: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 20,
    //top: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: "#FFF",
  },

  bio: {
    textAlign: "left",
    //fontWeight: "600",
    fontSize: 18,
    paddingVertical: 20,
    paddingLeft: 10,
    color: "#FFF",
  },
  blockuser: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  unblockuser: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    fontWeight: "bold",
    color: "#ff3636",
  },
  common1: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  following: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  editprofiletext: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF",
  },
  followtext: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "#FFF",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    //position: "absolute",
    //bottom: 10,
    //right: 110,
    //top: 200,
    height: 50,
    backgroundColor: "#147efb",
    borderRadius: 100,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 30,
    alignSelf: "center",
  },
  header2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center",
  },

  text: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFF",
  },
  link: {
    //fontFamily: "Montserrat_400Regular",
    color: "#147efb",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
});
