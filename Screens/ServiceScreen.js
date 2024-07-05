import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import Services from "../Components/Services";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import Teams from "../Components/Teams";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import Products from "../Components/Products";
import Deals from "../Components/Deals";
import MostBooked from "../Components/MostBooked";
import axios from "axios";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import HomeBanner from "./HomeBanner";
import OfferBanner from "./OfferBanner";
const ServiceScreen = ({ navigation }) => {
  const list = [
    {
      id: "0",
      image: require("../assets/Services/cs1.png"),
      name: "Doctor Consultation",
      url: "Consultation",

    },
    {
      id: "1",
      image: require("../assets/Services/cs2.png"),
      name: "Surgery Appointment",
      url: "SurgeryList",
    },

    {
      id: "2",
      image: require("../assets/Services/cs4.png"),
      name: "Physiotherapy At Home",
      url: "Physiotherapy",
    },



  ];

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image style={styles.card} source={data.coverImageUri} />
      </View>
    </View>
  );

  const DATA = [
    {
      coverImageUri: require("../assets/Banner/cbanner1.png"),
    },
    {
      coverImageUri: require("../assets/Banner/cbanner2.png"),
    },
  ];

  const DATA1 = [
    {
      coverImageUri: require("../assets/physiotherapy.png"),
    },
    {
      coverImageUri: require("../assets/surgery1.png"),
    },
  ];

  // https://cureofine.com/api/api/

  const [service, setService] = useState(null)
  const getService = async () => {
    const res = await axios.get("https://cureofine.com/api/api/service");
    const data = res.data;

    setService(data)



  };

  useEffect(() => {
    getService();

  }, []);

  const tagsStyles = {

    h5: {
      fontSize: 15,
      textAlign: "justify",


    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50 }}>
      <Header navigation={navigation}></Header>

      <ScrollView style={{ backgroundColor: "white" }}>
        <Text
          style={{
            height: 1,
            borderColor: "whitesmoke",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        <Text allowFontScaling={false} style={{ color: "black", padding: 15, fontSize: 15, paddingBottom: 2 }}>Elevate Your Healthcare Experience -</Text>
        <Text allowFontScaling={false} style={{ color: "#eb3b5a", paddingLeft: 12, fontSize: 12 }}> Explore a Range of Premium Medical Services on our App.</Text>
        <Text
          style={{
            height: 1,
            borderColor: "whitesmoke",
            borderWidth: 2,
            marginTop: 15,
          }}
        />
        {/* <ImageBackground
          source={require("../assets/bg6.jpg")}
          style={{
            width: "100%",
            resizeMode: "cover",
            marginTop: 1,
            opacity: 0.9,
            height:"auto"
          
          }}
        > */}
        {/* <FlatList
            data={list}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
           
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  margin: 8,
                  alignItems: "center",
                  marginTop: 10,
                  padding: 2,
                }}
                onPress={() => navigation.navigate(item.url, {
                  id: item.id,
                  name: item.name,
                  carouselImages: item.carouselImages,
                  item: item,
                })}
              >
                <Image
                  style={{
                    width: 85,
                    height: 85,
                    resizeMode: "contain",
                    backgroundColor: "whitesmoke",
                    borderRadius: 70,
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

        <FlatList
          data={service}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-between",
          }}
          style={{ margin: 10 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id}
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: 4,
                marginLeft: 4,
                marginTop: 10,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate(decode(item.name))
              }
            >
              <Image
                style={{ width: 100, height: 120, resizeMode: "contain" }}
                source={{
                  uri: `https://cureofine.com/upload/service/${item.image}`
                }}
              />
              <View>
                <Text allowFontScaling={false} style={{ fontWeight: 600, fontFamily: "OpenSans", fontSize: 14 }}>
                  <RenderHTML tagsStyles={tagsStyles} key={item.id} source={{ html: decode(item.name) }}></RenderHTML>
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#103042",
                  paddingVertical: 3,
                  width: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 7,
                  borderRadius: 2,
                  // position: "absolute",
                  // top: 0,
                  // left: 0,
                  paddingHorizontal: 8,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  VIEW MORE
                </Text>
              </View>
            </TouchableOpacity>)}>

        </FlatList>

        {/* </ImageBackground> */}


        {/* banner slider start */}
        {/* <View style={styles.container}>
          <Carousel
            pagination={PaginationLight}
            renderItem={renderItem}
            data={DATA1}
            loop
            autoplay
          />
        </View> */}
        {/* <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 5,
            marginBottom:10
          }}
        />
        <HomeBanner></HomeBanner> */}

        {/* banner slider end */}



        {/* <Deals navigation={navigation}></Deals> */}
        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 5,
          }}
        />

        <Teams navigation={navigation}></Teams>

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
            marginBottom: 10,
          }}
        />

        {/* banner slider start */}
        {/* <View style={styles.container}>
          <Carousel
            pagination={PaginationLight}
            renderItem={renderItem}
            data={DATA}
            loop
            autoplay
          />
        </View> */}
        <OfferBanner></OfferBanner>
        {/* banner slider end */}

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 10,
          }}
        />
        <Contact></Contact>
        {/* <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        /> */}

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
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
    // width: width,
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

export default ServiceScreen;



// $servername = "localhost";
// $username = "mclinpll_cureofine_new_u";
// $password = "3{Mg~G39W8MK";
// $dbname = "mclinpll_cureofine_new";