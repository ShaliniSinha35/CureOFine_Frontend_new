import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    TextInput,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";

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
SplashScreen.preventAutoHideAsync();


const DoctorInnerScreen = ({ navigation }) => {

    const route = useRoute();

    // console.log(route.params.id)

    const [doctor, setDoctor] = useState('')
    const [languages, setLanguages] = useState('')
    const [department, setDepartment] = useState('')
    const [qualification, setQualification] = useState('')

    const getDoctor = async () => {

        const res = await axios.get("https://cureofine.com/api/api/doctorsList")
        const data = res.data
        let newArr = await data.filter((item) => { return item.doctor_id == route.params.id })
        // console.log(newArr)
        setDoctor(newArr)
        const department = newArr[0].department
        const qualification = newArr[0].qualification
        const LanguageArr = JSON.parse(newArr[0].language)
        // console.log("46",department)
        getDepartment(department)
        getQualification(qualification)
        getLanguages(LanguageArr)


    }
    const getDepartment = async (department) => {
        const res1 = await axios.get("https://cureofine.com/api/api/dept")
        const data1 = res1.data
        let newArr = await data1.filter((item) => { return item.mas_id == department })
        // console.log(newArr)
        setDepartment(newArr)

    }
    const getQualification = async (qualification) => {
        const res1 = await axios.get("https://cureofine.com/api/api/qualification")
        const data1 = res1.data
        let newArr = await data1.filter((item) => { return item.mas_id == department })
        // console.log(newArr)
        setQualification(newArr)

    }
    const getLanguages = async (LanguageArr) => {
        const res1 = await axios.get("https://cureofine.com/api/api/languages")
        const data1 = res1.data
        let langArr1 = []
        for (let i = 0; i < LanguageArr.length; i++) {
            langArr1.push(await data1.filter((item) => { return item.mas_id == LanguageArr[i] }))
        }
        //    console.log(langArr1)
        setLanguages(langArr1)
    }
    useEffect(() => {
        getDoctor()
    }, [doctor])

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <Header navigation={navigation}></Header>

            {doctor == '' ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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


                        <Text  allowFontScaling={false} style={{ color: "#103042", paddingLeft: 12, fontSize: 18 }}>{doctor[0].name}</Text>

                        <Image
                            style={{ width, height: 300, marginTop: 20, resizeMode: "contain", margin: 2 }}
                            source={{ uri: `https://cureofine.com/upload/profile/${doctor[0].profile_img}` }}

                        >

                        </Image>



                        <View style={{ padding: 10, paddingTop: 10 }}>
                            <Text  allowFontScaling={false} style={{ fontSize: 15 }}>
                                Gender:  {doctor[0].gender}
                            </Text>
                            {
                                department != "" &&

                                <Text  allowFontScaling={false} style={{ fontSize: 15 }}>
                                    Department:  {decode(department[0].name)}
                                </Text>
                            }

                            <Text  allowFontScaling={false} style={{ fontSize: 15 }}>
                                Registration No: {doctor[0].reg_num}
                            </Text>
                            <Text  allowFontScaling={false} style={{ fontSize: 15 }}>
                                Experience:  {doctor[0].experience} years
                            </Text>

                            {
                                qualification != "" &&
                                <Text  allowFontScaling={false} style={{ fontSize: 15 }}>
                                    Qualification:  {qualification[0].name}
                                </Text>
                            }

                            <View style={{ flexDirection: "row" }}>
                                <Text  allowFontScaling={false} style={{ fontSize: 15, }}>
                                    Language:
                                </Text>


                                <View style={{ flexDirection: "row" }}>
                                    {languages != "" &&


                                        languages.map(item => (

                                            <Text  allowFontScaling={false} style={{ fontSize: 15, marginLeft: 5 }}>
                                                {item[0].name}  </Text>
                                        ))}
                                </View>


                            </View>





                            {/* <Text  allowFontScaling={false} style={{ fontSize: 18 }}>
                                   Language:  {doctor[0].language}
                             
                                </Text> */}
                            {/* <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                padding: 2,
                                marginTop: 5,
                            }}
                        >
                            <Text>Session: </Text>
                            <Text  allowFontScaling={false} style={{ color: "#eb3b5a" }}>{route.params.item?.duration} minutes</Text>
                        </View> */}
                            <Text
                                style={{
                                    height: 1,
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    marginTop: 10,
                                }}
                            />

                            <View
                                style={{
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    padding: 2,
                                }}
                            >
                                <Text>Description: </Text>
                                <Text  allowFontScaling={false} style={{ fontSize: 12, textAlign: "justify", color: "gray" }}>
                                    {decode(doctor[0].details)}
                                </Text>
                            </View>

                            <Text
                                style={{
                                    height: 1,
                                    borderColor: "#D0D0D0",
                                    borderWidth: 1,
                                    marginTop: 10,
                                }}
                            />


                        </View>







                    </View>



                    <Contact></Contact>
                    <Footer></Footer>

                </ScrollView>

            }




        </View>
    )
}

export default DoctorInnerScreen


