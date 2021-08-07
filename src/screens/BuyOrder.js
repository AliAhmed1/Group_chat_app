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
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  Icon,
  Header,
  Left,
  Right,
  Body,
  Button,
  Footer,
  FooterTab,
} from "native-base";

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
      alert("Order Confirmed Successfully");
      return false;
    }
    if (isNaN(phone.trim())) {
      alert("Only numbers are allowed");
      return false;
    }
    // props.navigation.push("Password", {
    //   username: props.route.params.username,
    //   email: props.route.params.email,
    //   phone: phone.trim()
    // });
  };

  return (
    <KeyboardAvoidingView
      //behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.getStarted}
    >
      <Header
        style={{
          backgroundColor: "#000",
          borderBottomWidth: 0,
          flexDirection: "row",
          //marginTop: 25,
          marginHorizontal: 10,
          alignItems: "center",
          justifyContent: "center",
          //flex: 1
        }}
      >
        <Left>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="chevron-left" size={30} color="#FFF" />
          </TouchableOpacity>
        </Left>
        <Body>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text style={styles.header}>BUY</Text>
          </TouchableOpacity>
        </Body>
        <Right>
          {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Feather name="clock" size={30} color="#FFF" />
          </TouchableOpacity> */}
        </Right>
      </Header>

      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: 10,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 60, color: "#FFF" }}>$</Text>
        <TextInput
          //einputContainerStyle={{ borderBottomWidth: 0 }}
          style={styles.Input}
          placeholder="0"
          placeholderTextColor="#FFF"
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
            Place Order
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            props.navigation.push("Password", {
              email: props.route.params.email,
              username: props.route.params.username,
              phone: ""
            })
          }
        >
          <Text style={styles.username}>I'll do this later</Text>
        </TouchableOpacity> */}
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
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    //flex: 1,
    fontSize: 20,
    //paddingLeft: 10
    //textAlign: "center"
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

    color: "#FFF",
    height: 50,
    fontSize: 60,
    borderRadius: 30,
    textAlign: "center",
  },
});
