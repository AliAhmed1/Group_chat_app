import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default class StockTweets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      stock_tweets: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://sharestock.io/api/stock-feed/?stock=PYPL&token=b376a1a3a017c9e885885507a3b7b9554224da41"
    )
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.data });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  _render_stock_tweet_feed = () => {
    let news = this.state.stock_tweets;
    if (news.length > 0) {
      return (
        <View style={styles.card}>
          <View style={{ paddingBottom: 1 }}>
            <Text style={styles.heading}>Stock Tweets</Text>
          </View>
          {news.map((data, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12, paddingBottom: 5 }}>
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

  render() {
    const { data, isLoading } = this.state;
    let stock_tweet = this._render_stock_tweet_feed();

    return <View>{stock_tweet}</View>;
  }
}
