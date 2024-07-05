import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";

const MostBooked = ({ navigation }) => {

// https://192.168.0.110:3000/service
  const [service, setService]= useState(null)
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
    <>
      <Text
        style={{
          paddingTop: 20,
          fontSize: 12,
          fontWeight: "bold",
          paddingLeft: 7,
          fontFamily: "OpenSans",
          color: "#eb3b5a",
        }}
      >
        EXPLORE IN
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 7,
            fontFamily: "OpenSans",
          }}
        >
          Our Trending Services
          {/* Most Booked Services */}
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
          width: width * 0.6,
          marginLeft: 7,
          borderRadius: 5,
        }}
      />

     {
        // console.log(service)
     }
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {service!= null &&  service.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 4,
              marginLeft: 4,
              marginTop:10,
              
              
            }}
            onPress={() =>
              navigation.navigate(decode(item.name))
            }
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{
                uri:`https://cureofine.com/upload/service/${item.image}`}}
            />
            <View>
              <Text  allowFontScaling={false} style={{ fontWeight: 600, fontFamily: "OpenSans", fontSize:14 }}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
                                                                                               
    </>
  );
};

export default MostBooked;
