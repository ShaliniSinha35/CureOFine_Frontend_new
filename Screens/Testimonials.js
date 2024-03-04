import {
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground,
    Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { Card } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import { ActivityIndicator } from "react-native";
const Testimonials = ({ navigation }) => {



    // https://cureofine.com/api/api/products

    const specialization = [
        {
            id: 0,
            image: require("../assets/user.png"),
            name: "Shreya Sharma",
            desc: "The video consultations were seamless, and the doctors were thorough and attentive. It's reassuring to know I can get quality healthcare from the comfort of my home."
        },
        {
            id: 1,
            image: require("../assets/user.png"),
            name: "Shreya Sharma",
            desc: "The video consultations were seamless, and the doctors were thorough and attentive. It's reassuring to know I can get quality healthcare from the comfort of my home."
        },
        {
            id: 2,
            image: require("../assets/user.png"),
            name: "Shreya Sharma",
            desc: "The video consultations were seamless, and the doctors were thorough and attentive. It's reassuring to know I can get quality healthcare from the comfort of my home."
        },
    ];

    const [testimonial, setTestimonial] = useState([])
    const getTestimonial = async () => {
        const res = await axios.get("https://cureofine.com/api/api/testimonials")
        const data = res.data;
        setTestimonial(data)
    }

    useEffect(() => {
        getTestimonial()
    }, [])


    const tagsStyles = {

        p: {
            fontSize: 10,
            textAlign: "justify",


        }
    };

    return (
        <>
            <ImageBackground
                source={require("../assets/bg8.png")}
                style={{
                    width: "100%",
                    height: "auto",
                    resizeMode: "cover",
                    marginTop: 15,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}
            >

                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            paddingLeft: 10,
                            fontFamily: "OpenSans",
                        }}
                    >
                        Our Testimonials
                    </Text>

                    <View>
                        <FontAwesome
                            name="stethoscope"
                            size={20}
                            color="white"
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
                        width: width * 0.6,
                        marginLeft: 7,
                        borderRadius: 5,
                    }}
                />


                {
                    testimonial.length == 0 ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"#f08080"} size={"large"} />
                    </View> :

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>


                            {testimonial.map((item, index) => (

                                <TouchableOpacity key={item.id} style={{ marginBottom: 10 }}>
                                    <Card containerStyle={{ width: 240, borderRadius: 5, alignItems: "center" }}>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Divider />
                                        <View style={{ alignItems: "center", width: 200 }}>
                                            <Image
                                                style={{ padding: 0, height: 80, width: 80, resizeMode: "contain", margin: 17, borderRadius: 10 }}
                                                source={{ uri: `https://cureofine.com/upload/testimonial/${item.img}` }}
                                            />
                                        </View>

                                        <View style={{ width: 200, alignItems: "center", }}>

                                            {item.content != "" && <RenderHTML tagsStyles={tagsStyles} key={item.id} source={{ html: decode(item.content) }}></RenderHTML>}

                                        </View>

                                    </Card>
                                </TouchableOpacity>

                            ))}

                            {
                                // console.log(testimonial)
                            }

                        </ScrollView>

                }






            </ImageBackground>
        </>
    )
}

export default Testimonials