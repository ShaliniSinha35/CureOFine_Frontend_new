import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { Card } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";


const Specialization = ({navigation}) => {

  const [specializationList, setSpecialization] = useState([])


  const getSpecialization = async () => {
    const res = await axios.get("https://cureofine.com/api/api/specialization");

    //  console.log(res.data)
    setSpecialization(res.data)



  }

  useEffect(() => {
    getSpecialization()
  }, [])

  // https://cureofine.com/api/api/products

  const specialization = [
    {
      id: 0,
      image: require("../assets/physician.png"),
      name: "General Physician",
    },
    {
      id: 1,
      image: require("../assets/dental.png"),
      name: "Dental",
    },
    {
      id: 2,
      image: require("../assets/ortho.png"),
      name: "Ortho",
    },
  ];

  return (
    <>
      <ImageBackground
        source={require("../assets/bg8.png")}
        style={{
          width: "100%",
          height: "auto",
          resizeMode: "cover",
          marginTop: 15,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            fontSize: 12,
            fontWeight: "bold",
            paddingLeft: 10,
            fontFamily: "OpenSans",
            color: "white",
          }}
        >
          EXPLORE IN
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              paddingLeft: 10,
              fontFamily: "OpenSans",
            }}
          >
            Our Specialization
          </Text>

          <View>
            <FontAwesome
              name="stethoscope"
              size={20}
              color="white"
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


        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          
          
        {  specialization.map((item, index) => (
            <Card
              key={item.id}
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
                  style={{ width: 180, height: 130, resizeMode: "contain" }}
                  resizeMode="contain"
                  source={require("../assets/physician.png")}
                />
              </View>
            </Card>
          ))}
        </ScrollView> */}

        {/* {  console.log("142",specializationList)
           } */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>


          {specializationList.map((item, index) => (

            <Pressable onPress={()=>navigation.navigate("SingleTeam")}>
              <Card
                key={item.id}
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
                    style={{ width: 180, height: 130, resizeMode: "contain" }}
                    resizeMode="contain"
                    source={require("../assets/physician.png")}
                  />
                </View>
              </Card>
            </Pressable>



          ))}

        </ScrollView>




      </ImageBackground>
    </>
  )
}

export default Specialization