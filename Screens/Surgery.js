import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, {useState, useEffect} from "react";
import Carousel, { PaginationLight } from "react-native-x-carousel";
const { width } = Dimensions.get("window");
import { AntDesign } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Components/Header";
import { FontAwesome } from "@expo/vector-icons";
import Teams from "../Components/Teams";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import Specialization from "../Components/Specialization";
import axios from "axios";


const Surgery = ({ navigation }) => {
  const DATA = [
    {
      coverImageUri: require("../assets/surgery1.png"),
    },
  ];

  const [surgeryList, setSurgery]= useState([])

  const getSurgery = async()=>{
    const res = await axios.get("https://cureofine.com/api/api/surgery");
    const data = res.data;
    setSurgery(data)
  }

  useEffect(()=>{
    getSurgery()
  },[])

  const list = [
    {
      id: "0",
      image: require("../assets/surgeryImg.png"),
      name: "Piles",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam.",
      carouselImages:[
        require("../assets/surgeryImg.png"),
        require("../assets/surgeryImg.png"),
        require("../assets/surgeryImg.png"),
      ]
    },
    {
      id: "1",
      image: require("../assets/surgeryImg.png"),
      name: "Irofuct",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam.",
      carouselImages:[
        require("../assets/surgeryImg.png"),
        require("../assets/surgeryImg.png"),
        require("../assets/surgeryImg.png"),
      ]
    },
    {
      id: "2",
      image: require("../assets/surgeryImg.png"),
      name: "Ohysio",
      desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam.",
      carouselImages:[
        require("../assets/surgeryImg.png"),
        require("../assets/surgeryImg.png"),
        require("../assets/surgeryImg.png"),
      ]
    },
  ];

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.coverImageUri} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "white",paddingBottom:60 }}>
     <Header navigation={navigation}></Header>

      <ScrollView>
        <View style={styles.container}>
          <Carousel
            pagination={PaginationLight}
            renderItem={renderItem}
            data={DATA}
            loop
            autoplay
          />
        </View>
       

        <Text
        style={{
          paddingTop: 10,
          fontSize: 12,
          fontWeight: "bold",
          paddingLeft: 7,
          fontFamily: "OpenSans",
          color: "gray",
        }}
      >
      Schedule Your Surgery Appointment in Seconds!
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
         
       Book Your Appointment 
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
          width: width * 0.7,
          marginLeft: 7,
          borderRadius: 5,
        }}
      />

  



<ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {surgeryList.map((item, index) => (

                <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate("SurgeryInfo", {
                  id: item.id,
                  name: item.name,
                  carouselImages:[ require("../assets/surgeryImg.png"), require("../assets/surgeryImg.png"), require("../assets/surgeryImg.png")],
                  desc:item.description,
                  item: item,
                
                }
                )}>
               <Card
                
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                
                >
                  <Card.Title style={{ fontSize: 15 }}>{item.name}</Card.Title>

                  <Card.Divider />
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={{ width: 180, height: 150, resizeMode: "contain" }}
                      resizeMode="contain"
                      source={ require("../assets/surgeryImg.png")}
                    />
                  </View>
                </Card>
                </TouchableOpacity>
               
              ))}
            </ScrollView>

            <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 2,
          marginTop: 15,
        }}
      />

      <Specialization navigation={navigation}></Specialization>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 2,
          marginTop: 15,
        }}
      />

      <Teams navigation={navigation}></Teams>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 2,
          marginTop: 15,
        }}
      />
      <Contact></Contact>
      <Footer></Footer>
      </ScrollView>



    </SafeAreaView>
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

export default Surgery;
