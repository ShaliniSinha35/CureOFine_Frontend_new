import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import axios from "axios";

const Teams = ({ navigation }) => {

  const teams = [
    {
      id: 0,
      name: "Dr Nancy",
      occupation: "General Physician",
      image: require("../assets/team1.jpg"),
    },
    {
      id: 1,
      name: "Dr Nancy",
      occupation: "General Physician",
      image: require("../assets/team1.jpg"),
    },
    {
      id: 2,
      name: "Dr Nancy",
      occupation: "General Physician",
      image: require("../assets/team1.jpg"),
    },
    {
      id: 3,
      name: "Dr Nancy",
      occupation: "General Physician",
      image: require("../assets/team1.jpg"),
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



  return (
    <>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 15,
          paddingTop: 4,
          paddingBottom: 10,
          borderTopRightRadius: 20,
          borderTopEndRadius: 20,
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            fontSize: 12,
            fontWeight: "bold",
            paddingLeft: 7,
            fontFamily: "OpenSans",
            color: "#eb3b5a",
          }}
        >
          MEET OUR EXPERIENCED TEAM
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
            Our Dedicated Doctors Team
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
            width: width * 0.5,
            marginLeft: 7,
            borderRadius: 5,
          }}
        />



        {
          doctorList.length == 0 ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator color={"#f08080"} size={"large"} />
            </View> :

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {doctorList.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    margin: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  
                  }}
                  // onPress={() => navigation.navigate("Doctor Consultation")}
                  onPress={()=>navigation.navigate("DoctorInnerScreen", {id:item.doctor_id})}

                >
                  <Image
                    style={{
                      width: 95,
                      height: 95,
                      resizeMode: "contain",
                       borderRadius:20
                    }}
                    source={{ uri: `https://cureofine.com/upload/profile/${item.profile_img}` }}
                  />

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "600",
                      marginTop: 5,
                      fontFamily: "OpenSans",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "600",
                      marginTop: 5,
                      fontFamily: "OpenSans",
                      color: "#f08080",
                    }}
                  >
                    {/* {item.occupation} */}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
        }


        <TouchableOpacity
          style={{
            backgroundColor: "#103042",
            paddingVertical: 3,
            width: "auto",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
            borderRadius: 2,
            position: "absolute",
            top: 0,
            right: 5,
            paddingHorizontal: 8,
          }}
          onPress={()=>navigation.navigate("Doctor Consultation")}

        >

          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            SEE ALL
          </Text>
        </TouchableOpacity>

      </View>
    </>
  )
}

export default Teams;