import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";
import {decode} from 'html-entities';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html'
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";


const Faq = ({navigation}) => {
  const { width } = useWindowDimensions();
  const [source1,setSource]= useState("");


  const [cont, setCont] = useState("");

  const getData = async () => {
   const res= await axios.get("https://cureofine.com/api/api/faq");
   const data= res.data;
  //  console.log(data[0])
   setCont(decode(data))


 

   
  };

  useEffect(() => {
    getData();
  },[]);


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
    <SafeAreaView  onLayout={onLayoutRootView} style={{backgroundColor:"white",height:"100%"}}>
      <Header navigation={navigation}></Header>
  <ScrollView >
      <Text  allowFontScaling={false} style={{textAlign:"center", margin:15, fontSize:18, color:"#f08080",borderBottomWidth:2,borderColor:"whitesmoke"}}>Frequently Asked Questions</Text>
     {/* {cont.length!=0 && <Text>{cont.content}</Text>} */}

     <View style={{ marginTop: 10, padding: 12 }}>
        {cont.length !== 0 ? (
          cont.map((item) => (
    
            <RenderHtml key={item.id}  source={{html : decode(item.content)}} contentWidth={width} ></RenderHtml>  
        
          ))
        ) : (
          <></>
        )}
      </View>


    
 
    </ScrollView>
    </SafeAreaView>
  
  );
}

export default Faq