import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
  Share,
  Clipboard,
} from "react-native";
import DetailItem from "./DetailItem";
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import { Feather, MaterialIcons } from "@expo/vector-icons";
const TOKEN = "pk_0db8d87dbdde49c5b215cd4ec559ed13";
export const TEST_URL = "sandbox.iexapis.com/stable";
const PROD_URL = "cloud.iexapis.com/stable";
import ChartComp from "./ChartComp";
import LinkPortfolioButton from "./LinkPortfolioButton";
import {
  Ionicons,
  Entypo,
  EvilIcons,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import moment from "moment";

//   const Feedback = () => {
//     const [showModal, setModal] = useState(false);
//     const [isLoading, setLoading] = useState(false);
//     useEffect(() => {}, [isLoading]);
//     useEffect(() => {
//       setLoading(true);
//     }, []);

function convert(number) {
  let num =
    Math.abs(Number(number)) >= 1.0e9
      ? Math.abs(Number(number)) / 1.0e9 + "B"
      : Math.abs(Number(number)) >= 1.0e6
      ? Math.abs(Number(number)) / 1.0e6 + "M"
      : Math.abs(Number(number)) >= 1.0e3
      ? Math.abs(Number(number)) / 1.0e3 + "K"
      : Math.abs(Number(number));

  if (!isNaN(num)) {
    return num.toFixed(2);
  } else {
    let unit = num[num.length - 1];
    num = parseFloat(num.slice(0, num.length - 1)).toFixed(2);
    return num + " " + unit;
  }
}

_get_estimate = (num) => {
  if (num >= 100) {
    return { decision: "Strong Buy", color: "green" };
  } else if (num < 100 && num >= 50) {
    return { decision: "Buy", color: "green" };
  } else if (num < 50 && num >= 0) {
    return { decision: "Nutral/Hold", color: "yellow" };
  } else if (num > -50) {
    return { decision: "Sell", color: "red" };
  } else {
    return { decision: "Strong Sell", color: "red" };
  }
};

class StockDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      symbol: props.route.params ? props.route.params.symbol : null,
      advance_stat: {},
      stock_profile: {},
      stock_news: [],
      target_price: [],
      news: [],
      sub_status: true,
      loading: true,
      error: false,
      stock_tweets: [],
      stock_estimate: [],
    };
  }

  async componentDidMount() {
    // if (this.state.symbol) {
    //   this._getBenzingaNews(this.state.symbol);
    // }
    let symbol = this.state.symbol;
    this._get_stock_tweets(symbol);
    this._get_core_estimate(symbol);
    axios
      .get(`https://${PROD_URL}/stock/${symbol}/quote?token=${TOKEN}`)
      .then((response) => {
        this.setState({ data: response.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
      });

    axios
      .get(
        `https://${PROD_URL}/stock/${symbol}/advanced-stats/quote?token=${TOKEN}`
      )
      .then((response) => {
        this.setState({ advance_stat: response.data });
      })
      .catch((error) => {
        console.log("error in stats", error.message);
      });

    axios
      .get(`https://${PROD_URL}/stock/${symbol}/company/quote?token=${TOKEN}`)
      .then((response) => {
        this.setState({ stock_profile: response.data });
      })

      .catch((error) => {
        console.log("error in stats", error.message);
      });

    axios
      .get(`https://${PROD_URL}/stock/${symbol}/news/last/10?token=${TOKEN}`)

      .then((response) => {
        this.setState({ stock_news: response.data });
      })
      .catch((error) => {
        console.log("error in news", error.message);
      });
  }

  _get_core_estimate = (symbol) => {
    axios
      .get(
        `https://${PROD_URL}/time-series/CORE_ESTIMATES/${symbol}?token=${TOKEN}`
      )
      .then((response) => {
        this.setState({ stock_estimate: response.data });
      })
      .catch((error) => console.log("ESTIMATE STOCK ERROR"));
  };

  _render_stock_estimate = () => {
    if (this.state.stock_estimate.length > 0) {
      data = this.state.stock_estimate[0];
      result = _get_estimate(data.marketConsensus);
      return (
        <View style={styles.card}>
          <View>
            <View
              style={{ backgroundColor: result["color"], marginBottom: 20 }}
            >
              <Text
                style={{
                  // color: result["color"],
                  color: "#FFF",
                  fontSize: 30,
                  fontWeight: "800",
                  marginHorizontal: 10,
                  paddingVertical: 10,
                  textAlign: "center",
                }}
              >
                {result["decision"]}
              </Text>
            </View>

            <Text style={styles.heading}>Analyst Rating</Text>

            <View style={{ paddingTop: 10 }}>
              <DetailItem
                title="TARGET PRICE"
                value={
                  !isNaN(data.marketConsensusTargetPrice)
                    ? "$" + convert(data.marketConsensusTargetPrice)
                    : data.marketConsensusTargetPrice
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title="MARKET CONSENSUS"
                value={
                  !isNaN(data.marketConsensus)
                    ? convert(data.marketConsensus)
                    : data.marketConsensus
                }
              />

              <View style={styles.seperator} />
            </View>
            <View>
              <DetailItem
                title="DATE UPDATED"
                value={moment(data.updated).format("l")}
              />
              <View style={styles.seperator} />
            </View>
          </View>
        </View>
      );
    }
  };

  _get_stock_tweets = (symbol) => {
    axios
      .get(
        `https://sharestock.io/api/stock-tweet-sentiment/?symbol=${symbol}&token=b376a1a3a017c9e885885507a3b7b9554224da41`
      )
      .then((response) => {
        this.setState({ stock_tweets: response.data.data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  _render_stock_tweet_feed = () => {
    let news = this.state.stock_tweets;
    if (news.length > 0) {
      return (
        <View
          style={
            {
              //paddingHorizontal: 20,
            }
          }
        >
          {/* <View style={{ paddingBottom: 1 }}>
            <Text style={styles.heading}>Tweets</Text>
          </View> */}
          {news.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                  //borderBottomWidth: 1,
                  //borderBottomColor: "grey",
                }}
              >
                <Text
                  style={{
                    color: "#147efb",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 14,
                    flex: 1,
                    paddingVertical: 5,
                    position: "relative",
                    paddingLeft: 10,
                  }}
                >
                  {data.source}
                </Text>
                <Text style={styles.subheading}>{data.description}</Text>
              </View>
            );
          })}
        </View>
      );
    }
  };

  renderError = () => {
    let stock_tweet = this._render_stock_tweet_feed();
    return (
      <View style={{ paddingTop: 50, height: "100%", backgroundColor: "#000" }}>
        <Text style={{ color: "#FFF", textAlign: "center", fontSize: 20 }}>
          This chart is currently unavailable.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {stock_tweet}
        </ScrollView>
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={{ paddingTop: 50, height: "100%", backgroundColor: "#000" }}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  };

  _renderNews = () => {
    let news = this.state.news;
    if (news.length > 0) {
      return news.map((data, index) => {
        return (
          <View key={index}>
            <Text style={styles.subtext}>{data}</Text>
          </View>
        );
      });
    }
  };

  _renderAdvanceStats = () => {
    let obj = this.state.advance_stat;
    if (
      typeof Object.keys(obj) !== "undefined" &&
      Object.keys(obj).length > 0
    ) {
      return (
        <View style={styles.card}>
          <View>
            <Text style={styles.heading}>Advanced Statistics</Text>
            <View style={{ paddingTop: 10 }}>
              <DetailItem
                title={"EBITDA"}
                value={
                  "$" + !isNaN(obj.EBITDA) ? convert(obj.EBITDA) : obj.EBITDA
                }
              />
              <View style={styles.seperator} />
              <DetailItem
                title={"BETA"}
                value={!isNaN(obj.beta) ? convert(obj.beta) : obj.beta}
              />
              <View style={styles.seperator} />
              <DetailItem
                title={"200D MA"}
                value={
                  "$" + !isNaN(obj.day200MovingAvg)
                    ? convert(obj.day200MovingAvg)
                    : obj.day200MovingAvg
                }
              />
              <View style={styles.seperator} />
              <DetailItem
                title={"50D MA"}
                value={
                  "$" + !isNaN(obj.day50MovingAvg)
                    ? convert(obj.day50MovingAvg)
                    : obj.day50MovingAvg
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"AVG 10 DAY VOLUME"}
                value={
                  "$" + !isNaN(obj.avg10Volume)
                    ? convert(obj.avg10Volume)
                    : obj.avg10Volume
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"AVG 30 DAY VOLUME"}
                value={
                  "$" + !isNaN(obj.avg30Volume)
                    ? convert(obj.avg30Volume)
                    : obj.avg30Volume
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"5 DAY % CHANGE"}
                value={
                  "%" + !isNaN(obj.day5ChangePercent * 100)
                    ? convert(obj.day5ChangePercent * 100)
                    : obj.day5ChangePercent * 100
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"30 DAY % CHANGE"}
                value={
                  "%" + !isNaN(obj.day30ChangePercent * 100)
                    ? convert(obj.day30ChangePercent * 100)
                    : obj.day30ChangePercent * 100
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title="FLOAT"
                value={!isNaN(obj.float) ? convert(obj.float) : obj.float}
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"DIVIDEND YIELD %"}
                value={
                  "%" + !isNaN(obj.dividendYield * 100)
                    ? convert(obj.dividendYield * 100)
                    : obj.dividendYield * 100
                }
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"NEXT DIVIDEND DATE"}
                value={obj.nextDividendDate}
              />
              <View style={styles.seperator} />

              <DetailItem
                title={"NEXT EARNINGS DATE"}
                value={obj.nextEarningsDate}
              />
              <View style={styles.seperator} />
            </View>
          </View>
        </View>
      );
    }
  };

  _renderStockProfile = () => {
    let obj = this.state.stock_profile;

    if (
      typeof Object.keys(obj) !== "undefined" &&
      Object.keys(obj).length > 0
    ) {
      return (
        <View style={styles.card}>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <Text style={styles.heading}>Industry</Text>

            <Text style={styles.subheading}>{obj.industry} </Text>

            <Text style={styles.heading}>Sector</Text>

            <Text style={styles.subheading}>{obj.sector} </Text>
          </View>

          <View style={styles.seperator} />

          <Text style={styles.heading}>What do they do?</Text>
          <View>
            <Text style={styles.subheading}>{obj.description} </Text>
          </View>
        </View>
      );
    }
  };

  _renderTargetPrice = () => {
    let obj = this.state.target_price;

    if (
      typeof Object.keys(obj) !== "undefined" &&
      Object.keys(obj).length > 0
    ) {
      return (
        <View>
          <View>
            <Text style={styles.heading}>Target Price</Text>
            <View>
              <DetailItem title={"DATE UPDATED"} value={obj.updatedDate} />
              {/* <View style={styles.seperator} /> */}
              <View style={styles.seperator} />

              <DetailItem title={"HIGH TARGET"} value={obj.priceTargetHigh} />
              <View style={styles.seperator} />
              <DetailItem title={"LOW TARGET"} value={obj.priceTargetLow} />
              <View style={styles.seperator} />
              <DetailItem title={"AVERAGE"} value={obj.priceTargetAverage} />
            </View>
          </View>
        </View>
      );
    }
  };

  _renderStockNews = () => {
    let news = this.state.stock_news;

    if (news.length > 0) {
      return (
        <View style={styles.card}>
          <View style={styles.adcard}>
            {/* <Text style={styles.heading}>Connect ChartBot</Text> */}
          </View>
          <View style={{ paddingBottom: 1 }}>
            <Text style={styles.heading}>Latest News</Text>
            {/* <Feedback></Feedback> */}
          </View>
          {news.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "lightgrey",
                  borderBottomWidth: 1,
                  paddingVertical: 10,
                }}
              >
                <TouchableOpacity
                  style={{}}
                  onPress={() => WebBrowser.openBrowserAsync(data.url)}
                >
                  <Text style={styles.preview}>{data.source}</Text>
                  <Text style={styles.username}>{data.headline}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    }
  };

  renderContent = () => {
    const { data } = this.state;
    let ele = this._renderAdvanceStats();
    let info = this._renderStockProfile();
    let news = this._renderStockNews();
    let target = this._renderTargetPrice();
    let stock_tweet = this._render_stock_tweet_feed();
    let estimate_stock = this._render_stock_estimate();

    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            //height: 80,
            width: "100%",

            alignItems: "center",
            paddingTop: 50,
            paddingHorizontal: 20,
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            // style={{ position: "absolute", top: 50, left: 20 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <AntDesign
              name="left"
              size={30}
              color="#FFF"
              //style={{ marginTop: 20, marginLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.chart}>
            <View>
              <View style={styles.titleCon}>
                <Text style={styles.heading}>{data.symbol}</Text>
                <Text style={styles.subheading}>${data.latestPrice}</Text>
              </View>
              <View style={styles.titleCon}>
                <Text style={styles.subheading}>{data.companyName}</Text>
                <Text style={styles.heading}>
                  {(data.changePercent * 100).toFixed(2)}%
                </Text>
              </View>
            </View>
            {this.state.sub_status ? (
              <View>
                <ChartComp symbol={data.symbol} />
              </View>
            ) : (
              <View />
            )}
          </View>

          <View>{estimate_stock}</View>

          {this.state.sub_status ? (
            <View>
              <View>{stock_tweet}</View>
            </View>
          ) : (
            <View />
          )}

          <View style={styles.card}>
            <View>
              <Text style={styles.heading}>Key Stats</Text>

              <View style={{ paddingTop: 10 }}>
                <DetailItem
                  title="OPEN"
                  value={!isNaN(data.open) ? convert(data.open) : data.open}
                />
                <View style={styles.seperator} />

                <DetailItem
                  title="52 WK HIGH"
                  value={
                    !isNaN(data.week52High)
                      ? convert(data.week52High)
                      : data.week52High
                  }
                />
                <View style={styles.seperator} />
              </View>
              <View>
                <DetailItem
                  title="52 WK LOW"
                  value={
                    !isNaN(data.week52Low)
                      ? convert(data.week52Low)
                      : data.week52Low
                  }
                />
                <View style={styles.seperator} />
                <DetailItem
                  title="DAY HIGH"
                  value={!isNaN(data.high) ? convert(data.high) : data.high}
                />
                <View style={styles.seperator} />
                <DetailItem
                  title="DAY LOW"
                  value={!isNaN(data.low) ? convert(data.low) : data.low}
                />
                <View style={styles.seperator} />
                <DetailItem
                  title="VOLUME"
                  value={
                    !isNaN(data.latestVolume)
                      ? convert(data.latestVolume)
                      : data.latestVolume
                  }
                />
                <View style={styles.seperator} />
                <DetailItem
                  title="AVG VOLUME"
                  value={
                    !isNaN(data.avgTotalVolume)
                      ? convert(data.avgTotalVolume)
                      : data.avgTotalVolume
                  }
                />
                <View style={styles.seperator} />
                <DetailItem
                  title="MARKET CAP"
                  value={
                    !isNaN(data.marketCap)
                      ? convert(data.marketCap)
                      : data.marketCap
                  }
                />
                <View style={styles.seperator} />
              </View>
            </View>
          </View>

          {!this.state.sub_status ? (
            <View style={styles.topcard}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Subscribe")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    //justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather style={styles.icon} name="lock" />
                  <Text style={styles.upgradeText}>Unlock Advanced Stats</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}

          {this.state.sub_status ? (
            <View>
              <View>{ele ? ele : <View />}</View>
            </View>
          ) : (
            <View />
          )}

          {this.state.sub_status ? (
            <View>
              <View>{news ? news : <View />}</View>
            </View>
          ) : (
            <View />
          )}

          <View />

          <View>{info ? info : <View />}</View>
        </ScrollView>
      </View>
    );
  };

  render() {
    const { error, loading } = this.state;
    let content;
    if (error) {
      content = this.renderError();
    } else if (loading) {
      content = this.renderLoading();
    } else {
      content = this.renderContent();
    }
    return content;
  }
}

const styles = StyleSheet.create({
  loadCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    //paddingHorizontal: 20
  },
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 5,
    //shadowColor: "#657786",
    //marginHorizontal: 10,
    shadowOpacity: 0.2,
    marginVertical: 10,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#000",
    borderRadius: 20,
    //paddingHorizontal: 20,
    //paddingVertical: 20,
  },
  preview: {
    //color: "#657786",
    color: "#7c818c",
    //fontFamily: "Montserrat_300SemiBold",
    fontSize: 15,
    //paddingLeft: 10,
    backgroundColor: "#000",
    borderBottomColor: "grey",
    borderBottomWidth: 1,

    marginRight: 10,
  },
  chart: {
    // shadowOffset: { width: 0.5, height: 0.5 },
    // shadowRadius: 5,
    // shadowColor: "lightgrey",
    //marginHorizontal: 10,
    // shadowOpacity: 1.0,
    marginVertical: 10,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#000",
    borderRadius: 20,
    //paddingHorizontal: 20,
    paddingVertical: 20,
  },
  topcard: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 5,
    shadowColor: "lightgrey",
    marginHorizontal: 10,
    shadowOpacity: 1.0,
    marginVertical: 10,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    //paddingTop: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 10,
    marginBottom: 10,
    color: "#FFF",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#FFF",
    marginHorizontal: 10,
  },
  username: {
    color: "#FFF",
    fontFamily: "Montserrat_700Bold",
    fontSize: 15,
    paddingVertical: 10,
  },
  subtext: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    color: "#FFF",
  },
  percent: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },
  companysubheading: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
    width: "70%",
    color: "#FFF",
  },
  loadTitle: {
    color: "#FFF",
    fontSize: 16,
    //margin: 8,
    fontWeight: "700",
  },
  symbol: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#FFF",
    justifyContent: "space-between",
    //textAlign: "right"
  },
  titleCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chartdetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    padding: 10,
  },
  company: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 22,
  },
  seperator: {
    marginVertical: 10,
    borderColor: "#F5F8FA",
    borderWidth: 0.5,
  },
  stats: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 18,
  },
  button: {
    borderRadius: 2,
    backgroundColor: "#FFF",
    width: 80,
    textAlign: "center",
    marginVertical: 30,
  },

  viewmore: {
    color: "#147efb",
    fontWeight: "800",
    textAlign: "center",
    paddingTop: 20,
  },
  icon: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
    //alignSelf: "left"
  },
  upgradeText: {
    fontWeight: "bold",
    //textAlign: "center",
    fontSize: 20,
    paddingLeft: 20,
  },
  headline: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  invite: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#147efb",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default StockDetails;
