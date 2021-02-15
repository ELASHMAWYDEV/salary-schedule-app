import { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";
import axios from "axios";

const useNotifications = async () => {
  const [notification, setNotification] = useState(false);
  const [pushToken, setPushToken] = useState("");
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    //Initialization
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    //Get the push notification & send it to the server (if you want)
    (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        setPushToken(token);
        //Send to server
        await axios.post("https://notification-dahsboard.herokuapp.com/addToken", {
          token: pushToken,
          appId: 1,
        });
      } catch (e) {
        console.log(e.message);
      }
    })();

    //Notification Handlers
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log(status);
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("notifications", {
        name: "notifications",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    console.log(token);
    return token;
  };

  return {
    pushToken,
  };
};

export default useNotifications;
