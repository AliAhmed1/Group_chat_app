import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

class TrendingStocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      final_data: [],
      isSubscribed: true,
    };
  }

  componentDidMount() {
    this.getTrandingData();
  }

  componentWillUnmount() {
    this.getTrandingData();
  }

  async getTrandingData() {
    return fetch("https://sharestock.io/api/trendingStock", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            data: responseJson.data,
            isLoading: false,
          },
          function () {}
        );
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
      });
  }

  TrendingComponent = () => {
    // CheckGroupExistsOrNot("SQ").then((snapshot))
    if (this.state.data.length) {
      return this.state.data.map((service, index) => (
        // <TouchableOpacity
        //   key={index}
        //   onPress={() =>
        //     this.props.navigation.push("StockDetails", {
        //       symbol: service.symbol
        //     })
        //   }
        //   style={{ marginLeft: 10, borderRadius: 35 }}
        // >
        <TouchableOpacity
          key={index}
          onPress={() =>
            this.props.navigation.push("StockDetails", {
              symbol: service.symbol,
            })
          }
          style={{
            shadowOffset: { width: 0.5, height: 0.5 },
            shadowRadius: 2,

            shadowOpacity: 0.2,
            borderWidth: 3,
            borderColor:
              parseFloat(service.changePercent) < 0 ? "#ff3636" : "#33CC00",
            marginRight: 10,
            shadowOpacity: 0.2,
            elevation: 1,
            //backgroundColor: "#000",
            backgroundColor:
              parseFloat(service.changePercent) < 0 ? "#ff3636" : "#33CC00",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
          }}
        >
          <View
            style={{
              //height: 80,
              width: 100,

              justifyContent: "space-between",
              alignItems: "center",
              //paddingVertical: 0,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                fontSize: 18,
                //textAlign: "left"
                color: "#FFF",
              }}
            >
              {service.symbol}
            </Text>

            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
                textAlign: "center",
                color: "#FFF",
                // color:
                //   parseFloat(service.changePercent) < 0 ? "#ff3636" : "#33CC00",
              }}
            >
              {parseFloat(service.changePercent) < 0
                ? (parseFloat(service.changePercent) * 100).toFixed(2)
                : "+" + (parseFloat(service.changePercent) * 100).toFixed(2)}
              %
            </Text>
          </View>
        </TouchableOpacity>
      ));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {this.TrendingComponent()}
      </ScrollView>
    );
  }
}

export default TrendingStocks;

const styles = StyleSheet.create({
  container: {
    //paddingVertical: 10,
    //marginLeft: 20
  },
  text: {
    marginHorizontal: 8,
    marginVertical: 10,
  },

  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    //marginBottom: 36
  },

  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#282c34",
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
  card: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowRadius: 2,
    borderBottomColor: "#60646C",
    borderBottomWidth: 0.5,

    shadowColor: "#B9BABD",
    //marginHorizontal: 10,

    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: "#60646C",
    marginRight: 10,
    shadowOpacity: 0.2,
    //marginVertical: 5,
    elevation: 1,
    //backgroundColor: "#e8eef1",
    //backgroundColor: "#282c34"
    backgroundColor: "#000",
    borderRadius: 20,
    //paddingHorizontal: 20,
    //paddingVertical: 10,
    flexDirection: "row",
    //paddingHorizontal: 40,
    alignItems: "center",
    //marginTop: 15,
    //marginBottom: 20,
    justifyContent: "space-between",
    height: 60,
    //start: 5,
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
    // color: '#33CC00'
  },

  stocktextred: {
    fontSize: 18,
    fontWeight: "500",
    justifyContent: "center",
    //color: 'red'
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
    margin: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#282c34",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20,
  },
  topContainer: {
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "lightgrey",
    shadowOpacity: 2.0,
    marginHorizontal: 10,
    marginBottom: 10,
    //backgroundColor: "#e8eef1",
    backgroundColor: "#282c34",
    borderRadius: 20,
    padding: 10,
    paddingTop: 20,
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
    color: "#147efb",
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 10,
  },
  tickerbox: {
    padding: 10,
  },
  seperator: {
    marginVertical: 10,
    borderColor: "#F5F8FA",
    borderWidth: 0.5,
  },
  textview: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    //height: 100
  },
});
