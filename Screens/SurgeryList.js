import {
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import { ActivityIndicator } from "react-native";
import Header from "../Components/Header";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
const SurgeryList = ({ navigation }) => {

  const userInfo = useSelector(state => state.user.userInfo);
  const isFocused = useIsFocused();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = userInfo ? true : false;
    setIsLoggedIn(userLoggedIn);
  }, [isFocused]);

  const handlePress = (item) => {
    if (isLoggedIn) {
      navigation.navigate("SurgeryInner", { id: item.cat_id, name: item.name });
    } else {
      // Navigate to the login screen and pass the callback to navigate to SurgeryInner after login
      navigation.navigate("Login", { onLoginSuccess: () => handleLoginSuccess(item) });
    }
  };
  const handleLoginSuccess = (item) => {
    // Navigate to SurgeryInner after successful login
    navigation.navigate("SurgeryInner", { id: item.cat_id, name: item.name });
  };

    const [surgeryList, setSurgeryList] = useState("")
    // https://cureofine.com/api/api/surgeryList
    const getSurgeryList = async () => {
        const res = await axios.get("https://cureofine.com/api/api/surgeryCategory")
        const data = res.data;
        setSurgeryList(data);
    }

    useEffect(() => {
        getSurgeryList()
    }, [])


    const tagsStyles = {

        p: {
          fontSize: 12,
          textAlign: "justify",
         
    
        }
    };


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

                <View style={{ marginTop: 20, paddingBottom: 50, flexDirection:"row" , flexWrap:"wrap",width:Dimensions.get('screen').width, justifyContent:"center"}}>
                    {
                        surgeryList.length == 0 ? 
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={"#f08080"} size={"large"} />
                        </View> :

     surgeryList!= "" &&  
         <FlatList   
data={surgeryList}
// horizontal
// showsHorizontalScrollIndicator={false}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: "space-around",
      }}
      
renderItem={({ item, index }) => (
<View style={{width:170,alignItems:"center",padding:10,elevation:3,borderRadius:5}}>

<View style={{width:"100%", alignItems:"center"}}>
<Image style={{width:100,height:100,resizeMode:"contain"}} source={{ uri: `https://cureofine.com/upload/surgerycat/${item.image}` }} />
</View>

<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:17,marginTop:5}} variant="titleLarge">{decode(item.name)}</Text>


  
               <TouchableOpacity
                    style={{
                      backgroundColor: "#103042",
                        borderWidth:2,
                      borderColor:"#f08080",
                      paddingVertical: 7,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 4,
                    
                    }} 
                    // onPress={()=>handlePress(item)}
                    onPress={()=> navigation.navigate("SurgeryInner", {id:item.cat_id,name:item.name}) }  
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      VIEW MORE
                    </Text>
                  </TouchableOpacity>



</View>
)}
  />




}
                        




                              
                              
                        
                            
                    
                             
     
                         

         

                
                </View>


                {
                  surgeryList!= "" && 

                  <Contact></Contact>
                 
                }
                     {
                  surgeryList!= "" && 

                  <Footer></Footer>
                 
                }



            </ScrollView>
        </View>
    )
}



export default SurgeryList



                         // <Card key={item.id} style={{ margin: 10 }} theme={{ colors: { primary: 'green' } }} >

                           //     <Card.contain source={require("../assets/surgeryImg.png")} />
                                //     <Card.Title title={item.name} subtitle="" />

                                //     <Card.Content>

                                //         <Text  allowFontScaling={false} variant="bodyMedium" style={{ color: "gray" }}>Original Price- {item.price}</Text>
                                //         <Text  allowFontScaling={false} variant="bodyMedium" style={{ fontWeight: "bold" }}>Offer Price- Rs {item.offer_price}</Text>
                                //         <Text  allowFontScaling={false} variant="bodyMedium">Description: </Text>
                                //      {item.details!="" && <RenderHTML key={item.id} source={{ html: decode(item.details) }}></RenderHTML> }   
                                //     </Card.Content>


                                //     <Card.Actions style={{ marginTop: 10, borderColor: "#f08080" }}>
                                //         <Button onPress={() => navigation.navigate("Login")}><Text  allowFontScaling={false} style={{ color: "#f08080" }}>EMI With No Interest</Text></Button>
                                //         <Button onPress={() => navigation.navigate("Login")} theme={{ colors: { primary: '#f08080' } }}><Text  allowFontScaling={false} style={{ color: "white" }}>Book Now</Text></Button>
                                //     </Card.Actions>


                                // </Card>






                                        //     <Card containerStyle={{ marginTop: 15 }}>

                            //         <Image
                            //           style={{width:"100%",height:100}}
                            //           resizeMode="contain"
                            //           source={{uri:`https://cureofine.com/upload/surgerycat/${item.image}`}}                                    />
                            //  <Card.Title>{item.name}</Card.Title>
                            //     <Card.Divider/>
                            //     <View style={{position:"relative",alignItems:"center"}}>
                           
                            //      </View>

                            //          <Card.Actions style={{ marginTop: 10 }}>
                            //            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} ><Text  allowFontScaling={false} style={{ color: "white" }}>Show Hospitals</Text></Button>
                            //         </Card.Actions>
                            //      </Card>   
// onPress={()=>navigation.navigate("SurgeryInner", {id:item.cby})}
                                // <Card key={item.id} style={{ margin: 10, backgroundColor:"white" }} >

                                //     <View style={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                                //         {/* https://cureofine.com/upload/surgerycat/ */}
                                //         <Image source={{uri:`https://cureofine.com/upload/surgerycat/${item.image}`}} style={{ height: 150, width: 168, resizeMode: "contain" }} />

                                //         <View style={{ marginLeft: 8, flexWrap: "wrap" }}>

                                //             <Card.Content>
                                //                 <Text  allowFontScaling={false} style={{ fontSize: 12}}>{item.name}</Text>
                                //                 <Text  allowFontScaling={false} variant="bodyMedium" style={{ color: "gray", fontSize: 12 }}>Original Price- Rs {item.price}</Text>
                                //                 <Text  allowFontScaling={false} variant="bodyMedium" style={{ fontWeight: "bold", fontSize: 12 }}>Offer Price- Rs {item.offer_price}</Text>
                                //                 <Text  allowFontScaling={false} variant="bodyMedium">Description: </Text>
                                //                 {item.details != "" && <RenderHTML tagsStyles={tagsStyles} key={item.id} source={{ html: decode(item.details) }}></RenderHTML>}

                                               
                                //             </Card.Content>

                                //         </View>


                                //     </View>



                             
                                // </Card>