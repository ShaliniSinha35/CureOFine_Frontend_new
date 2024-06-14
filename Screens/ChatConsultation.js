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

const ChatConsultation = ({navigation}) => {
  const [chatBooking,setTotalChatBooking]= useState([])
    // https://cureofine.com/api/api/
 




    const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number:null);

    const userId = useSelector(state => state.user.userInfo ?state.user.userInfo.id:null);

  
const gettotalChatBooking = async()=>{
  const res= await axios.get("https://cureofine.com/api/api/totalChatData",{
    params:{
      mobile:userInfo,
      userId:userId
    }
  })
  console.log("totalChatBooking",res.data)
  setTotalChatBooking(res.data)

}
useEffect(()=>{
  gettotalChatBooking()
},[])
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
  
          <Text  allowFontScaling={false} style={{ color: "#103042", padding: 15, fontSize: 18, paddingBottom: 2,textAlign:"center",fontWeight:600 }}>Chat Consultation</Text>

          <Text
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 15,
            }}
          />


          {
            chatBooking.length!= 0 ?    chatBooking.map((item)=>(
              <View style={{margin:10,padding:10,elevation:0,borderRadius:5,paddingHorizontal:20,paddingVertical:10,borderWidth:4,borderColor:"#103042"}}>



<View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,color:"#f08080",fontWeight:600}} variant="titleLarge">Registration Date & Time:  </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,color:"black",fontWeight:600}} variant="titleLarge">{item.cdate}  </Text>
              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
              <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,color:"#f08080",fontWeight:600}} variant="titleLarge">Booking ID:  </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,color:"black",fontWeight:600}} variant="titleLarge">{item.booking_id}  </Text>
              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
           
              <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Service: </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> {item.service_name} </Text>
              
              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
             
             <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080"}} variant="titleLarge">Doctor Name: </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> {item.doctor_name} </Text>
              
              
              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
           
             
              
              <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge"> Appointment Date & Time:  </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge">{item.service_date} {item.service_time} </Text>
              
              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
              <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Service Charge: </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> Rs {item.amount} </Text>

              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
              <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Booking Status:  </Text>
              {console.log(item.payment_status)}
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:800,color:"green"}} variant="titleLarge"> {item.payment_status ? "Paid" : "Pending"} </Text>
              
              
              </View>
              <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />
                  
                  
            
                    
                                 
                  <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Action: </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> </Text>

              </View>   

               <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />

<View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Prescription: </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> </Text>

              </View>   

                         <Text
                          style={{
                            height: 1,
                            borderColor: "whitesmoke",
                            borderWidth: 2,
                            marginTop: 10,
                          }}
                        />        
                                    
                                    <View style={{flexDirection:"row"}}>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Invoice: </Text>
              <Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> </Text>

              </View>   
                  
                  
                  </View> 
            ))
            :
            <View style={{height:450, alignItems:"center",justifyContent:"center"}}>
               <Text>No Booking</Text>
            </View>
        
          }

  
          <Footer></Footer>
        </ScrollView>
      </SafeAreaView>
  )
}

export default ChatConsultation