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
  import axios from "axios";
  import { useSelector } from "react-redux";

  const DashboardScreen = ({ navigation }) => {
    const user= useSelector(state => state.user.userInfo? state.user.userInfo:null)
  
    const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number:null);
    const userId = useSelector(state => state.user.userInfo ?state.user.userInfo.id:null);
    console.log("26",user)
    // https://cureofine.com/api/api/
    const [totalAppointment,setAppointment]= useState(0)
    const [totalEmi,setEmi]= useState(0)
    const [totalVideo,setVideo]= useState(0)
    const [totalVoice,setVoice]= useState(0)
    const [totalChat,setChat]= useState(0)

    const dashboards = [
       

        {
            id:1,
            name:"Treatment Appointment",
            img: require("../assets/dashboards/appointment.png"),
            url:"TreatmentScreen"
        },
        // {
        //     id:2,
        //     name:"EMI",
        //     img: require("../assets/dashboards/emi.png"),
        //     url:""
        // },
        {
            id:3,
            name:"Video Consultation",
            img: require("../assets/dashboards/video.png"),
            url:"VideoConsultation"
        },
        {
            id:4,
            name:"Voice Consultation",
            img: require("../assets/dashboards/voice.png"),
            url:"VoiceConsultation"
        },
        {
            id:5,
            name:"Chat Consultation",
            img: require("../assets/dashboards/chat.png"),
            url:"ChatConsultation"
        },
        {
            id:6,
            name:"Your Profile",
            img: require("../assets/dashboards/profile.png"),
            url:"ProfileScreen"
        },


    ] 

    const getTotalAppointment = async()=>{
    
         const res = await axios.get("https://cureofine.com/api/api/totalAppointment",{
            params:{
                mobile:userInfo,
                userId:userId
            }
         })
         console.log(res.data)
         setAppointment(res.data.count)


    }

    const getTotalEmi = async()=>{
    
        const res = await axios.get("https://cureofine.com/api/api/totalEmi",{
           params:{
               mobile:userInfo,
               userId:userId
           }
        })
        console.log(res.data)
        setEmi(res.data.count)


   }

   const getTotalVideo = async()=>{
    
    const res = await axios.get("https://cureofine.com/api/api/totalVideo",{
       params:{
           mobile:userInfo,
           userId:userId
       }
    })
    console.log(res.data)
    setVideo(res.data.count)


}

const getTotalVoice = async()=>{
    
    const res = await axios.get("https://cureofine.com/api/api/totalVoice",{
       params:{
           mobile:userInfo,
           userId:userId
       }
    })
    console.log(res.data)
    setVoice(res.data.count)


}

const getTotalChat = async()=>{
    
    const res = await axios.get("https://cureofine.com/api/api/totalChat",{
       params:{
           mobile:userInfo,
           userId:userId
       }
    })
    console.log(res.data)
    setChat(res.data.count)


}

    useEffect(()=>{
        getTotalAppointment()
        getTotalEmi()
        getTotalVideo()
        getTotalVoice()
        getTotalChat()
    },[])
  

  
  
    return (
      <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50 }}>
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
  
          <Text  allowFontScaling={false} style={{ color: "#103042", padding: 15, fontSize: 18, paddingBottom: 2,textAlign:"center",fontWeight:600 }}>Your Dashboard</Text>

          <Text
          allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "whitesmoke",
              borderWidth: 2,
              marginTop: 15,
            }}
          />


<View style={{ marginTop: 20, paddingBottom: 50, flexDirection:"row" , flexWrap:"wrap",width:Dimensions.get('screen').width, justifyContent:"center"}}>
                 

      <FlatList   
data={dashboards}

      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
renderItem={({ item, index }) => (
<View style={{margin:10,width:170,alignItems:"center",margin:10,padding:10,elevation:3,borderRadius:5}}>

<View style={{width:"100%", alignItems:"center"}}>
<Image style={{width:100,height:100}} source={item.img}/>

</View>
<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:16,marginTop:5,color:"#f08080"}} variant="titleLarge">{item.name == "Treatment Appointment"?totalAppointment:item.name == "EMI"? totalEmi: item.name == "Video Consultation"?totalVideo: item.name == "Voice Consultation"? totalVoice : item.name == "Chat Consultation"?totalChat:null}</Text>

<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:12,marginTop:5}} variant="titleLarge">{item.name}</Text>
{/* {
    item.name!= "Your Profile" && 
} */}


  
               <TouchableOpacity
                    style={{
                      backgroundColor: "#103042",
                      paddingVertical: 10,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 4,
                    }} 
                    onPress={()=>navigation.navigate(item.url)}

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
                      VIEW
                    </Text>
                  </TouchableOpacity>



</View>
)}
  />

                </View>
         
              
       
     
  
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
  
  export default DashboardScreen;
  
  
  
