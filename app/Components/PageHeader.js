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

const PageHeader = (props) => {
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
        <TouchableNativeFeedback
        useForeground
        onPress={() => props.navigation.navigate("Home")}
      >
        <View style={styles.leftContainer}>
          <Icon
            size={30}
            name="ios-arrow-back"
            style={styles.listIcon}
            color="#ffffff"
          />
        </View>
      </TouchableNativeFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
    backgroundColor: Colors.primary,
    height: 90,
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
  },
  titleContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "mix-arab-regular",
    fontSize: 22,
    color: "#fff",
  },
  leftContainer: {
    flex: 1,
    marginRight: 5,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
    overflow: "hidden",
  },

});


export default PageHeader;