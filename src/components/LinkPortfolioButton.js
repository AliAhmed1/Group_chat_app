import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";

const LinkPortfolioButton = () => {
  const [showModal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {}, [isLoading]);
  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.btn}
        //onPress={() => navigation.navigate("LinkPortfolio")}
        onPress={() => setModal(true)}
      >
        {/* <Text style={{ color: "#FFF", fontSize: 19, fontWeight: "bold" }}>
          Robinhood
        </Text> */}
        <Image
          source={require("../../assets/robinhoodlogo.png")}
          // source={{ uri: itemPic }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={styles.close}
            >
              <Text style={{ fontWeight: "bold", color: "#FFF" }}>╳</Text>
            </TouchableOpacity>
            {isLoading && <ActivityIndicator size={"large"} color={"grey"} />}
            <WebView
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              style={styles.webViewContainer}
              source={{
                uri: `https://robinhood.com/login`,
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  buttonContainer: {
    display: "flex",
    paddingVertical: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "100%",
    height: "92%",
    shadowColor: "#657786",
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    backgroundColor: "#000",
  },
  webViewContainer: {
    height: "95%",
    width: "100%",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    //position: "absolute",
    //bottom: 10,
    //right: 110,
    //top: 300,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 100,
    flexDirection: "row",
  },
  close: {
    alignSelf: "flex-end",
    padding: 6,
    marginRight: 20,
    marginTop: 10,
  },
  avatar: {
    width: 130,
    height: 31,
    //borderRadius: 20
  },
});

export default LinkPortfolioButton;
