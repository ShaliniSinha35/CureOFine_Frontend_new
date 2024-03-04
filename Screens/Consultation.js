import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { AntDesign } from "@expo/vector-icons";
// import { Card} from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import Specialization from "../Components/Specialization";
const { width } = Dimensions.get("window");
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import Teams from "../Components/Teams";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { Linking } from "react-native";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { Avatar, Button, Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useSelector } from "react-redux";

const Consultation = ({ navigation }) => {
  const userInfo = useSelector(state => state.user.userInfo);
  const DATA = [
    {
      coverImageUri: require("../assets/Banner/consult1.png"),
    },
    {
      coverImageUri: require("../assets/Banner/consult2.png"),
    },
  ];

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.coverImageUri} />
      </View>
    </View>
  );

  const list = [
    {
      id: "0",
      image: require("../assets/video.png"),
      name: "Video Consultation",
      url: "tel:7250446555"
    },
    {
      id: "1",
      image: require("../assets/call.png"),
      name: "Call Consultation",
      url: "tel:7250446555"
    },
    {
      id: "3",
      image: require("../assets/whatsapp.png"),
      name: "Whatsapp Consultation",
      url: "whatsapp://send?text=hello&phone=7250446555"
    },
  ];


  const [doctorList, setDoctorList] = useState([])

  const getDoctorList = async () => {
    const res = await axios.get("https://cureofine.com/api/api/doctorsList")
    const data = res.data;
    setDoctorList(data)
  }

  useEffect(() => {
    getDoctorList()
  }, [])

  const tagsStyles = {

    p: {
      fontSize: 10,
      textAlign: "justify",


    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 60 }}>


      <Header navigation={navigation}></Header>

 
      {
doctorList.length == 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,marginTop:40}}>
  <ActivityIndicator color={"#f08080"} size={"large"} />
</View> :

        <ScrollView >

{/* <View style={styles.container}>
<Carousel
pagination={PaginationLight}
renderItem={renderItem}
data={DATA}
loop
autoplay
/>
</View> */}


<Text
style={{
height: 1,
borderColor: "whitesmoke",
borderWidth: 2,
marginTop: 15,
}}
/>

<Text
style={{
paddingTop: 15,
fontSize: 12,
fontWeight: "bold",
paddingLeft: 7,
fontFamily: "OpenSans",
color: "gray",
}}
>
Connect With Us Anytime, Anywhere!
</Text>

<View style={{ flexDirection: "row", marginTop: 10 }}>
<Text
style={{
  // paddingTop: 10,
  fontSize: 18,
  fontWeight: "bold",
  paddingLeft: 7,
  fontFamily: "OpenSans",
}}
>

Consult Now
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

<Text
style={{
height: 1.5,
borderColor: "#eb3b5a",
borderWidth: 1.5,
marginTop: 10,
width: width * 0.4,
marginLeft: 7,
borderRadius: 5,
}}
/>
{/* <Text
          style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 15,
          }}
      /> */}


