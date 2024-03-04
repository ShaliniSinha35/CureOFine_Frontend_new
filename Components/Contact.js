import {
    Text,
    View,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
  } from "react-native";
  import React, {useState, useEffect} from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  import { Dimensions } from "react-native";
  const { width } = Dimensions.get("window");
  import { FontAwesome } from "@expo/vector-icons";
  import { Linking } from "react-native";
  import axios from "axios";


const Contact = () => {

  const [contactInfo, setContact]= useState("")
  const [email, setEmail] = useState("")
  const [phone, setNumber] = useState("")
  const [officeHour, setHour] = useState("")


  const getInfo = async()=>{
    const res= await axios.get("https://cureofine.com/api/api/contactInfo");
    const data = res.data
    // console.log(data)
    setContact(data)
    setContact(data)
    // console.log(data[0].mobile_2)
    setNumber(data[0].mobile_1)
    setEmail(data[0].email)
    setHour(data[0].office_hour)
    
  }

  useEffect(()=>{
    getInfo()
  },[])

    
  return (
    <>
         <ImageBackground
            source={require("../assets/bg8.png")}
            style={{
              width: "100%",
              height:180,
              resizeMode: "cover",
              marginTop: 15,
            }}
          >
           

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 7,
                  fontFamily: "OpenSans",
                }}
              >
                Contact Us
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
                width: width * 0.5,
                marginLeft: 7,
                borderRadius: 5,
              }}
            />
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {contact.map((item, index) => (


                <TouchableOpacity
                  key={item.id}
                  style={{
                    margin: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 150,
                    borderWidth: 0.5,
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: "white",
                    borderColor: "#D0D0D0",
                    marginTop: 12,
                  }}
    onPress={()=>{  item.url && Linking.openURL(item.url)}}   
// 
                  
                >
                  {item.icon}

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
                    {item.title}
                  </Text>

                  {item.text && (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 10,
                        fontWeight: "500",
                        marginTop: 5,
                      }}
                    >
                      {item.text}
                    </Text>
                  )}

                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 8,
                      fontWeight: "500",
                      marginTop: 5,
                      color: "#f08080",
                    }}
                  >
                    {item.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView> */}


             <ScrollView horizontal showsHorizontalScrollIndicator={false}>

           <TouchableOpacity
                 
                 style={{
                   margin: 8,
                   justifyContent: "center",
                   alignItems: "center",
                   width: 150,
                   borderWidth: 0.5,
                   padding: 8,
                   borderRadius: 8,
                   backgroundColor: "white",
                   borderColor: "#D0D0D0",
                   marginTop: 12,
                 }}
   onPress={()=>{ Linking.openURL(`tel:${phone}`)}} 

                 
               >

               
                <Feather name="phone-call" size={24} color="#f08080" />

                 <Text
                   style={{
                     textAlign: "center",
                     fontSize: 12,
                     fontWeight: "500",
                     marginTop: 5,
                   }}
                 >
                   {phone}
                 </Text>

                 
                   <Text
                     style={{
                       textAlign: "center",
                       fontSize: 10,
                       fontWeight: "500",
                       marginTop: 5,
                     }}
                   >
                   Call Us Now
                 
                   </Text>
         

                 <Text
                   style={{
                     textAlign: "center",
                     fontSize: 8,
                     fontWeight: "500",
                     marginTop: 5,
                     color: "#f08080",
                   }}
                 >
                      Have a question?
                 </Text>
               </TouchableOpacity>



               <TouchableOpacity
                
                style={{
                  margin: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 150,
                  borderWidth: 0.5,
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: "white",
                  borderColor: "#D0D0D0",
                  marginTop: 12,
                }}
  onPress={()=>{ Linking.openURL("mailto:cureofine@gmail.com")}} 

                
              >
             <Feather name="mail" size={24} color="#f08080" />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {email}
                </Text>

                
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
                 Drop us an email
                
                  </Text>
        

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 8,
                    fontWeight: "500",
                    marginTop: 5,
                    color: "#f08080",
                  }}
                >
                     Need support?
                </Text>
              </TouchableOpacity>


              <TouchableOpacity
                
                style={{
                  margin: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 150,
                  borderWidth: 0.5,
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: "white",
                  borderColor: "#D0D0D0",
                  marginTop: 12,
                }}
  

                
              >
             <Ionicons name="alarm-outline" size={24} color="#f08080" />

             <Text
                    style={{
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: "500",
                      marginTop: 5,
                    }}
                  >
              We are open on
                
                  </Text>

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {officeHour}
                </Text>

                
                
        

                {/* <Text
                  style={{
                    textAlign: "center",
                    fontSize: 8,
                    fontWeight: "500",
                    marginTop: 5,
                    color: "#f08080",
                  }}
                >
                 {officeHour}
                </Text> */}
              </TouchableOpacity>
  


       
           
            </ScrollView>
         </ImageBackground>
    </>
  )
}

export default Contact