import { Text, View, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");
import { Card } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const Location = ({navigation}) => {
 

    const [cLoc, setLoc]=useState(null)

   
    const getLocation= async()=>{
            
       const res = await axios.get("https://cureofine.com/api/api/presence");
       const data= res.data;
      //  console.log(data)
       setLoc(data)

    }

    useEffect(()=>{
       getLocation()
    },[])

 

  const clinic = [
    {
      id: 0,
      image: require("../assets/clinic/b14.png"),
      heading: "Cureofine Telemedicine center",
      location: "GAYA",
    },
    {
      id: 1,
      image: require("../assets/clinic/b14.png"),
      heading: "Cureofine Telemedicine center",
      location: "JHAJHA , JAMUI",
    },
    {
      id: 2,
      image: require("../assets/clinic/b14.png"),
      heading: "Cureofine Telemedicine center",
      location: "PATNA",
    },
  ];

  return (
    <>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            paddingLeft: 7,
            fontFamily: "OpenSans",
          }}
        >
          Our Presence
        </Text>

        <View>
          <FontAwesome
            name="stethoscope"
            size={20}
            color="#f08080"
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
          width: width * 0.4,
          marginLeft: 7,
          borderRadius: 5,
        }}
      />

    

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          cLoc!=null ?  cLoc.map((item, index) => (
       
                  

            <TouchableOpacity key={item.id}  onPress={()=>navigation.navigate("About")}>
           
           <Card
             key={item.id}
             style={{
               paddingLeft: 0,
               paddingRight: 0,
               paddingTop: 0,
               paddingBottom: 0,
               borderColor: "white",
             }}
           >
             <Ionicons
               name="location-sharp"
               size={24}
               color="#f08080"
               style={{ textAlign: "center" }}
             />
             <Card.Title style={{ fontFamily: "OpenSans", fontSize: 18 }}>
               {/* {item.centre_name} */}
               {item.name}
             </Card.Title>
             {/* <Text style={{ textAlign: "center", marginBottom: 2,fontFamily: "OpenSans", fontSize: 18 }}>
               {item.name}
             </Text> */}
             <Card.Divider />
             <View style={{ alignItems: "center" }}>
               <Image
                 style={{ width: 200, height: 100, resizeMode: "contain" }}
                 resizeMode="contain"
                 source={{uri:`https://cureofine.com/upload/location/${item.image}`}}
               />
             </View>
           </Card>
         </TouchableOpacity>
   
      
      
        ))
        :<></>

        }
   
      </ScrollView>

    </>
  );
};

export default Location;
