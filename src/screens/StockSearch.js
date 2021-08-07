import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TextInputComponent,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Icon, Header, Left, Right, Body, Button } from "native-base";

import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

class StockSearch extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Header
          style={{
            backgroundColor: "#000",
            borderBottomWidth: 0.2,
            borderBottomColor: "#282c34",
          }}
        >
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Feather name="chevron-left" color="#FFF" size={30} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "600",
                color: "#FFF",
              }}
            >
              Recieve
            </Text>
          </Body>
          <Right></Right>
        </Header>

        <View>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor="grey"
            placeholder="Search crypto"
            // value={email}
            // onChangeText={val => setEmail(val)}
          />
        </View>
      </View>
    );
  }
}

export default StockSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 80,
  },
  main: {
    backgroundColor: "#000",
    height: "100%",
    paddingHorizontal: 10,
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
  getStarted: {
    // flex: 1,
    // paddingTop: 20,
    // paddingHorizontal: 20,
    backgroundColor: "#000",
    // width: Dimensions.get("screen").width
  },
  Button: {
    backgroundColor: "#147efb",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    marginVertical: 20,
  },
  lockedButton: {
    backgroundColor: "grey",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    marginVertical: 20,
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
    //paddingLeft: 30,
    color: "#FFF",
    height: 50,
    fontSize: 21,
    borderRadius: 30,
    textAlign: "center",
  },
  tcontainer: {
    //backgroundColor: "#FFF",
    //flex: 1,
    flexDirection: "row",
    padding: 50,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30
  },
  bcontainer: {
    flex: 1,
    borderTopLeftRadius: 90,
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  tHeading: {
    color: "#F5F8FA",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: "30%",
  },

  //   inputStyle: {
  //     width: "100%",
  //     marginBottom: 15,
  //     paddingBottom: 15,
  //     alignSelf: "center",
  //     borderColor: "#ccc",
  //     borderBottomWidth: 1,
  //     margin: 20
  //   },
  toptcontainer: {
    backgroundColor: "#3498db",
  },

  topbcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottombcontainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuContainer: {
    //justifyContent: "space-around",
    alignItems: "center",
    //height: "100%",
    padding: 50,
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
    fontSize: 30,
    color: "#FFF000",
    marginTop: 50,
    marginBottom: 50,
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
  inputStyle: {
    width: "100%",
    //marginBottom: 15,
    //paddingBottom: 15,
    paddingVertical: 10,
    paddingLeft: 10,
    alignSelf: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: "#000",

    color: "#FFF",
    height: 50,
  },
  btn: {
    width: 300,
    borderRadius: 16,
    //borderTopRightRadius: 0,
    backgroundColor: "#147efb",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
