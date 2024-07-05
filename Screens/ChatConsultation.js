import {
  View,
  Text
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");;
import Footer from "../Components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from 'moment-timezone';


const ChatConsultation = ({ navigation }) => {
  const [chatBooking, setTotalChatBooking] = useState([])
  // https://cureofine.com/api/api/



  const formatDateToIST = (utcDate) => {
    return moment.utc(utcDate).tz('Asia/Kolkata').format('YYYY-MM-DD hh:mmA');
  };

  const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number : null);

  const userId = useSelector(state => state.user.userInfo ? state.user.userInfo.id : null);


  const gettotalChatBooking = async () => {
    const res = await axios.get("https://cureofine.com/api/api/totalChatData", {
      params: {
        mobile: userInfo,
        userId: userId
      }
    })
    console.log("totalChatBooking", res.data)
    let sortArr = res.data

    sortArr.sort((a, b) => {
      const idComparison = b.id - a.id;
      if (idComparison !== 0) {
        return idComparison;
      }
    });
    setTotalChatBooking(sortArr)

  }
  useEffect(() => {
    gettotalChatBooking()
  }, [])
  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50, flex: 1 }}>
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

        <Text allowFontScaling={false} style={{ color: "#103042", padding: 15, fontSize: 18, paddingBottom: 2, textAlign: "center", fontWeight: 600 }}>Chat Consultation</Text>

        <Text
          style={{
            height: 1,
            borderColor: "whitesmoke",
            borderWidth: 2,
            marginTop: 15,
          }}
        />


        {
          chatBooking.length != 0 ? chatBooking.map((item) => (
            <View style={{ margin: 10, padding: 10, elevation: 0, borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 4, borderColor: "#103042" }}>



              <View style={{ flexDirection: "row" }}>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: "#f08080", fontWeight: 600 }} variant="titleLarge">Registration Date & Time:  </Text>
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, color: "black", fontWeight: 600 }} variant="titleLarge">{formatDateToIST(item.cdate)} </Text>
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
                <Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 12, marginTop: 5, fontWeight: 600 }} variant="titleLarge"> Chat Consultation </Text>

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
    </SafeAreaView>
  )
}

export default ChatConsultation