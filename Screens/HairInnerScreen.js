import {
    View,
    ScrollView,
    Image,
    ImageBackground,
    Pressable,
  
 
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "native-base";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from "react-redux";
SplashScreen.preventAutoHideAsync();


const HairInnerScreen = ({ navigation}) => {

  const route = useRoute();
  const userInfo = useSelector(state => state.user.userInfo);
      const [hospitals,setHospitals] = useState("")
      const [surgery, setSurgery] = useState("")
      const [facility,setFacility] = useState("")

       const getSurgeryList= async()=>{
        //  const res = await axios.get("https://cureofine.com/api/api/hospitals")
        //  const data= res.data;
        const locationId = JSON.parse(await AsyncStorage.getItem("locationId"));
        console.log("locationId",locationId)
        const res= await axios.get("https://cureofine.com/api/api/hairList")
        const data = res.data
        //  console.log(route.params.id)
         let newArr= await data.filter((item)=>{ return item.category == route.params.id && item.hair_location == locationId})
        //  console.log("newarr",newArr)
        setSurgery(newArr)
        let facArr = JSON.parse(newArr[0].facility_type)
        // console.log("69",facArr.length)
        getFacility(facArr)

      
        //  setHospitals(newArr)
       }

       useEffect(()=>{
        getSurgeryList()
       },[])


     

//        const getSurgeryHospital = async(id)=>{
//         const res= await axios.get("https://cureofine.com/api/api/hospitals")
//         const data = res.data
//         let newArr= await data.filter((item)=>{ return item.hos_id == id})
//         let facArr = JSON.parse(newArr[0].facility_type)
//         console.log("69",facArr.length)
//          getFacility(facArr)

//         // console.log("newarr",newArr)
//        setHospitals(newArr)
//    }
//    useEffect(() => {    
//    surgery!= "" && surgery.map((item) => {
//       getSurgeryHospital(item.hospital);
//     });
//     }, [surgery]);

   const getFacility = async(facArr)=>{
    const res= await axios.get("https://cureofine.com/api/api/facilityType")
    const data = res.data
    let facArr1 = []
    for (let i = 0; i < facArr.length; i++) {
        facArr1.push(await data.filter((item) => { return item.fac_id == facArr[i] }))
    }
       
    setFacility(facArr1)

   }
       
    
    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
        <Header navigation={navigation}></Header>
        <ScrollView>

            <Text
                style={{
                    height: 1,
                    borderColor: "whitesmoke",
                    borderWidth: 2,
                    marginTop: 15,
                }}
            />

            <Text  allowFontScaling={false} style={{ color: "black", padding: 15, fontSize: 15, paddingBottom: 2 }}>Elevate Your Healthcare Experience -</Text>
            <Text  allowFontScaling={false} style={{ color: "#eb3b5a", paddingLeft: 12, fontSize: 12 }}> Explore a Range of Premium Medical Services on our App.</Text>
            <Text
                style={{
                    height: 1,
                    borderColor: "whitesmoke",
                    borderWidth: 2,
                    marginTop: 15,
                }}
            />


            <View style={{ marginTop: 20, paddingBottom: 50 }}>
                {
                    surgery == "" ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            {/* <ActivityIndicator color={"#f08080"} size={"large"} /> */}
                            <Text  allowFontScaling={false} style={{fontSize:20, color:"#103042",fontWight:500}}>Hospitals</Text>
                        </View> :

<View style={{ flex: 1 }}>
<Text  allowFontScaling={false} style={{fontSize:18, color:"#103042",fontWight:500,marginLeft:20}}>{route.params.name} Hospitals</Text>
                        {surgery.map((item) => (
                           

                            <Card key={item.id} style={{ margin: 10, backgroundColor: "white" }}  >



                                <View style={{ flexDirection: "row", width: "100%" }}>
                                    <Image source={{ uri: `https://cureofine.com/upload/hospital/${item.hospital_image}` }} style={{ height: 120, width: 120, resizeMode: "cover" }} />
                                 



                                    <View style={{ marginLeft: 5, flexWrap: "wrap", marginTop: 20 }}>

                                        <Card.Content>
                                            <Text  allowFontScaling={false} style={{ fontWeight: "bold" }}>{decode(item.hospital_name)}</Text>

                                            <Text  allowFontScaling={false} variant="bodyMedium" style={{color:"gray",marginTop:5}}>Facilities </Text>
                                          {facility!= "" && facility.map(item=>(
                                           <Text  allowFontScaling={false} style={{ color: "#f46b78", fontSize: 10, marginTop: 5 }}>  <AntDesign name="arrowright" size={12} color="#f46b78" />   {item[0].name}</Text>
                                          ))}
                                          

                                            <Text  allowFontScaling={false} style={{ fontWeight: "bold", marginTop: 12 }}>{item.name}</Text>
                                            <Text  allowFontScaling={false} variant="bodyMedium" style={{ textDecorationLine: "line-through", color: "gray" }}><FontAwesome name="rupee" size={16} color="gray" /> {item.price}</Text>
                                            <Text  allowFontScaling={false} variant="bodyMedium" style={{ fontSize: 18, fontWeight: 500 }} ><FontAwesome name="rupee" size={16} color="#103042" /> {item.offer_price}</Text>
                                            {/* <Text  allowFontScaling={false} style={{textAlign:"justify"}}>{item.details} </Text> */}
                                        </Card.Content>




                                    </View>



                                </View>

                                <Card.Actions style={{ marginTop: 10,marginRight:30 }}>


                                <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() =>!userInfo? navigation.navigate("Login") : navigation.navigate("BookingScreen",{id:item.ser_id,name:item.name,price:item.offer_price,cat_id:route.params.id, cat_name:route.params.name})}><Text  allowFontScaling={false} style={{ color: "white" }}>Book Now</Text></Button>
                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo? navigation.navigate("Login") : navigation.navigate("EmiScreen",{id:item.ser_id,name:item.name,price:item.offer_price,cat_id:route.params.id, cat_name:route.params.name})}><Text  allowFontScaling={false} style={{ color: "white" }}>EMI</Text></Button>
                                </Card.Actions>
                            </Card>


                        ))}
                        </View>

                }
            </View>





        </ScrollView>
    </View>
    )
}

export default HairInnerScreen


