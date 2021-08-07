import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

export default function App({ ...props }) {
  const [phone, setPhone] = useState(0);

  const validateNumber = () => {
    if (
      phone === undefined ||
      phone === null ||
      phone.trim() === "" ||
      phone.trim().length !== 10
    ) {
      alert("Phone number should be 10 digits");
      return false;
    }
    if (isNaN(phone.trim())) {
      alert("Only numbers are allowed");
      return false;
    }
    props.navigation.push("Password", {
      username: props.route.params.username,
      email: props.route.params.email,
      phone: phone.trim(),
    });
  };

  return (
    <KeyboardAvoidingView
      //behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.getStarted}
    >
      <View>
        <TouchableOpacity
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign style={styles.back} name="left" size={30} color="#FFF" />
        </TouchableOpacity>
        <View style={{ display: "flex", alignSelf: "center", marginTop: 100 }}>
          <Image
            source={require("../../../assets/blackicon.png")}
            style={{ width: 150, height: 150 }}
          />
        </View>

        <View>
          <Text style={styles.Stockchat}> WHAT'S YOUR MOBILE NUMBER?</Text>
        </View>
        <View>
          <Text style={styles.username}>
            You'll use this number when you log in and if you ever need to reset
            your password.
          </Text>
        </View>

        <View style={{ paddingTop: 50, paddingHorizontal: 10 }}>
          <TextInput
            //einputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.Input}
            placeholder="Phone Number"
            placeholderTextColor="lightgrey"
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            onChangeText={(phone) => setPhone(phone)}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            top: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.Button}
            onPress={() => validateNumber()}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "#FFF",
                fontWeight: "600",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.push("Password", {
                email: props.route.params.email,
                username: props.route.params.username,
                phone: "",
              })
            }
          >
            <Text style={styles.username}>I'll do this later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  getStarted: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    width: Dimensions.get("screen").width,
  },
  Button: {
    backgroundColor: "#147efb",
    padding: 15,
    borderRadius: 30,
    width: "100%",
  },
  HaveAccount: {
    color: "#F5F8FA",
    textAlign: "center",
    fontSize: 15,
  },
  Stockchat: {
    marginTop: 50,
    color: "#FFF",
    fontSize: 18,
    //width: Dimensions.get("screen").width,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  username: {
    marginTop: 10,
    color: "#FFF",
    textAlign: "center",
    fontSize: 15,
    padding: 18,
  },
  Input: {
    borderBottomWidth: 0,
    backgroundColor: "#000",
    //backgroundColor: "red",
    //borderBottomColor: "#FFF",
    //borderColor: "#3C4956",
    borderColor: "#FFF",
    padding: 12,
    paddingLeft: 30,
    color: "#FFF",
    height: 50,
    fontSize: 21,
    borderRadius: 30,
  },
});
