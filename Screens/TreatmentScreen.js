import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Linking,
    Alert
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
  import axios from "axios";
  import { useSelector } from "react-redux";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import BookingAlert from "../Components/BookingAlert";

const TreatmentScreen = ({navigation}) => {

  

  const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number:null);

    const userId = useSelector(state => state.user.userInfo ?state.user.userInfo.id:null);
    console.log("28",userId)
    const [treatments,setTreatments]= useState([])
    const[city,setCity]= useState(null)
    const [name,setName]= useState(null)
    const [mobile,setMobile]= useState(null)
    const [paymentResult, setPaymentResult] = useState(null);
    const [visible,setVisible]= useState(false)
    // https://cureofine.com/api/api/
    const getAllTreatmentList = async()=>{
      const city = JSON.parse(await AsyncStorage.getItem("user"));
      console.log("38",city)
      setCity(city)
      try{
        const res = await axios.get("https://cureofine.com/api/api/treatmentList",{
          params:{
            mobile:userInfo,
            userId:userId
          }
        })
     
        const data= res.data
        // console.log(data)
        let sortArr=data

        sortArr.sort((a, b) => {
          const idA = parseInt(a.booking_id.replace(/[^0-9]/g, ''), 10);
          const idB = parseInt(b.booking_id.replace(/[^0-9]/g, ''), 10);
          return idB - idA;
        });
    
     console.log(sortArr[0])
        setTreatments(sortArr);
       
        setName(data[0].name)
        setMobile(data[0].mobile)
      }
      catch(err){
        console.log(err)
      }
    }


    useEffect(()=>{
      getAllTreatmentList()
    },[])

    const handlePayment = async (amount, bookingId,book_type) => {
      const transactionId = "T" + Date.now();
      const MUID = "MUID" + Date.now();
    
    
    
      try {
        const paymentResponse = await axios.post('https://cureofine.com/api/api/api/payment', {
          transactionId: transactionId,
          MUID: MUID,
          name: name,
          mobile: mobile,
          amount: amount
        });
    
        console.log("Payment Response:", paymentResponse);
    
        if (paymentResponse.status === 200) {
          console.log("119",paymentResponse.data.message,paymentResponse.data.result);

          if (paymentResponse.data.result) {
              setPaymentResult(paymentResponse.data.result);
              const tId = paymentResponse.data.transactionId;
              const mId = paymentResponse.data.merchantId;
              console.log(tId)
              console.log(mId)
          
           const res1 = await Linking.openURL(paymentResponse.data.result);
         
           navigation.navigate("Home");

           const intervalId = setInterval(async () => {
              try {
                const statusResponse = await axios.post(`https://cureofine.com/api/api/api/status/${tId}`);
    
                console.log("Payment Status:", statusResponse.data);
    
                // if (statusResponse.data.status == "success") {
                //   // Payment successful, navigate to the next screen
                //   clearInterval(intervalId); // Stop the interval

                //      try{

                //       const updateRes = await axios.post("https://cureofine.com/api/api/updatePaymentTransactionSuccess", {
                        
                //           phone: userInfo,
                //           transaction_id: tId,
                //           user_id: userId,
                //           booking_id:bookingId,
                //           opd_transaction_id: tId,
                //           opd_payment_status: 1,
                //           payment_status:1
                //       });

                //       console.log(updateRes.data.message)
                        
                //      }
                //      catch(err){
                //            console.log(err)
                //      }
                //   navigation.navigate("Home");
                //   Alert.alert("Payment Status:", statusResponse.data.status)
                // } else if (statusResponse.data.status == "failure") {
                //   // Payment failed, navigate to the failure screen
                //   clearInterval(intervalId); // Stop the interval
                //   try{

                //       const updateRes = await axios.post("https://cureofine.com/api/api/updatePaymentTransactionFailure", {
                        
                //       phone: userInfo,
                //       transaction_id: tId,
                //       user_id: userId,
                //       booking_id:bookingId,
                //       opd_transaction_id: tId,
                //       opd_payment_status: 0,
                //       payment_status:0
                        
                //       });

                //       console.log(updateRes.data.message)
                        
                //      }
                //      catch(err){
                //            console.log(err)
                //      }
                //   navigation.navigate("Home");
                //   Alert.alert("Payment Status:", statusResponse.data.status)
                // }
              } catch (error) {
                console.error("Error checking payment status:", error);
              }
            }, 5000); // Check every 5 
            }
       

      }


      } catch (error) {
        Alert.alert("Payment API network error")
        console.error("Payment API network error:", error.message);
      }
    };
    
  
    return (
      <SafeAreaView style={{ backgroundColor: "white",flex:1 }}>
        <Header navigation={navigation}></Header>
  
        <ScrollView style={{ backgroundColor: "white" }}>
          <Text
            allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
  
          <Text  allowFontScaling={false} style={{ color: "#103042", padding: 15, fontSize: 18, paddingBottom: 2,textAlign:"center",fontWeight:600 }}>Your Appointments</Text>

          <Text
            allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 15,
            }}
          />


{
  treatments.length!=0 ?

  treatments.map((item)=>(
    <View style={{margin:10,padding:10,elevation:0,borderRadius:5,paddingHorizontal:20,paddingVertical:10,borderWidth:4,borderColor:"#103042"}}>


<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,color:"#f08080",fontWeight:600}} variant="titleLarge">Booking ID:  </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,color:"black",fontWeight:600}} variant="titleLarge">{item.booking_id}  </Text>
</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080"}} variant="titleLarge">Service Type: </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge">{item.book_type} </Text>


</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Service: </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge">{item.service_name} </Text>

</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
<View style={{flexDirection:"row",flexWrap:"wrap"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",flexWrap:"wrap"}} variant="titleLarge">Hospital: </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} numberOfLines={2} variant="titleLarge">{item.hospital_name} </Text>

</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">City: </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge">{city}</Text>
</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />

<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">OPD Date & Time:  </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge">{item.opd_date} {item.opd_time} </Text>

</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Service Charge: </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> Rs {item.opd} </Text>

</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
<View style={{flexDirection:"row"}}>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600,color:"#f08080",}} variant="titleLarge">Booking Status:  </Text>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5,fontWeight:600}} variant="titleLarge"> {item.payment_status || item.opd_payment_status ? "Paid" : "Pending"} </Text>


</View>
<Text
  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 10,
            }}
          />
    
    
    <View style={{width:width * 0.8,alignItems:"center",marginTop:5}}>
   
    {item.payment_status || item.opd_payment_status ? 
      <TouchableOpacity                                       
      style={{
        backgroundColor: "green",
        paddingVertical: 10,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 4,
      }} 
     
   

    >
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
        }}
      >
Payment Completed
      </Text>
    </TouchableOpacity>
    
  :
  <TouchableOpacity
  style={{
    backgroundColor: "green",
    paddingVertical: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 4,
  }} 
  onPress={()=>handlePayment(item.opd,item.booking_id,item.book_type)}


>
  <Text
    allowFontScaling={false}
    style={{
      textAlign: "center",
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    }}
  >
Pay for OPD
  </Text>
</TouchableOpacity>
  }


                    
    </View>
      
                   
                   
                      
    
    
    
    </View> 
  ))
  :
  <View style={{height:600, alignItems:"center",paddingTop:50}}>
  <Text>No Booking</Text>
</View>
}





         

     
  
          {/* <Footer></Footer> */}
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


export default TreatmentScreen