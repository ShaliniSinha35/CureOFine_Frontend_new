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
import Header from "../Components/Header";
import Teams from "../Components/Teams";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment-timezone';

const VoiceConsultation = ({ navigation }) => {

  const [voiceBooking, setTotalVoiceBooking] = useState([])
  // https://cureofine.com/api/api/

  const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number : null);

  const userId = useSelector(state => state.user.userInfo ? state.user.userInfo.id : null);
  const formatDateToIST = (utcDate) => {
    return moment.utc(utcDate).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mmA');
  };

  const gettotalVoiceBooking = async () => {
    const res = await axios.get("https://cureofine.com/api/api/totalVoiceData", {
      params: {
        mobile: userInfo,
        userId: userId
      }
    })
    console.log("totalVoiceBooking", res.data)
    let sortArr = res.data

    sortArr.sort((a, b) => {
      const idComparison = b.id - a.id;
      if (idComparison !== 0) {
        return idComparison;
      }
    });

    setTotalVoiceBooking(sortArr)

  }
  useEffect(() => {
    gettotalVoiceBooking()
  }, [])
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
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

        <Text allowFontScaling={false} style={{ color: "#103042", padding: 15, fontSize: 18, paddingBottom: 2, textAlign: "center", fontWeight: 600 }}>Voice Consultation</Text>

        <Text
          style={{
            height: 1,
            borderColor: "whitesmoke",
            borderWidth: 2,
            marginTop: 15,
          }}
        />
     

        {
          voiceBooking.length != 0 ? voiceBooking.map((item) => (
            <View style={{ margin: 10, padding: 10, elevation: 0, borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 4, borderColor: "#103042" }}>



              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: "#f08080", fontWeight: 600 }} variant="titleLarge">Registration Date & Time:  </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: "black", fontWeight: 600 }} variant="titleLarge">{formatDateToIST(item.cdate)}  </Text>
              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: "#f08080", fontWeight: 600 }} variant="titleLarge">Booking ID:  </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: "black", fontWeight: 600 }} variant="titleLarge">CUR000{item.id}  </Text>
              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge">Service: </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> Voice Consultation </Text>

              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080" }} variant="titleLarge">Doctor Name: </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> {item.doctor_name} </Text>


              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />



              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge"> Appointment Date :  </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge">{item.app_date} </Text>

              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge">Service Charge: </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> Rs {item.amount} </Text>

              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge">Booking Status:  </Text>
            
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 800, color: "green" }} variant="titleLarge"> {item.status ? "Paid" : "Pending"} </Text>


              </View>
              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />





              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge">Action: </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> </Text>

              </View>

              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge">Prescription: </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> </Text>

              </View>

              <Text
                style={{
                  height: 1,
                  borderColor: "whitesmoke",
                  borderWidth: 2,
                  marginTop: 10,
                }}
              />

              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600, color: "#f08080", }} variant="titleLarge">Invoice: </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> </Text>

              </View>


            </View>
          ))
            :
            <View style={{ height: 600, alignItems: "center", paddingTop: 50 }}>
              <Text>No Booking</Text>
            </View>
        }


        {/* <Footer></Footer> */}



      </ScrollView>
    </View>
  )
}

export default VoiceConsultation