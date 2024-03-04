import {
  View,
  Text,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { decode } from "html-entities";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import Specialization from "../Components/Specialization";
import Header from "../Components/Header";
import Teams from "../Components/Teams";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import RenderHtml from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html";
import CallBanner from "../Components/CallBanner"
import OfferBanner from "./OfferBanner";
import fetchJsonp from "fetch-jsonp"
SplashScreen.preventAutoHideAsync();

const AboutScreen = ({ navigation }) => {

// https://cureofine-azff.onrender.com
  const [cont, setCont] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("https://cureofine.com/api/api/about");
    
      const data = res.data
      // / console.log(res.data[0]);/
      setCont(decode(data));
    } catch (error) {
      console.error("Error fetching data:", error);
      
    }
  };


  useEffect(() => {
    getData();
  }, []);

  const [fontsLoaded] = useFonts({
    EB: require("../assets/fonts/EBGaramond-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const DATA = [
    {
      coverImageUri: require("../assets/Banner/cbanner1.png"),
    },
    {
      coverImageUri: require("../assets/Banner/cbanner2.png"),
    },
  ];

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.coverImageUri} />
      </View>
    </View>
  );

  const tagsStyles = {

    p: {
      fontSize: 14,
      textAlign: "justify",
      margin: 5,
      color: "gray"
    }
  };

  return (
    <SafeAreaView onLayout={onLayoutRootView} style={{ backgroundColor: "white", height: "100%" }}>
      <Header navigation={navigation}></Header>
      <ScrollView
        onLayout={onLayoutRootView}
        style={{ backgroundColor: "white" }}
      >
        {/* <View style={styles.container}>
          <Carousel
            pagination={PaginationLight}
            renderItem={renderItem}
            data={DATA}
            loop
            autoplay
          />
        </View> */}
       

           <Text  allowFontScaling={false}
          style={{
            paddingTop: 10,
            fontSize: 12,
            fontWeight: "bold",
            paddingLeft: 10,
            fontFamily: "OpenSans",
            color: "#eb3b5a",
          }}
        >
          INTRODUCING
        </Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
             <Text  allowFontScaling={false}
            style={{
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 10,
              fontFamily: "OpenSans",
            }}
          >
            About Cure O Fine
          </Text>

          <View>
            <FontAwesome
              name="stethoscope"
              size={20}
              color="#f08080"
              style={{ marginLeft: 7, marginTop: -2 }}
            />
          </View>
        </View>

           <Text  allowFontScaling={false}
          style={{
            height: 1.5,
            borderColor: "#eb3b5a",
            borderWidth: 1.5,
            marginTop: 10,
            width: width * 0.6,
            marginLeft: 7,
            borderRadius: 5,
          }}
        />

        <View style={{ padding: 10 }}>
          {cont.length !== 0 ? (
            cont.map((item) => (
              //    <Text  allowFontScaling={false} key={item.id} style={{ textAlign: "justify", fontFamily: "EB" }}>{decode(item.content)}</Text>

              <RenderHtml
                key={item.id}
                source={{ html: decode(item.content) }}
                contentWidth={width}
                tagsStyles={tagsStyles}
              ></RenderHtml>
            ))
          ) : (
            <></>
          )}

        </View>
           <Text  allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
            marginBottom: 15,
          }}
        />

<OfferBanner></OfferBanner>
   <Text  allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />
        <Teams navigation={navigation}></Teams>
           <Text  allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        {/* <ImageBackground
          source={require("../assets/cure.jpg")}
          style={{
            width: "100%",
            height: 200,
            resizeMode: "cover",
            marginTop: 15,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
               <Text  allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 26, color: "white" }}>
              Need a Doctor for Checkup?
            </Text>
               <Text  allowFontScaling={false} style={{ fontWeight: "bold", color: "white" }}>
              Just make an Appointment & You're Done!
            </Text>
            <TouchableOpacity style={styles.button}>
                 <Text  allowFontScaling={false}
                style={{
                  textAlign: "center",
                  color: "#f08080",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Explore Services
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground> */}
        <CallBanner></CallBanner>

           <Text  allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />
        <Contact></Contact>

           <Text  allowFontScaling={false}
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Footer></Footer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    marginTop: 1,
  },

  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    // borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    // width: width * 0.9,
    height: width * 0.5,
    width: width,
    resizeMode: "contain",
  },

  imgContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 200,
    color: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    borderColor: "#f08080",
    borderWidth: 2,
    marginTop: 18,
  },
});

export default AboutScreen;