<View style={{ marginTop: 20, paddingBottom: 50 }}>

 {

 doctorList.map((item) => (

    <Card key={item.id} style={{ margin: 10, backgroundColor: "white" }} >

      <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
        <Image source={{ uri: `https://cureofine.com/upload/profile/${item.profile_img}` }} style={{ height: 120, width: 108, resizeMode: "cover" }} />

        <View style={{ marginLeft: 8, flexWrap: "wrap" }}>

          <Card.Content>
            <Text  allowFontScaling={false}style={{ fontSize: 12 }}>{item.name}</Text>
            {/* <Text  allowFontScaling={false}variant="bodyMedium" style={{ color: "gray", fontSize: 12 }}>Original Price- Rs {item.price}</Text>
                                      <Text  allowFontScaling={false}variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 12 }}>Offer Price- Rs {item.offer_price}</Text> */}
            <Text  allowFontScaling={false}variant="bodyMedium">Description: </Text>
            <View style={{ textAlign: "center", width: 230, height: 80 }}>
              {item.details != "" && <RenderHTML tagsStyles={tagsStyles} key={item.id} source={{ html: decode(item.details) }}></RenderHTML>}

            </View>


          </Card.Content>

        </View>


      </View>



      <Card.Actions style={{ marginTop: 10 }}>
        <View>
          <Button mode="contained" theme={{ colors: { primary: '#f46b78' } }} onPress={() =>!userInfo?navigation.navigate("Login"):navigation.navigate("BookingScreen", { id: item.doctor_id,name:"Voice Consultation",price:item.voice_fee,cat_id:item.doctor_id,cat_name:"Voice Consultation"})}><Text  allowFontScaling={false}style={{ color: "white", fontSize: 10, justifyContent: "space-between" }}><Feather name="phone-call" size={18} color="white" />  On Call</Text></Button>
          <Text  allowFontScaling={false}style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}> <FontAwesome name="rupee" size={20} color="#103042" />  {item.voice_fee}/-</Text>
        </View>
        <View>
          <Button mode="contained" theme={{ colors: { primary: '#f46b78' } }} onPress={() =>!userInfo?navigation.navigate("Login"):navigation.navigate("BookingScreen", { id: item.doctor_id ,name:"Video Consultation",price:item.video_fee,cat_id:item.doctor_id,cat_name:"Video Consultation"})}><Text  allowFontScaling={false}style={{ color: "white", fontSize: 10 }}><Feather name="video" size={18} color="white" /> Video Call</Text></Button>
          <Text  allowFontScaling={false}style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}> <FontAwesome name="rupee" size={20} color="#103042" />  {item.video_fee}/-</Text>

        </View>
        <View>
          <Button mode="contained" theme={{ colors: { primary: '#f46b78' } }} onPress={() =>!userInfo?navigation.navigate("Login"):navigation.navigate("BookingScreen", { id: item.doctor_id,name:"Chat Consultation",price:item.chat_fee,cat_id:item.doctor_id,cat_name:"Chat Consultation" })}><Text  allowFontScaling={false}style={{ color: "white", fontSize: 10 }}><Ionicons name="chatbubble-ellipses-outline" size={18} color="white" />  On Chat</Text></Button>
          <Text  allowFontScaling={false}style={{ textAlign: "center", marginTop: 10, fontSize: 16 }}> <FontAwesome name="rupee" size={20} color="#103042" />  {item.chat_fee}/-</Text>

        </View>
      </Card.Actions>
    </Card>


  ))

                                    }
</View>



<Text
style={{
height: 1,
borderColor: "#D0D0D0",
borderWidth: 2,
marginTop: 2,
}}
/>



<Contact></Contact>
<Footer></Footer>

</ScrollView>
     
}
             
 
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    marginTop: 1,
  },

  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    overflow: "hidden",
  },
  card: {
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
});

export default Consultation;
{/* <FlatList
data={list}
scrollEnabled={true}
horizontal
showsHorizontalScrollIndicator={false}
renderItem={({ item, index }) => (
<TouchableOpacity
  key={item.id}
  style={{
    margin: 8,
    alignItems: "center",
    marginTop: 10,
    padding: 2,
  }}
  onPress={() => Linking.openURL(item.url)}
>
  <Image
    style={{
      width: 80,
      height: 80,
      resizeMode: "contain",
      backgroundColor: "whitesmoke",
      borderRadius: 50,
      borderWidth: 2,
    }}
    source={item.image}
  />

  <Text
    style={{
      textAlign: "center",
      fontSize: 12,
      fontWeight: "600",
      marginTop: 5,
      fontFamily: "OpenSans",
    }}
  >
    {item?.name}
  </Text>
</TouchableOpacity>
)}
></FlatList> */}

{/* <Specialization navigation={navigation}></Specialization>
<Text
style={{
height: 1,
borderColor: "#D0D0D0",
borderWidth: 2,
marginTop: 15,
}}
/> */}
{/* <Teams navigation={navigation}></Teams> */}
{/* <Text
style={{
height: 1,
borderColor: "#D0D0D0",
borderWidth: 2,
marginTop: 15,
}}
/> */}