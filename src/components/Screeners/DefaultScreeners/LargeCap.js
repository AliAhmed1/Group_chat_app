import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ListView,
  ActivityIndicator,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Header, Left, Right, Icon, Body } from "native-base";
import URL from "../../../../Constant/Constant";
import { Feather } from "@expo/vector-icons";
import Analytics from "../../../../Constant/ExpoMixpanelConstant";

class LargeCap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      apidata: null,
      isLoading: true,
      key: null,
      name: null,
    };
    this._apiCall = this._apiCall.bind(this);
  }

  _apiCall() {
    return fetch(URL.HOST_URL + "api/largeCap", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            apidata: responseJson,
            data: responseJson.map((service, index) => ({
              key: `item-${index}`,
              name: service.name,
              price: service.price,
              change: service.change,
              rating: service.rating,
              volume: service.volume,
              label: service.name,
              backgroundColor: "#000",
              marginTop: 1,
            })),
          },
          function () {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    Analytics.ANALYTICS.track("DEFAULT SCREENER", { type: "LARGE CAP" });
    this._apiCall();
  }

  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            this.props.navigation.navigate("search_detail", {
              symbol: item.label,
              type: "largeCap",
            });
          }}
          onLongPress={move}
          onPressOut={moveEnd}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  //marginTop: 10
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: "#212121",
                    fontSize: 20,
                    textAlign: "center",
                    paddingLeft: 20,
                  }}
                >
                  {""}
                  {item.label}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    color: "#808080",
                    fontSize: 12,
                    paddingLeft: 20,
                  }}
                >
                  Volume: {item.volume}
                </Text>
                <Text
                  style={{
                    fontWeight: "500",
                    color: "#808080",
                    fontSize: 12,
                    paddingLeft: 20,
                  }}
                >
                  {"Rating: "}
                  {item.rating}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginRight: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  //marginTop: 10
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    color: "#212121",
                    fontSize: 20,
                    textAlign: "right",
                  }}
                >
                  {" $"}
                  {item.price}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  //marginTop: 5
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 20,
                    color: parseFloat(item.change) < 0 ? "red" : "#33CC00",
                  }}
                >
                  {" "}
                  {item.change}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadCon}>
          <Text style={styles.loadTitle}>Finding Stocks...</Text>
          <ActivityIndicator color="#FFF" size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header style={{ backgroundColor: "#000", borderBottomWidth: 0 }}>
          <Left>
            <Icon
              style={{
                color: "#FFF",
                paddingHorizontal: 20,
                fontSize: 24,
                fontWeight: "bold",
              }}
              name="arrow-back"
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>

          <Body>
            {/*<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#0065E7'}}>CHARTBOT</Text>*/}
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: Platform.OS === "ios" ? 300 : 220,
              }}
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFF" }}>
                Large Cap
              </Text>
            </TouchableOpacity>
          </Body>

          <Right>
            <Feather
              style={{
                color: "#FFF",
                fontWeight: "bold",
                paddingHorizontal: Platform.OS === "ios" ? 20 : 15,
                fontSize: 30,
              }}
              name="search"
              onPress={() => this.props.navigation.navigate("Search_page")}
            />
          </Right>
        </Header>
        <DraggableFlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          scrollPercent={5}
          onMoveEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}
export default LargeCap;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  headerTop: {
    backgroundColor: "#3b5998",
    height: 60,
    width: "100%",
  },
  loadCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadTitle: {
    color: "#FFF000",
    fontSize: 16,
    margin: 8,
    fontWeight: "700",
  },
  statusBar: {
    height: 60,
  },
  image: {
    width: 100,
    height: 100,
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 1.0,
    shadowRadius: 2,
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 10,
    height: 80,
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: "center",
  },
});
