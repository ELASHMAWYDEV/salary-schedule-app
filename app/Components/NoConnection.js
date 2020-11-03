import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

//Assets
import Colors from "../assets/Colors";

const NoConnection = () => {
  const netInfo = useNetInfo();
  const [visible, setVisible] = useState(
    !(netInfo.isInternetReachable)
  );

  useEffect(() => {
    checkConnection();
  },[netInfo.isInternetReachable]);
  

  const checkConnection = async () => {
    let conn = await netInfo.isConnected && netInfo.isInternetReachable;
    console.log(conn);
    setVisible(!conn);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.promptBox}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>تنبيه</Text>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>
              يبدو أنك غير متصل بالإنترنت ، من فضلك تحقق من اتصالك أولا
            </Text>
          </View>

          <View style={styles.btnsContainer}>
            <TouchableNativeFeedback onPress={checkConnection} useForeground>
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>حسنا</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  promptBox: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 10,
    marginHorizontal: 15,
    overflow: "hidden",
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    fontFamily: "mix-arab-regular",
    fontSize: 26,
    textAlign: "center",
    color: "#EA2027",
  },
  messageContainer: {
    paddingHorizontal: 18,
    marginVertical: 20,
  },
  message: {
    fontFamily: "mix-arab-regular",
    fontSize: 16,
    color: Colors.black,
    lineHeight: 24,
  },
  btnsContainer: {
    flexDirection: "row-reverse",
    flex: 1,
    maxHeight: 60,
    marginTop: "auto",
    borderTopColor: "#535c68",
    borderTopWidth: 0.5,
  },
  btnContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnContainerLeft: {
    borderRightColor: "#535c68",
    borderRightWidth: 0.5,
  },
  okBtnContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontFamily: "mix-arab-regular",
    fontSize: 20,
    color: Colors.black,
  },
  btnNo: {
    color: Colors.red,
  },
});

export default NoConnection;
