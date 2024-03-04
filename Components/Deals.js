import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, {useState, useEffect} from "react";
  import { Dimensions } from "react-native";
  const { width } = Dimensions.get("window");
  import { FontAwesome } from "@expo/vector-icons";
  import axios from "axios";


const Deals = ({navigation}) => {


  const [products,setProduct]= useState([])


  const getProduct = async () => {
   const res = await axios.get("https://cureofine.com/api/api/products");
   const data = res.data;
   // console.log(data)
   setProduct(data)
 
 };

 useEffect(()=>{
   getProduct()
 },[])
  // const products = [
  //   {
  //     id: 1,
  //     name: "Test",
  //     price: "Rs 50",
  //     image: require("../assets/Product/product1.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product1.png"),
  //       require("../assets/Product/product1.png"),
  //       require("../assets/Product/product1.png"),
  //     ],
  //    desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 2,
  //     name: "Neurological Condition",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product2.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product2.png"),
  //       require("../assets/Product/product2.png"),
  //       require("../assets/Product/product2.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 3,
  //     name: "Ligament injuries",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product3.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product3.png"),
  //       require("../assets/Product/product3.png"),
  //       require("../assets/Product/product3.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 4,
  //     name: "Foot Massage",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product4.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product4.png"),
  //       require("../assets/Product/product4.png"),
  //       require("../assets/Product/product4.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 5,
  //     name: "Sports Massage",
  //     price: "Rs 999",
  //     image: require("../assets/Product/product5.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product5.png"),
  //       require("../assets/Product/product5.png"),
  //       require("../assets/Product/product5.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 6,
  //     name: "Muscles Strain",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product6.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product6.png"),
  //       require("../assets/Product/product6.png"),
  //       require("../assets/Product/product6.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 7,
  //     name: "Sciatica",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product7.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product7.png"),
  //       require("../assets/Product/product7.png"),
  //       require("../assets/Product/product7.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 8,
  //     name: "Disc Problem",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product8.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product8.png"),
  //       require("../assets/Product/product8.png"),
  //       require("../assets/Product/product8.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 9,
  //     name: "Frozen Shoulder",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product9.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product9.png"),
  //       require("../assets/Product/product9.png"),
  //       require("../assets/Product/product9.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  //   {
  //     id: 10,
  //     name: "Joint Pain",
  //     price: "Rs 350",
  //     image: require("../assets/Product/product5.png"),
  //     session: "45 minutes",
  //     carouselImages: [
  //       require("../assets/Product/product5.png"),
  //       require("../assets/Product/product5.png"),
  //       require("../assets/Product/product5.png"),
  //     ],
  //     desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra velit enim, varius faucibus quam scelerisque rutrum. Ut nec eros mattis nisi ornare feugiat vitae eu est. Suspendisse eget risus faucibus, ullamcorper eros in, cursus sapien. Mauris finibus diam non cursus pretium. Suspendisse et bibendum ipsum. Proin a dolor vitae dui tincidunt ultrices et at purus. Quisque consequat tortor ligula, nec consequat tortor laoreet sed. Morbi eu dignissim leo, vel tempor dui. Donec dui orci, eleifend id rhoncus fringilla, convallis eu diam."
  //   },
  // ];


  return (
    <>
            <View
            style={{
              backgroundColor: "white",
              marginTop: 10,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingBottom: 10,
              paddingTop: 5,
            }}
          >
            
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text
                style={{
                  // paddingTop: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingLeft: 7,
                  fontFamily: "OpenSans",
                }}
              >
                Deals of the day
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
          
              { products.length!=0 &&  products.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 3,
                    marginLeft: 4,
                    marginTop:10,
                    padding:4
                
                  }}

                  onPress={()=>navigation.navigate("ProductInfo", {  id: item.id,
                  name: item.name,
                  price: item?.offer_price,
                  carouselImages:[`https://www.cureofine.com/upload/physiotherapy/${item.image}`,`https://www.cureofine.com/upload/physiotherapy/${item.image}`,`https://www.cureofine.com/upload/physiotherapy/${item.image}`],
                  session:item.duration,
                  item: item,
               
                })}
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{uri:`https://www.cureofine.com/upload/physiotherapy/${item.image}`}}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans",
                        fontWeight: 500,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 12,
                        fontFamily: "OpenSans",
                        marginTop: 2,
                        color: "#f08080",
                      }}
                    >
                      Session: {item.duration}
                    </Text>

                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: 400,
                        fontFamily: "OpenSans",
                        marginTop: 2,
                      }}
                    >
                      {item.offer_price}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: "#f08080",
                      paddingVertical: 5,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 5,
                      borderRadius: 4,
                    }}
                    onPress={()=>navigation.navigate("ProductInfo", {  id: item.id,
                      name: item.name,
                      price: item?.offer_price,
                      carouselImages:[`https://www.cureofine.com/upload/physiotherapy/${item.image}`,`https://www.cureofine.com/upload/physiotherapy/${item.image}`,`https://www.cureofine.com/upload/physiotherapy/${item.image}`],
                      session:item.duration,
                      item: item,})}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      VIEW
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      backgroundColor: "black",
                      paddingVertical: 3,
                      width: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 1,
                      borderRadius: 2,
                      position: "absolute",
                      top: 0,
                      left: 4,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      Trending
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView> 
          </View>

        
    </>
  )
}

export default Deals