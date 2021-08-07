import React from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Modal from "./Modal";

const InfoModal = () => {
  return (
    <View
      style={{
        paddingVertical: Platform.OS === "ios" ? 10 : 0,
      }}
    >
      <View>BUTTON</View>

      <Modal
        //isVisible={rewardModal}
        //onBackdropPress={() => setRewardModal(false)}
        title="TSLA"
        description={<Text>TSLA +2.20% to $500</Text>}
        //onPress={() => setRewardModal(false)}
        contentContainerStyles={styles.contentContainerStyles}
        contentStyles={styles.contentStyles}
        //buttonTitle="Got it!"
        //height={isIphoneX() ? 70 : 80}
        paddingHorizontal={0}
        descriptionFontSize={14}
      ></Modal>
    </View>
  );
};

export default InfoModal;
