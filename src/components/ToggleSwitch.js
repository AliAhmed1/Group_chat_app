import React, { useState, useEffect } from "react";
import { View, Switch, StyleSheet, Text } from "react-native";

const App = ({ isActive, onPress }) => {
  const [isEnabled, setIsEnabled] = useState(isActive);

  useEffect(() => {
    setIsEnabled(isActive);
  }, [isActive]);

  const toggleSwitch = () =>
    setIsEnabled((previousState) => {
      onPress && onPress(!previousState);
      return !previousState;
    });

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#05e37b" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#F5F8FA"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1
    //alignItems: "center",
    //justifyContent: "center"
  },
});

export default App;

// import React, { Component } from "react";
// import { View, Switch, StyleSheet } from "react-native";

// export default class ToggleSwitch extends Component {
//   state = {
//     isEnabled: false,
//   };

//   componentWillMount() {
//     this.setState({
//       isEnabled: this.props.isActive,
//     });
//   }

//   toggleSwitch = () => {
//     this.setState({
//       isEnabled: !this.state.isActive,
//     });
//   };

//   render() {
//     const { isEnabled } = this.state;
//     console.log("lol", isEnabled);
//     console.log("lo 2", this.props.isActive);

//     return (
//       <View style={styles.container}>
//         <Switch
//           trackColor={{ false: "#767577", true: "#05e37b" }}
//           thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
//           ios_backgroundColor="#F5F8FA"
//           onValueChange={this.toggleSwitch}
//           value={isEnabled}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     //flex: 1
//     //alignItems: "center",
//     //justifyContent: "center"
//   },
// });
