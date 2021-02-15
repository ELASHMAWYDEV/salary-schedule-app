// @ts-nocheck
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Icon from "react-native-ionicons";

//Assets
import Colors from "../assets/Colors";

const Header = (props) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableNativeFeedback
          useForeground
          onPress={() => props.navigation.openDrawer()}
        >
          <View style={styles.iconContainer}>
            <Icon
              size={42}
              name="ios-menu"
              style={styles.listIcon}
              color="#ffffff"
            />
          </View>
        </TouchableNativeFeedback>
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../assets/img/logo.png")}
              style={styles.logo}
            />
          </View>
        </View>
        <TouchableNativeFeedback
          useForeground
          onPress={() => props.reloadWebView()}
        >
          <View style={styles.leftContainer}>
            <Icon
              name="ios-repeat"
              size={40}
              color="#fff"
              style={styles.repeatIcon}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  );
};


Header.defaultProps = {
  reloadWebView: () => null,
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.primary,
    height: 80,
    flexDirection: "row-reverse",
    paddingBottom: 5,
    zIndex: 2,
  },
  iconContainer: {
    marginRight: 5,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
    alignSelf: "center",
  },
  logoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    overflow: "hidden",
    alignSelf: "center",
    marginLeft: 15
  },
  listIcon: {
    transform: [{ scale: -1 }],
  },
  logoWrapper: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    width: 95,
    height: 95,
    borderRadius: 95 / 2,
    top: 20,
  },
  logo: {
    resizeMode: "contain",
    width: 85,
    height: 85,
  },
  repeatIcon: {},
});


export default Header;