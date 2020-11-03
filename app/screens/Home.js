import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, BackHandler, Platform } from "react-native";
import { WebView } from "react-native-webview";

import { SALARY_URL } from "../../config";

//Admob
import { AdMobInterstitial, AdMobBanner } from "expo-ads-admob";

//Components
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import NoConnection from "../Components/NoConnection";

//Config
import {
  BANNER_TEST_ID_IOS,
  BANNER_TEST_ID_ANDROID,
  BANNER_UNIT_ID_ANDROID,
  BANNER_UNIT_ID_IOS,
  INTERSTITIAL_TEST_ID_IOS,
  INTERSTITIAL_TEST_ID_ANDROID,
  INTERSTITIAL_UNIT_ID_ANDROID,
  INTERSTITIAL_UNIT_ID_IOS,
} from "../../config";

const Home = (props) => {
  const webView = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(`${SALARY_URL}?t=${Date.now()}`);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackBtn); //handle back btn press

    setTimeout(displayInterstitial, 11000); //Display interstitial add after 11 sec

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackBtn);
    };
  }, []);

  const displayInterstitial = async () => {
    try {
      await AdMobInterstitial.setAdUnitID(
        __DEV__
          ? Platform.OS === "ios" //in development
            ? INTERSTITIAL_TEST_ID_IOS
            : INTERSTITIAL_TEST_ID_ANDROID
          : Platform.OS === "ios" //in production
          ? INTERSTITIAL_UNIT_ID_IOS
          : INTERSTITIAL_UNIT_ID_ANDROID
      );
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleBackBtn = () => {
    if (webView.current.canGoBack) {
      webView.current.goBack();
      return true;
    }
  };

  const reloadWebView = () => {
    setUrl(`${SALARY_URL}?t=${Date.now()}`);
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <NoConnection />
      <Header {...props} reloadWebView={() => reloadWebView()} />
      <WebView
        ref={webView}
        source={{
          uri: url,
        }}
        style={styles.webView}
        onLoad={() => setIsLoading(false)}
        allowsBackForwardNavigationGestures
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webView: {
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default Home;
