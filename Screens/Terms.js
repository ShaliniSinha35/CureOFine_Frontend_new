import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { decode } from "html-entities";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RenderHtml from 'react-native-render-html'
import { useWindowDimensions } from 'react-native';
import Header from "../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
SplashScreen.preventAutoHideAsync();

const Terms = ({navigation}) => {
  const [cont, setCont] = useState("");
  const { width } = useWindowDimensions();

  const getData = async () => {
    const res = await axios.get("https://cureofine.com/api/api/term");
    const data = res.data;
    // console.log(data[0]);
    setCont(decode(data));
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

  return (
    <SafeAreaView  onLayout={onLayoutRootView} style={{backgroundColor:"white", height:"100%"}}>
      <Header navigation={navigation}></Header>
   <ScrollView>
   <Text  allowFontScaling={false} style={{textAlign:"center", margin:15, fontSize:18, color:"#f08080",borderBottomWidth:2,borderColor:"whitesmoke"}}>Terms & Conditions</Text>

      <View style={{ marginTop: 10, padding: 12 }}>
        {cont.length !== 0 ? (
          cont.map((item) => (
          
            <RenderHtml key={item.id} source= {{html : decode(item.content)}} contentWidth={width} ></RenderHtml>
          ))
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
 
  );
};

export default Terms;
