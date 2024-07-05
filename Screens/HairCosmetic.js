import {
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
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

const HairCosmetic = ({ navigation }) => {

 
    const [hairCosmetics, setHairCosmetics] = useState([])
    // https://cureofine.com/api/api/surgeryList
    const getHairCosmeticsList = async () => {
        const res = await axios.get("https://cureofine.com/api/api/hairCosmetic")
        const data = res.data;
        setHairCosmetics(data)
    }

    useEffect(() => {
        getHairCosmeticsList()
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
                        hairCosmetics.length == 0 ? 
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={"#f08080"} size={"large"} />
                        </View> :

    <FlatList   
data={hairCosmetics}
// horizontal
// showsHorizontalScrollIndicator={false}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: "space-around",
      }}
renderItem={({ item, index }) => (
<View style={{margin:10,width:170,alignItems:"center",margin:10,padding:15,elevation:3,borderRadius:5}}>

<View style={{width:"100%", alignItems:"center"}}>
<Image style={{width:100,height:100,resizeMode:"contain"}} source={{ uri: `https://cureofine.com/upload/haircat/${item.image}` }} />

</View>

<Text  allowFontScaling={false} style={{textAlign:"center",fontSize:17,marginTop:5}} variant="titleLarge">{decode(item.name)}</Text>


  
               <TouchableOpacity
                    style={{
                      backgroundColor: "#103042",
                      borderWidth:2,
                    borderColor:"#f08080",
                      paddingVertical: 5,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                      borderRadius: 4,
                    }}
                    onPress={()=>navigation.navigate("HairInnerScreen", {id:item.cat_id,name:item.name})}
                  
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

                {hairCosmetics.length!= 0 && <Contact></Contact>}
                {hairCosmetics.length!= 0 && <Footer></Footer>}
                  


            </ScrollView>
        </View>
    )
}



export default HairCosmetic


