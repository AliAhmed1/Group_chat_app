import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Share,
} from "react-native";
import axios from "axios";
import * as firebase from "firebase";
// import { withNavigation } from "react-navigation";
// import DropMenu from "../search/Components/dropMenu";
import * as Linking from "expo-linking";

class UserScreener extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      flag: 1,
      isLoading: true,
      screener: null,
      screener_list: [],
      demo_d: null,
      final_data: [],
      query: "",
      searchResults: [],
      results: false,
      previous_query: null,
      status: true,
    };
    this.arrayholder = [];
  }

  _apiCall = async (data) => {
    if (data !== undefined && data !== null) {
      let post_data = {
        filter: [
          {
            left: "market_cap_basic",
            operation: "nempty",
          },
          {
            left: "type",
            operation: "in_range",
            right: ["stock", "dr", "fund"],
          },
          {
            left: "subtype",
            operation: "in_range",
            right: [
              "common",
              "",
              "etf",
              "unit",
              "mutual",
              "money",
              "reit",
              "trust",
            ],
          },
          {
            left: "exchange",
            operation: "in_range",
            right: ["AMEX", "NASDAQ", "NYSE"],
          },
          {
            left: "close",
            operation: "less",
            right: data.price,
          },
          {
            left: "sector",
            operation: "in_range",
            right: data.types_of_sector,
          },
          {
            left: "volume",
            operation: "in_range",
            right: [parseInt(data.minvolume), parseInt(data.maxvolume)],
          },
        ],
        options: {
          lang: "en",
        },
        symbols: {
          query: {
            types: [],
          },
          tickers: [],
        },
        columns: [
          "name",
          "close",
          "change",
          "change_abs",
          "Recommend.All",
          "volume",
          "market_cap_basic",
          "price_earnings_ttm",
          "earnings_per_share_basic_ttm",
          "number_of_employees",
          "sector",
          "description",
          "name",
          "type",
          "subtype",
          "update_mode",
          "pricescale",
          "minmov",
          "fractional",
          "minmove2",
        ],
        sort: { sortBy: "Recommend.All", sortOrder: "asc" },
        range: [0, 5],
      };
      return axios.post(
        "https://scanner.tradingview.com/america/scan",
        post_data
      );
    }
  };

  _retriveScreener = async () => {
    this.setState({ isLoading: true });
    await AsyncStorage.getItem("user")
      .then((user) => {
        user = JSON.parse(user);
        var ref = firebase.database().ref("/Screener");
        var query = ref.orderByChild("user").equalTo(user.email);
        query
          .once("value")
          .then((data) => {
            this.setState({
              screener: data.val(),
              user_email: user.email,
              isLoading: false,
            });
            this._renderScreener();
          })
          .catch((err) => {
            this.setState({ isLoading: false });
            alert(err);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener(
      "didFocus",
      (payload) => {
        this._retriveScreener();
      }
    );
  }

  // componentWillUnmount = () => {
  //   this._apiCall();
  //   this._retriveScreener();
  // };

  _renderScreener = async () => {
    if (this.state.screener != null) {
      let list = [];
      for (let [key, value] of Object.entries(this.state.screener)) {
        list.push({ value: value, key: key });
      }
      this.setState({ screener_list: list, final_data: [] });
      let li = [];
      for (let i = 0; i < list.length; ++i) {
        await this._apiCall(list[i]["value"])
          .then((resp) => {
            list[i]["value"]["key"] = list[i]["key"];
            resp.data.data.push(list[i]["value"]);
            li.push(resp.data.data);
            // console.log(li);
            this.setState({ final_data: li });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
      this.setState({ final_data: li });
    }
  };

  _deleteScreener = (key, index) => {
    if (key) {
      console.log(key);
      firebase
        .database()
        .ref("Screener")
        .child("" + key)
        .remove()
        .then((response) => {
          let data = this.state.final_data;
          data.splice(index, 1);
          this.setState({ final_data: data });
          console.log("deleted");
        })
        .catch((error) => {
          console.log("error is ", error.message);
        });
    }
  };

  _show_screener_data = () => {
    if (this.state.final_data.length > 0) {
      let count = 0;
      return this.state.final_data.map((data, index) => {
        if (data.length === 6) {
          if (count === 0) {
            this.props.onDataLoaded(true);
          }
          count += 1;
          return (
            <View key={index} style={styles.screenContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    paddingLeft: 10,
                    width: "80%",
                  }}
                >
                  {data[5].name}
                </Text>
                {/* <DropMenu
                  onDelete={e => this._deleteScreener(data[5].key, index)}
                  screenerData={data[5]}
                /> */}
              </View>
              <View style={styles.tickerbox}>
                <View style={styles.stockcard}>
                  <TouchableOpacity
                    style={styles.ticker}
                    onPress={() =>
                      this.props.navigation.navigate("List_Screener", {
                        propsData: {
                          sector: data[5].types_of_sector,
                          minvolume: data[5].minvolume,
                          maxvolume: data[5].maxvolume,
                          price: data[5].price,
                          name: data[5].name,
                        },
                      })
                    }
                  >
                    <Text style={styles.tickertext}>{data[0].d[0]}</Text>
                    <View style={styles.datacard}>
                      <Text
                        style={[
                          styles.stocktext,
                          {
                            color:
                              parseFloat(data[0].d[2]) < 0
                                ? "#CF2727"
                                : "#33CC00",
                          },
                        ]}
                      >
                        {data[0].d[2] !== null ? data[0].d[2].toFixed(2) : "0"}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.seperator} />
                <View style={styles.stockcard}>
                  <TouchableOpacity
                    style={styles.ticker}
                    onPress={() =>
                      this.props.navigation.navigate("List_Screener", {
                        propsData: {
                          sector: data[5].types_of_sector,
                          minvolume: data[5].minvolume,
                          maxvolume: data[5].maxvolume,
                          price: data[5].price,
                          name: data[5].name,
                        },
                      })
                    }
                  >
                    <Text style={styles.tickertext}>{data[1].d[0]}</Text>

                    <View style={styles.datacard}>
                      <Text
                        style={[
                          styles.stocktext,
                          {
                            color:
                              parseFloat(data[1].d[2]) < 0
                                ? "#CF2727"
                                : "#33CC00",
                          },
                        ]}
                      >
                        {data[1].d[2] !== null ? data[1].d[2].toFixed(2) : "0"}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.seperator} />
                <View style={styles.stockcard}>
                  <TouchableOpacity
                    style={styles.ticker}
                    onPress={() =>
                      this.props.navigation.navigate("List_Screener", {
                        propsData: {
                          sector: data[5].types_of_sector,
                          minvolume: data[5].minvolume,
                          maxvolume: data[5].maxvolume,
                          price: data[5].price,
                          name: data[5].name,
                        },
                      })
                    }
                  >
                    <Text style={styles.tickertext}>{data[2].d[0]}</Text>

                    <View style={styles.datacard}>
                      <Text
                        style={[
                          styles.stocktext,
                          {
                            color:
                              parseFloat(data[2].d[2]) < 0
                                ? "#CF2727"
                                : "#33CC00",
                          },
                        ]}
                      >
                        {data[2].d[2] !== null ? data[2].d[2].toFixed(2) : "0"}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.seperator} />
                <View style={styles.stockcard}>
                  <TouchableOpacity
                    style={styles.ticker}
                    onPress={() =>
                      this.props.navigation.navigate("List_Screener", {
                        propsData: {
                          sector: data[5].types_of_sector,
                          minvolume: data[5].minvolume,
                          maxvolume: data[5].maxvolume,
                          price: data[5].price,
                          name: data[5].name,
                        },
                      })
                    }
                  >
                    <Text style={styles.tickertext}>{data[3].d[0]}</Text>
                    <View style={styles.datacard}>
                      <Text
                        style={[
                          styles.stocktext,
                          {
                            color:
                              parseFloat(data[3].d[2]) < 0
                                ? "#CF2727"
                                : "#33CC00",
                          },
                        ]}
                      >
                        {data[3].d[2] !== null ? data[3].d[2].toFixed(2) : "0"}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.seperator} />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {/* <TouchableOpacity
                                        style={{justifyContent:'center',alignItems:'center',paddingRight:10}}
                                        onPress={(key) =>this._deleteScreener(data[5].key,index)}
                                    >
                                        <Text style={styles.deleteScreener}>Delete</Text>
                                    </TouchableOpacity> */}

                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 10,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate("List_Screener", {
                        propsData: {
                          sector: data[5].types_of_sector,
                          minvolume: data[5].minvolume,
                          maxvolume: data[5].maxvolume,
                          price: data[5].price,
                          name: data[5].name,
                        },
                      })
                    }
                  >
                    <Text style={styles.viewmore}>View More</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>{this._show_screener_data()}</View>
        {/* <View style={{ height: 20 }}></View> */}
      </View>
    );
  }
}

export default UserScreener;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#e8eef1"
    backgroundColor: "#000",
    //backgroundColor: "#FFF",
    //height: 1000
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
    marginTop: 0,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#000",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 0,
    marginTop: 0,
  },
  formContent: {
    flexDirection: "row",
    //marginTop:30,
    backgroundColor: "#147efb",
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 50,
    marginLeft: 10,
    borderBottomColor: "#F5F8FA",
    //flex: 1,
    width: 300,
    backgroundColor: "#000",
    marginBottom: 50,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
  saveButton: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    //margin:10,
    width: 50,
    alignSelf: "flex-end",
    backgroundColor: "#147efb",
    borderRadius: 100,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#F5F8FA",
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#000",
    flexDirection: "row",
    borderRadius: 10,
  },
  image: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10,
  },
  datacard: {
    //backgroundColor: "#147efb",
    //height: 40,
    width: 100,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  stocktext: {
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center",
    color: "#FFF",
  },

  offerCard: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "lightgrey",
    shadowOpacity: 1.0,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#e8eef1",
    margin: 10,
    borderRadius: 20,
    width: 340,
  },
  screenContainer: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 2.0,
    marginHorizontal: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    //textAlign: "center"
    marginHorizontal: 20,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "400",
    //textAlign: "center",
    marginTop: 10,
    marginHorizontal: 20,
  },
  ticker: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tickertext: {
    //paddingLeft: 20,
    //paddingTop: 10,
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center",
    alignItems: "center",
  },
  viewmore: {
    //color: "#147efb",
    color: "#282C34",
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 10,
  },
  deleteScreener: {
    color: "#F32013",
    fontWeight: "800",
    textAlign: "center",
    paddingTop: 20,
  },
  tickerbox: {
    padding: 10,
  },
  seperator: {
    marginVertical: 10,
    borderColor: "darkgrey",
    borderWidth: 0.5,
  },
});
