import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import _ from "lodash";
const PROD_URL = "cloud.iexapis.com/stable";

const screenWidth = Dimensions.get("window").width;

const DATA = [
  {
    title: "1D",
    time: "1d",
  },
  {
    title: "1W",
    time: "7d",
  },
  {
    title: "1M",
    time: "1m",
  },
  {
    title: "3M",
    time: "3m",
  },
  {
    title: "1Y",
    time: "1y",
  },
  {
    title: "5Y",
    time: "5y",
  },
];

export default class ChartComp extends Component {
  state = {
    selected: 0,
    data: [],
  };

  componentWillMount() {
    this.getTodayData();
  }

  getTodayData() {
    const symbol = this.props.symbol;
    axios
      .get(
        `https://${PROD_URL}/stock/${symbol}/intraday-prices?token=pk_0db8d87dbdde49c5b215cd4ec559ed13`
      )
      .then((response) => {
        console.log("res", response);
        let stock = [];
        response.data.map((item, index) => {
          stock.push(item.marketNotional || item.notional);
        });
        const chunk = _.chunk(stock, response.data.length - 50);
        const remove = [];
        chunk.map((item, index) => {
          index % 2 && remove.push(item);
        });
        const concat = _.flatten(remove);
        const final = [];
        concat.map((item, index) => {
          index % 2 && final.push(item);
        });
        console.log("final", final);
        const filterd = final.filter((item) => item !== null);
        this.setState({ data: filterd });
      })
      .catch((error) => {
        console.log("ERROR", error);
        this.setState({ error: true });
      });
  }

  getSpecificDateData(time) {
    axios
      .get(
        `https://${PROD_URL}/stock/${this.props.symbol}/chart/${time}?token=pk_0db8d87dbdde49c5b215cd4ec559ed13`
      )
      .then((response) => {
        console.log("response", response.data);
        let stock = [];
        const data = response.data;
        data.map((item, index) => {
          stock.push(item.change);
        });
        // alert(data.length);
        if (time !== "7d") {
          const chunk = _.chunk(stock, 1);
          const remove = [];
          chunk.map((item, index) => {
            index % 2 && remove.push(item);
          });
          const concat = _.flatten(remove);
          const final = [];
          concat.map((item, index) => {
            index % 2 && final.push(item);
          });
          const filterd = final.filter((item) => item !== null);
          console.log("filterd", filterd);
          this.setState({ data: filterd });
        } else {
          console.log("stock", stock);

          const filterd = stock.filter((item) => item !== null);
          this.setState({ data: filterd });
        }
      })
      .catch((error) => this.setState({ error: true }));
  }

  onSelect = (index, item) => {
    index === 0 ? this.getTodayData() : this.getSpecificDateData(item.time);
    this.setState({
      selected: index,
    });
  };

  renderItem = ({ item, index }) => {
    const isSelected = this.state.selected === index;
    const style = isSelected ? styles.selected : {};
    const styleText = isSelected ? styles.selectedText : {};
    return (
      <TouchableOpacity
        onPress={() => this.onSelect(index, item)}
        style={[styles.item, style]}
      >
        <Text style={[styles.text, styleText]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  renderButtons() {
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{}}
        horizontal
        data={DATA}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <LineChart
          data={{
            // labels: ["1D", "1W", "1M", "3M", "1Y", "5Y"],
            datasets: [
              {
                data: this.state.data,
              },
            ],
          }}
          width={screenWidth + 90}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          // withDots={false}
          withShadow={false}
          withInnerLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          // withHorizontalLabels={false}
          withHorizontalLabels={false}
          // withVerticalLabels={true}
          // verticalLabelRotation={2}
          onDataPointClick={(item) => {
            console.log("item", item);
          }}
          // fromZero={true}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            strokeWidth: 2,
            backgroundColor: "#000",
            //backgroundGradientFromOpacity: "100%",
            backgroundGradientFrom: "#000",
            backgroundGradientTo: "#000",
            decimalPlaces: 2, // optional, defaults to 2dp
            // fillShadowGradient="red",
            //color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            color: (opacity = 1) => "#33CC00",
            // labelColor: (opacity = 1) => "red",
            style: {
              borderRadius: 16,
              padding: 0,
            },
            propsForDots: {
              r: "0",
              strokeWidth: "1",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={styles.chartStyle}
        />
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    //backgroundColor: "#000",
    marginBottom: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 10,
    width: screenWidth / 6 - 10,
  },
  selected: {
    backgroundColor: "#33CC00",
  },
  text: {
    fontWeight: "bold",
    color: "#33CC00",
  },
  selectedText: {
    color: "#F5F8FA",
  },
  chartStyle: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 0,
  },
});
