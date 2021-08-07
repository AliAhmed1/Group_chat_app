import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import fire, { firestore } from "../database/firebase";
import { useIsFocused } from "@react-navigation/native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as firebase from "firebase";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [userKey, setUserKey] = useState();
  const [password, setPass] = useState();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isVisible = useIsFocused();

  useEffect(() => {
    if (isVisible) {
      AuthUser();
      registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token)
      );
    }
  }, [isVisible]);

  function AuthUser() {
    fire.auth().onAuthStateChanged(function (user) {
      if (user) {
        navigation.navigate("Chat");
      } else {
      }
    });
  }

  // async function getNotificationToken() {
  //   await Notifications.getExpoPushTokenAsync()
  //     .then((token) => {
  //       setToken(token);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      console.log("finalStatus", finalStatus);
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log("token", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const update = (id) => {
    firebase.default.firestore().collection("users").doc(id).update({
      expoPushToken: expoPushToken,
    });
    console.log("Update Successfull");

    // .then((s) => {
    //   this.setState({ updating: false });

    //   this.props.navigation.goBack();
    //   this.props.route.params.fetchUsers();
    // })
    // .catch((e) => this.setState({ updating: false }));
  };

  const userLogin = () => {
    console.log("expoPushToken", expoPushToken);
    setLoading(true);
    if (
      email !== undefined &&
      email !== "" &&
      password !== undefined &&
      password !== ""
    ) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("res", res);
          setEmail("");
          setPass("");
          fetchUser(res.user.uid);
          setLoading(false);
          navigation.navigate("Chat");
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(error.message);
        });
    } else {
      setLoading(false);
      Alert.alert("Enter details to signin!");
    }
  };

  const fetchUser = async (id) => {
    const db = firebase.default.firestore();
    var users = db.collection("users");
    users
      .where("id", "==", id)
      .get()
      .then((s) => {
        s.docs.forEach((doc) => {
          setUserKey(doc.id);
          update(doc.id);
        });
      })
      .catch((e) => {
        console.log("e", e);
      });
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          height: "100%",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.tcontainer}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../../assets/blackicon.png")}
          />

          <Image
            source={require("../../assets/logotext.png")}
            style={{
              width: "80%",
              height: 50,

              paddingHorizontal: 20,
            }}
          />

          <Text style={styles.tHeading}>Sign In</Text>

          <View
            style={{
              padding: 15,
              width: "100%",
              alignItems: "center",
              marginTop: 15,
              paddingHorizontal: 40,
            }}
          >
            <TextInput
              style={styles.inputStyle}
              placeholder="Email"
              value={email}
              onChangeText={(val) => setEmail(val)}
              placeholderTextColor="#FFF"
            />
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              value={password}
              onChangeText={(val) => setPass(val)}
              maxLength={15}
              secureTextEntry={true}
              placeholderTextColor="#FFF"
            />
            <TouchableOpacity onPress={() => userLogin()}>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: "#FFF",
                    fontWeight: "600",
                  }}
                >
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={styles.loginText}
              onPress={() => navigation.navigate("ChoosingUsername")}
            >
              Don't have an account? Sign Up
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    //justifyContent: "center",
    backgroundColor: "#000",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    margin: 20,
    fontSize: 20,
    color: "#FFF",
  },
  loginText: {
    color: "#FFF",
    marginTop: 40,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  tcontainer: {
    //backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 100,
    //justifyContent: "center"
    alignItems: "center",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30
  },
  bcontainer: {
    flex: 1.5,
    borderTopLeftRadius: 90,
    width: "100%",
    padding: 30,
  },

  tHeading: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 20,
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  menuContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    padding: 30,
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 26,
  },
  activemenu: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
    width: "45%",
    backgroundColor: "#17C37B",
    borderRadius: 10,
  },
  activemenuText: {
    fontSize: 20,
    color: "#FFF000",
    marginTop: 5,
  },
  aText: {
    color: "#F5F8FA",
    fontSize: 20,
    marginTop: 5,
  },

  inputs: {
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    width: "90%",
    height: "10%",
    borderWidth: 1,
    borderColor: "grey",
  },
  header: { alignItems: "center", padding: 30 },
  btn: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: 300,
    marginTop: 30,
  },
  Stockchat: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    //fontFamily: "Montserrat_700Bold"
  },
});

// import Constants from "expo-constants";
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";
// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState("");

//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) =>
//       setExpoPushToken(token)
//     );
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       <Text>Your expo push token: {expoPushToken}</Text>

//       <Button
//         title="Press to schedule a notification"
//         onPress={() => alert(expoPushToken)}
//       />
//     </View>
//   );
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS
//     );
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     console.log("finalStatus", finalStatus);
//     if (finalStatus !== "granted") {
//       alert("Failed to get push token for push notification!");
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync();
//     console.log("token", token);
//   } else {
//     alert("Must use physical device for Push Notifications");
//   }

//   return token;
// }
