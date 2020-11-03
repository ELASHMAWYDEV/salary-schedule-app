import React, { useState } from "react";
import { Modal, ActivityIndicator, View } from "react-native";


//Assets
import Colors from "../assets/Colors";


const Loading = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <ActivityIndicator size={60} color={Colors.primary} style />
      </View>
    </Modal>
  );
};


export default Loading;