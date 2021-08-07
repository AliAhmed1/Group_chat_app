import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";

const Confetti = () => (
  <ConfettiCannon count={200} origin={{ x: -20, y: -10 }} />
);

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      cardData: { valid: false },
    };
  }
  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }

  componentWillUnmount() {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
  }
  render() {
    return (
      <View style={styles.getStarted}>
        <Confetti></Confetti>
        <TouchableOpacity
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => this.props.navigation.goBack()}
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
          <Text style={styles.Stockchat}>WELCOME TO STOCK CHAT</Text>
        </View>
        <View>
          <Text style={styles.username}>
            Your account has been created successfully.
          </Text>
        </View>

        <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
          <View
            style={{
              paddingHorizontal: 10,
              top: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.Button}
              onPress={() => this.props.navigation.push("Notification")}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "#F5F8FA",
                  fontWeight: "600",
                }}
              >
                Join Stock Chat
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
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
