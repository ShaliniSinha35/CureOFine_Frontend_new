import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Header from "../Components/Header";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
SplashScreen.preventAutoHideAsync();


const HospitalInnerScreen = ({ navigation }) => {

    const route = useRoute();

    // console.log(route.params.id)

    const [hospital, setHospital] = useState('')
    
    const [facilities, setFacilities] = useState('')
    const [location, setLocation] = useState('')
    const [hospitalImageArr,setHospitalImageArr]= useState('')

    const getHospital = async () => {

        const res = await axios.get("https://cureofine.com/api/api/hospitals")
        const data = res.data
        let newArr = await data.filter((item) => { return item.hos_id == route.params.id })
        // console.log(newArr)

        for(let i=0;i<newArr.length;i++){
            const imgArr = JSON.parse(newArr[i].image)
            // console.log("53",imgArr)

            setHospitalImageArr(imgArr)
        
            
            newArr[i].image = imgArr
            
            
          }
        setHospital(newArr)
      
 
        const facArr = JSON.parse(newArr[0].facility_type)
        // console.log("46", facArr.length)
        getFacilities(facArr)
        const location = newArr[0].location
        getLocation(location)


    }

    const getLocation = async (location) => {
        const res1 = await axios.get("https://cureofine.com/api/api/presence")
        const data1 = res1.data
        let newArr = await data1.filter((item) => { return item.location_id == location })
        setLocation(newArr)

    }


    const getFacilities = async (facArr) => {
        const res1 = await axios.get("https://cureofine.com/api/api/facilityType")
        const data1 = res1.data
        let facArr1 = []
        for (let i = 0; i < facArr.length; i++) {
            facArr1.push(await data1.filter((item) => { return item.fac_id == facArr[i] }))
        }
        //    console.log(facArr1)
        setFacilities(facArr1)

    }
    useEffect(() => {
        getHospital()
    }, [hospital])

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <Header navigation={navigation}></Header>

            {hospital == '' ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color={"#f08080"} size={"large"} />
            </View>

                :
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


                        <Text  allowFontScaling={false} style={{ color: "#103042", paddingLeft: 12, fontSize: 18 }}>{decode(hospital[0].name)}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                          {
                            hospitalImageArr!= "" &&  hospitalImageArr.map((hos)=>(
                          
                                <Image style={{ width,height:200,  marginTop: 20, resizeMode: "contain", margin: 2 }} source={{ uri: `https://cureofine.com/upload/hospital/${hospital[0].image[0]}`}}></Image>
                       
                
                            ))
                          }

                        </ScrollView>
                        {/* <Image
                            style={{ width,height:200,  marginTop: 20, resizeMode: "contain", margin: 2 }}
                            source={{ uri: `https://cureofine.com/upload/hospital/${hospital[0].image[0]}` }}

                        >

                        </Image> */}



                        <View style={{ padding: 10, paddingTop: 10 }}>

                        <Text allowFontScaling={false}  style={{ fontWeight: 200, fontSize: 12, marginTop: 5,marginBottom:5 }}>{decode(hospital[0].details)}</Text>        

<Text  allowFontScaling={false} style={{fontWight:500,color:"gray"}}>  <Ionicons
                                name="location-sharp"
                                size={18}
                                color="#f08080"
                                style={{ textAlign: "center" }}
                              />{hospital[0].address}</Text>

<Text  allowFontScaling={false} style={{fontWight:500,color:"gray",marginTop:5}}>Facilities</Text>

                            {facilities != "" &&
                                facilities.map(item => (

                                    <Text  allowFontScaling={false} style={{ fontSize: 15, marginLeft: 5 }}>
                                     <AntDesign name="arrowright" size={20} color="#f46b78" />   {item[0].name}  </Text>
                                ))}

<Text  allowFontScaling={false} style={{fontWight:500,color:"gray",marginTop:5}}>Service available: {hospital[0].hospital_time}</Text>

{hospital[0].hospital_time == "Buisness Hour" ?
<View style={{padding:20,borderWidth:1,borderColor:"black",borderRadius:20,marginTop:10}}>
              <Text allowFontScaling={false} style={styles.modalText}>
                Sunday: {hospital[0].sun_status !== "Closed" ? 
                  `${moment(hospital[0].sun_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].sun_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Monday: {hospital[0].mon_status !== "Closed" ? 
                  `${moment(hospital[0].mon_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].mon_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Tuesday: {hospital[0].tue_status !== "Closed" ? 
                  `${moment(hospital[0].tue_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].tue_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Wednesday: {hospital[0].wed_status !== "Closed" ? 
                  `${moment(hospital[0].wed_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].wed_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Thursday: {hospital[0].thu_status !== "Closed" ? 
                  `${moment(hospital[0].thu_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].thu_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Friday: {hospital[0].fri_status !== "Closed" ? 
                  `${moment(hospital[0].fri_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].fri_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Saturday: {hospital[0].sat_status !== "Closed" ? 
                  `${moment(hospital[0].sat_start, 'HH:mm').format('h:mm A')} to ${moment(hospital[0].sat_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

            </View> 
            : null
 }

{/* 
                            <Text
                                style={{
                                    height: 1,
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    marginTop: 10,
                                }}
                            /> */}

                        </View>







                    </View>



                    <Contact></Contact>
                    <Footer></Footer>

                </ScrollView>

            }




        </View>
    )
}
const styles= StyleSheet.create({
    separator: {
        height: 1,
        borderColor: "whitesmoke",
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 20
    },
 
    modalText: {
        fontSize: 15,
        textAlign: "center",
        color: "black"
    },
    closeButton: {
        backgroundColor: "#f08080",
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        elevation: 2,
        marginTop: 20
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    }
})

export default HospitalInnerScreen


