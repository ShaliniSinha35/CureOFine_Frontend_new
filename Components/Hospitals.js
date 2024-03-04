import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";

const Hospitals = ({navigation}) => {

    const [hospitals, setHospitals]= useState(null)
    const getHospitals = async () => {
      const res = await axios.get("https://cureofine.com/api/api/hospitals");
      const data = res.data;
    
      setHospitals(data)
    
     
  
  };
  
  useEffect(() => {
      getHospitals();
  
  }, []);

    return (
        <>
           <View
        style={{
          backgroundColor: "whitesmoke",
          marginTop: 15,
          paddingTop: 4,
          paddingBottom: 10,
          borderTopRightRadius: 20,
          borderTopEndRadius: 20,
        }}
      >
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
              Our Dedicated Hospitals
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
            {hospitals!= null &&  hospitals.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 4,
                  marginLeft: 4,
                  marginTop:10,
                  elevation:5,
                }}

                onPress={()=>navigation.navigate("HospitalInnerScreen", {id:item.hos_id})}
                // onPress={() =>
                //   navigation.navigate(decode(item.name))
                // }
              >
                <Image
                  style={{ width: 100, height: 120, resizeMode: "contain" }}
                  source={{ uri: `https://cureofine.com/upload/hospital/${item.image}` }}
                />
                <View>
                  <Text  allowFontScaling={false} style={{ fontWeight: 600, fontFamily: "OpenSans", fontSize:14 }}>
                  <RenderHTML  key={item.id} source={{ html: decode(item.name) }}></RenderHTML>
                  </Text>
                </View>
    
              
              </TouchableOpacity>
            ))}
          </ScrollView>
          </View>                                                                                          
        </>
      );
  
}

export default Hospitals