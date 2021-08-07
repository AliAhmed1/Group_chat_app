import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
// import { withNavigation } from "react-navigation";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

class OptionsAlerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_data: null,
      isLoading: false,
      notificationList: [],
      email: null,
      optionFeed: [],
      sub_status: true,
      data: {},
    };
  }

  async componentDidMount() {
    await AsyncStorage.getItem("user")
      .then((user) => {
        user = JSON.parse(user);
        this.setState({ sub_status: true });
      })
      .catch((error) => console.log(error.message));
    this._getBenzingaOptions();
  }

  _getBenzingaOptions = () => {
    if (this.state.sub_status) {
      this.setState({ isLoading: true });
      //   Analytics.ANALYTICS.track("OPTION ALERT FEED", {});
      let url =
        "https://api.benzinga.com/api/v1/signal/option_activity&token=4c6c9bab036c4161ba7d6e4b7f30bfe6";
      let headers = { Accept: "application/json" };
      axios
        .get(url, headers)
        .then(async (response) => {
          let data = response.data;
          this.setState({ optionFeed: data.option_activity, isLoading: false });
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          alert(error.message);
        });
    }
  };

  _renderOptions = () => {
    if (this.state.optionFeed.length > 0) {
      let list = [];
      list = this.state.optionFeed;
      return list.map((data, index) => {
        return (
          <View key={index}>
            <View
              style={styles.card}
              onPress={() =>
                this.props.navigation.navigate("search_detail", {
                  symbol: data.ticker,
                })
              }
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.options}>{data.ticker}</Text>
                  <Text style={styles.options}>{data.date_expiration}</Text>
                  <Text style={styles.options}>${data.strike_price}</Text>
                  <Text style={styles.options}>{data.put_call}</Text>
                  <Text style={styles.options}>@ ${data.bid}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    // justifyContent: "space-between"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ color: "#FFF", paddingTop: 5, fontSize: 16 }}
                    >
                      {data.description}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "#7c818c", fontSize: 16 }}>
                      Date: {data.date}
                    </Text>
                    <Text style={{ color: "#7c818c", fontSize: 16 }}>
                      Time: {data.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      });
    }
  };

  _renderLocked = () => {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
            alignContent: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignContent: "center",
            }}
          >
            <Feather style={styles.icon} name="lock" />
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 30,
                paddingHorizontal: 20,
                textAlign: "center",
                paddingTop: 20,
              }}
            >
              Options Feed
            </Text>
            <Text
              style={{
                color: "black",
                fontWeight: "500",
                fontSize: 20,
                paddingHorizontal: 20,
                textAlign: "center",
                paddingTop: 20,
              }}
            >
              Unlock ChartBot Pro to get real-time trade alerts, unlimited
              screeners, advanced data, and more.
            </Text>

            {/* <Button
              full
              iconLeft
              primary
              style={{
                borderRadius: 10,
                marginTop: 40,
                marginHorizontal: 30,
                height: 50
              }}
              onPress={() => this.props.navigation.navigate("Subscribe")}
            >
              <Text
                style={{
                  flex: 2,
                  fontSize: 18,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Become a Member
              </Text>
            </Button> */}
            <View style={styles.seperator} />
          </View>
        </View>
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    if (!this.state.sub_status) {
      return <View style={styles.container}>{this._renderLocked()}</View>;
    }
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", backgroundColor: "#000" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            //style={{ paddingHorizontal: 10 }}
          >
            {this._renderOptions()}
            <View style={{ height: 100 }}></View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default OptionsAlerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F8FA",
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  searchbar: {
    marginTop: 50,
  },
  loadCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
  },
  loadTitle: {
    color: "#fff",
    fontSize: 16,
    margin: 8,
    fontWeight: "700",
  },
  profileImage: {
    flex: 1,
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    marginBottom: 0,
    marginRight: 5,
    borderColor: "#147efb",
    alignSelf: "flex-start",
    marginTop: 15,
  },
  icon: {
    color: "black",
    fontSize: 50,
    alignSelf: "center",
  },
  options: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    //backgroundColor: "#F5F8FA",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "#4b5162",
    //shadowOpacity: 2.0,
    //backgroundColor: "#4b5162",
    //borderRadius: 10,
    padding: 10,
    borderBottomColor: "#60646C",
    borderBottomWidth: 1,
    // height: 500,
    marginVertical: 2,
    //marginHorizontal: 10,
    justifyContent: "center",
  },
});
