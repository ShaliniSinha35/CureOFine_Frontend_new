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


const SurgeryInnerScreen = ({ navigation }) => {

    const route = useRoute();

   
    const [surgery, setSurgery] = useState("")
    const [facility, setFacility] = useState("")
    const userInfo = useSelector(state => state.user.userInfo);
    console.log(userInfo)
    const getSurgeryList = async () => {


        const locationId = JSON.parse(await AsyncStorage.getItem("locationId"));
       

        const res = await axios.get("https://cureofine.com/api/api/surgeryList")
        const data = res.data
        //  console.log(route.params.id)
        let newArr = await data.filter((item) => { return item.category == route.params.id && item.surgery_location == locationId })
         console.log("newarr",newArr)
        setSurgery(newArr)
        let facArr = JSON.parse(newArr[0].facility_type)
        // console.log("69",facArr.length)
        getFacility(facArr)


        //  setHospitals(newArr)
    }

    useEffect(() => {
        getSurgeryList()
    }, [])






    const getFacility = async (facArr) => {
        const res = await axios.get("https://cureofine.com/api/api/facilityType")
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

                <Text style={{ color: "black", padding: 15, fontSize: 15, paddingBottom: 2 }}>Elevate Your Healthcare Experience -</Text>
                <Text style={{ color: "#eb3b5a", paddingLeft: 12, fontSize: 12 }}> Explore a Range of Premium Medical Services on our App.</Text>
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
                                <Text style={{ fontSize: 20, color: "#103042", fontWight: 500 }}>Hospitals</Text>
                            </View> :

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, color: "#103042", fontWight: 500, marginLeft: 20 }}>{route.params.name} Hospitals</Text>


                                {surgery.map((item) => (


                           


                                    <Card key={item.id} style={{ margin: 10, backgroundColor: "white" }}  >

                                        <View style={{ flexDirection: "row", width: "100%" }}>


                                            <Image source={{ uri: `https://cureofine.com/upload/hospital/${item.hospital_image}` }} style={{ height: 150, width: 150, resizeMode: "cover" }} />
                                            {
                                                // console.log(hospitals[0].image)
                                            }



                                            <View style={{ marginLeft: 5, flexWrap: "wrap", marginTop: 20 }}>

                                                <Card.Content>
                                                    <Text style={{ fontWeight: "bold" }}>{decode(item.hospital_name)}</Text>

                                                    <Text variant="bodyMedium" style={{ color: "gray", marginTop: 5 }}>Facilities </Text>
                                                    {facility != "" && facility.map(item => (
                                                        <Text style={{ color: "#f46b78", fontSize: 10, marginTop: 5 }}>  <AntDesign name="arrowright" size={12} color="#f46b78" />   {item[0].name}</Text>
                                                    ))}



                                                    <Text style={{ fontWeight: "bold", marginTop: 12 }}>{item.name}</Text>
                                                    <Text variant="bodyMedium" style={{ textDecorationLine: "line-through", color: "gray" }}><FontAwesome name="rupee" size={16} color="gray" /> {item.price}</Text>
                                                    <Text variant="bodyMedium" style={{ fontSize: 18, fontWeight: 500 }} ><FontAwesome name="rupee" size={16} color="#103042" /> {item.offer_price}</Text>
                                                    {/* <Text style={{textAlign:"justify"}}>{item.details} </Text> */}
                                                </Card.Content>




                                            </View>



                                        </View>

                                        <Card.Actions style={{ marginTop: 10, marginRight: 30 }}>


                                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo ? navigation.navigate("Login") : navigation.navigate("BookingScreen", { id: item.ser_id, name: item.name, price: item.offer_price, cat_id: route.params.id, cat_name: route.params.name })}><Text style={{ color: "white" }}>Book Now</Text></Button>
                                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo ? navigation.navigate("Login") : navigation.navigate("EmiScreen", { id: item.ser_id, name: item.name, price: item.offer_price, cat_id: route.params.id, cat_name: route.params.name })}><Text style={{ color: "white" }}>EMI</Text></Button>
                                        </Card.Actions>
                                    </Card>

                                ))}

                                {/* <Text style={{ fontWeight: "bold" }}>{decode(hospitals[0].name)}</Text> */}

                            </View>


                    }

 
                </View>





            </ScrollView>
        </View>
    )
}

export default SurgeryInnerScreen



{/* <View style={{marginTop:20,paddingBottom:50}}>
{
    hospitals.length==0 ?<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator color={"#f08080"} size={"large"} />
</View> : 
    hospitals.map((item)=>(
      
          <Card key={item.id} style={{margin:10, backgroundColor:"white"}}  >

        <View style={{flexDirection:"row",width:"100%"}}>
        <Image source={require("../assets/hospital.jpg")} style={{height:150,width:168,resizeMode:"cover"}}/>

        <View style={{marginLeft:10, flexWrap:"wrap",marginTop:20}}>
        
                      <Card.Content>
                      <Text style={{fontWeight:"bold"}}>{item.name}</Text>
              <Text variant="bodyMedium">Mobile No.- {item.mobile}</Text>
          
              <Text variant="bodyMedium">Address: </Text>
              <Text style={{textAlign:"justify"}}>{item.address} </Text>
          </Card.Content>
    
      
     
    
        </View>
        
      
        </View>
     
      
   
     
          
        

       
          <Card.Actions  style={{marginTop:10}}>
             
              
              <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={()=>navigation.navigate("Login")}><Text style={{color:"white"}}>Book Now</Text></Button>
          </Card.Actions>
      </Card>  
      
      
    ))
      
}
</View> */}


// SELECT `id`, `ser_id`, `location`, `category`, `hospital`, `name`, `price`, `offer_price`, `details`, `tranding`, `status`, `cby`, `cdate` FROM `surgery`
//  this is my surgery table details i have surgery id on the basis of this i got the surgery array in each surgery have hospital which store hospital id so i fetch hospital details for that surgery and i want to show each surgery with their hospital name 