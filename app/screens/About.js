import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//Config
import { EMAIL } from "../../config";

//Components
import PageHeader from "../Components/PageHeader";

//Assets
import Colors from "../assets/Colors";

//Utility
import * as pkg from "../../app.json";

const About = (props) => {
  return (
    <ScrollView style={styles.container}>
      <PageHeader {...props} title="عن التطبيق" />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/img/logo.png")} style={styles.logo} />
      </View>
      <Text style={styles.versionText}>إصدار {pkg.expo.version}</Text>
      <Text style={styles.appNameText}>موعد الرواتب</Text>
      <Text style={styles.infoText}>
        يقدم موعد الرواتب بالايام المتبقية عن نزول الرواتب وبشكل مميز وانيق و
        وامكانية تحويل التواريخ
      </Text>
      <TouchableNativeFeedback
        onPress={() => Linking.openURL(`mailto:${EMAIL}`)}
        background={TouchableNativeFeedback.Ripple(Colors.primary, false)}
      >
        <View style={styles.sendMailBtn}>
          <Text style={styles.btnText}>تواصل معنا عبر البريد</Text>
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 20,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    width: "60%",
    height: "100%",
  },
  versionText: {
    fontFamily: "mix-arab-regular",
    fontSize: 28,
    textAlign: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginHorizontal: 20,
  },
  appNameText: {
    fontFamily: "mix-arab-regular",
    fontSize: 40,
    textAlign: "center",
    marginVertical: 40,
  },
  infoText: {
    fontFamily: "mix-arab-regular",
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30,
    marginHorizontal: 20,
  },
  sendMailBtn: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    borderColor: Colors.primary,
    alignItems: "center",
    width: 330,
    marginVertical: 30,
    alignSelf: "center",
  },
  btnText: {
    fontFamily: "mix-arab-regular",
    fontSize: 28,
    color: Colors.primary,
  },

});

export default About;
