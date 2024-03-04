import {
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import React, {useState, useEffect} from "react";
  import { Dimensions } from "react-native";
  const { width } = Dimensions.get("window");
  import { FontAwesome } from "@expo/vector-icons";
  import axios from "axios";

const Brands = () => {
  
  const [brands, setBrands] =useState([])


  const getBrand = async () => {
    const res = await axios.get("https://cureofine.com/api/api/brands");
    const data = res.data;
    // console.log(data)
    setBrands(data)
  
  };

  useEffect(()=>{
    getBrand()
  },[])

      // const brands = [
      //   {
      //     id: 0,
      //     img: require("../assets/Brands/p1.png"),
      //   },
      //   {
      //     id: 1,
      //     img: require("../assets/Brands/p2.png"),
      //   },
      //   {
      //     id: 2,
      //     img: require("../assets/Brands/p3.png"),
      //   },
      //   {
      //     id: 3,
      //     img: require("../assets/Brands/p4.png"),
      //   },
      //   {
      //     id: 4,
      //     img: require("../assets/Brands/p5.png"),
      //   },
      //   {
      //     id: 5,
      //     img: require("../assets/Brands/p6.png"),
      //   },
      // ];

  return (
    <>
         <View style={{ flexDirection: "row", marginTop: 14 }}>
            <Text
              style={{
                // paddingTop: 10,
                fontSize: 18,
                fontWeight: "bold",
                paddingLeft: 7,
                fontFamily: "OpenSans",
              }}
            >
              Our Brands and Partners
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
              width: width * 0.7,
              marginLeft: 7,
              borderRadius: 5,
            }}
          />

          { brands.length!==0 &&  <FlatList
            data={brands}
            horizontal
      showsHorizontalScrollIndicator={false}
            // numColumns={3}
            // scrollEnabled={false}
            // columnWrapperStyle={{
            //   flex: 1,
            //   justifyContent: "space-between",
            // }}
            renderItem={({ item, index }) => (

           item.status == "Active" 
           
           &&

              <TouchableOpacity
              key={item.id}
              style={{
                margin: 10,
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "whitesmoke",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Image
                style={{ width: 80, height: 80, resizeMode: "contain" }}
                source={{uri:`https://cureofine.com/upload/brand/${item.logo}`}}
              />
            </TouchableOpacity>
          
            
            )}
          ></FlatList>}

        
    </>
  )
}

export default Brands

// https://www.cureofine.com/upload/brand/