import React, { useEffect, useState, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Constants from "expo-constants";
import axios from "axios";

const NotificationsHook = () => {
  // @ts-ignore
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
        let token = await registerForPushNotificationsAsync();

        //Development only
        if (__DEV__) {
          alert(token);
          token = token.toString();
          console.log(typeof token, token);
        }
        //Send to server
        let response = await axios.post("http://192.168.1.105:5000/addToken", {
          token,
          appId: 1,
        });

        let data = await response.data;

        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    })();

    //Notification Handlers
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        // @ts-ignore
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      // @ts-ignore
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore
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

    return token;
  };

  return <></>;
};

export default NotificationsHook;
