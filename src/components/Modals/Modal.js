import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const KeyboardAvoidingViewContainer = ({ children, height }) => {
  if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView
        behavior="position"
        enabled
        style={[styles.keyboardAvoiding, { height: hp(height) }]}
      >
        {children}
      </KeyboardAvoidingView>
    );
  }
  return (
    <KeyboardAvoidingView enabled style={styles.keyboardAvoiding}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default (props) => {
  const {
    children,
    title,
    description,
    isVisible,
    onBackdropPress,
    onPress,
    buttonTitle = "Okay",
    height = 60,
    buttonMarginTop = wp(3),
    showButton = true,
    keyboard = false,
    renderHeader = false,
    headerCallback,
    paddingHorizontal = 5,
    buttonDisabled = false,
    animationOutTiming = 300,
    animationInTiming = 300,
    cantBeClosed,
    renderBelowTitle = () => null,
    descriptionFontSize,
    contentContainerStyles = {},
    contentStyles = {},
  } = props;

  const renderDescription = () => {
    if (description) {
      return (
        <Text
          style={[
            styles.ModalDescription,
            {
              paddingHorizontal: paddingHorizontal + "%",
            },
            descriptionFontSize && {
              fontSize: descriptionFontSize,
            },
          ]}
        >
          {description}
        </Text>
      );
    }
    return null;
  };

  const renderModalHeader = () => (
    <View style={{ alignSelf: "flex-start" }}>
      <Button onPress={headerCallback ? headerCallback : onBackdropPress}>
        <Image
          style={styles.closeModalIcon}
          source={require("../Portfolio/ProfileScreens/img/back-icon.png")}
        />
      </Button>
    </View>
  );

  const renderButton = () => {
    if (showButton) {
      return (
        <View
          style={[
            styles.ButtonContainer,
            {
              marginTop: buttonMarginTop,
              paddingBottom: isIphoneX() ? 10 : 0,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.ButtonSubmit,
              {
                opacity: buttonDisabled ? 0.15 : 1,
              },
            ]}
            onPress={onPress}
            disabled={buttonDisabled}
          >
            <Text style={styles.ButtonSubmitText}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    const view = (
      <View
        style={[
          styles.Modal,
          {
            height: hp(height),
            paddingBottom: height <= 50 ? hp(2) : hp(4),
          },
          height < 100 ? styles.WithTopRadius : {},
          height < 100
            ? {
                justifyContent: "space-between",
                ...contentContainerStyles,
              }
            : { paddingTop: hp(7), ...contentContainerStyles },
        ]}
      >
        {!cantBeClosed && <View style={styles.ModalPanel} />}
        {renderHeader && renderModalHeader()}
        {title && (
          <View style={{ ...(cantBeClosed && { marginTop: 20 }) }}>
            <Text style={styles.ModalTitle}>{title}</Text>
            {renderDescription()}
            {renderBelowTitle()}
          </View>
        )}
        <View style={[styles.contentContainer, contentStyles]}>
          {children}
          {renderButton()}
        </View>
      </View>
    );

    if (keyboard) {
      return (
        <KeyboardAvoidingViewContainer height={height}>
          {view}
        </KeyboardAvoidingViewContainer>
      );
    }
    return view;
  };

  return (
    <Modal
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
      isVisible={isVisible}
      onBackdropPress={!cantBeClosed ? onBackdropPress : () => null}
      onBackButtonPress={!cantBeClosed ? onBackdropPress : () => null}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      animationOutTiming={animationOutTiming}
      animationInTiming={animationInTiming}
      swipeDirection={!cantBeClosed && "down"}
      onSwipe={!cantBeClosed ? onBackdropPress : () => null}
      swipeThreshold={!cantBeClosed && 170}
      // useNativeDriver={true}
    >
      {renderContent()}
    </Modal>
  );
};

const styles = EStyleSheet.create({
  Modal: {
    width: "100%",
    paddingHorizontal: wp(8),
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    paddingTop: hp(2),
  },
  ModalPanel: {
    width: 50,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
    alignSelf: "center",
  },
  ModalTitle: {
    marginBottom: "5%",
    color: "#26262c",
    fontSize: "1.4rem",
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: "3%",
  },
  ModalDescription: {
    color: "#4C4C51",
    fontSize: "1rem",
    lineHeight: "1.3rem",
    textAlign: "center",
    marginBottom: "0rem",
    // paddingHorizontal: "5%",
  },
  ButtonContainer: { width: "100%" },
  ContentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonSubmit: {
    backgroundColor: "#26262c",
    borderRadius: 10,
    padding: wp(3),
    width: "100%",
    borderWidth: 2,
    borderColor: "#26262c",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: wp(1.5),
  },
  ButtonSubmitText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    textTransform: "uppercase",
    fontSize: "1rem",
  },
  keyboardAvoiding: {
    width: wp(100),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderRadius: 10,
  },
  WithTopRadius: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  closeModalIcon: {
    resizeMode: "contain",
    height: Platform.OS === "android" ? wp(7) : wp(5),
    width: Platform.OS === "android" ? wp(6) : wp(5),
  },
});
