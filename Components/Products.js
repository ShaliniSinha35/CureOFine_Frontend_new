import {
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React , {useState, useEffect} from "react";
  import { Dimensions } from "react-native";
  const { width } = Dimensions.get("window");
  import { FontAwesome } from "@expo/vector-icons";
  import axios from "axios";
  import { ActivityIndicator } from "react-native";
  


const Products = ({navigation}) => {


     const [product,setProduct]= useState([])

     const [trendingProduct, setTrendingProduct] = useState([])
     const [product1 ,setProduct1] = useState('')
     const [product2 ,setProduct2] = useState([])
     const [product3 ,setProduct3] = useState([])
     const [product4 ,setProduct4] = useState([])

     const getTrendingProduct = async()=>{
        const res1 = await axios.get("https://cureofine.com/api/api/ivf")
        setProduct1(res1.data[0])
        const res2 = await axios.get("https://cureofine.com/api/api/dental")
        setProduct2(res2.data[0])

        const res3 = await axios.get("https://cureofine.com/api/api/hairCosmetic")
        setProduct3(res3.data[0])


        const res4 = await axios.get("https://cureofine.com/api/api/ayurveda")
        setProduct4(res4.data[0])
        

     }


     const getProduct = async () => {
      const res = await axios.get("https://cureofine.com/api/api/products");
      const data = res.data;
      // console.log(data)
      setProduct(data)
    
    };
  
    useEffect(()=>{
      getTrendingProduct()
    },[])

   
// https://www.cureofine.com/upload/physiotherapy/

  return (
    <>
    
            <View
            style={{
              backgroundColor: "whitesmoke",
              marginTop: 15,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              paddingBottom: 10,
              paddingTop: 5,
            }}
          >
            <Text
              style={{
                paddingTop: 10,
                fontSize: 12,
                fontWeight: "bold",
                paddingLeft: 7,
                fontFamily: "OpenSans",
                color: "#eb3b5a",
              }}
            >
              EXPLORE IN
            </Text>
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
                Our Trending Products
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
                  product1!="" &&    <TouchableOpacity
                  key={product1.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 3,
                    marginLeft: 4,
                    marginTop:2,
                    padding:4
                
                  }}
                  onPress={()=>navigation.navigate("IvfInnerScreen", {id:product1.cat_id})}

                //   onPress={()=>navigation.navigate("ProductInfo", {  id: item.id,
                //   name: item.name,
                //   price: item?.offer_price,
                //   carouselImages:[`https://www.cureofine.com/upload/physiotherapy/${item.image}`,`https://www.cureofine.com/upload/physiotherapy/${item.image}`,`https://www.cureofine.com/upload/physiotherapy/${item.image}`],
                //   session:item.duration,
                //   item: item,
               
                // })}
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: `https://cureofine.com/upload/ivfcat/${product1.image}` }} 
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans",
                        fontWeight: 500,
                      }}
                    >
                      {product1.name}
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
                    onPress={()=>navigation.navigate("IvfInnerScreen", {id:product1.cat_id})}
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

                  <View
                    style={{
                      backgroundColor: "#103042",
                      paddingVertical: 3,
                      width: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 1,
                      borderRadius: 2,
                      position: "absolute",
                      top: 25,
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
                }

               {
                  product3!="" &&    <TouchableOpacity
                  key={product3.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 3,
                    marginLeft: 4,
                    marginTop:2,
                    padding:4
                  }}
                  onPress={()=>navigation.navigate("HairInnerScreen", {id:product3.cat_id})}

                
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: `https://cureofine.com/upload/haircat/${product3.image}` }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans",
                        fontWeight: 500,
                      }}
                    >
                      {product3.name}
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
                    onPress={()=>navigation.navigate("HairInnerScreen", {id:product3.cat_id})}
             
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

                  <View
                    style={{
                      backgroundColor: "#103042",
                      paddingVertical: 3,
                      width: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 1,
                      borderRadius: 2,
                      position: "absolute",
                      top: 25,
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
                }

                {
                  product2!="" &&    <TouchableOpacity
                  key={product2.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 3,
                    marginLeft: 4,
                    marginTop:2,
                    padding:4
                
                  }}
                  onPress={()=>navigation.navigate("DentalInnerScreen", {id:product2.cat_id})}

                
                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: `https://cureofine.com/upload/dentalcat/${product2.image}` }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans",
                        fontWeight: 500,
                      }}
                    >
                      {product2.name}
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
                    onPress={()=>navigation.navigate("DentalInnerScreen", {id:product2.cat_id})}
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

                  <View
                    style={{
                      backgroundColor: "#103042",
                      paddingVertical: 3,
                      width: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 1,
                      borderRadius: 2,
                      position: "absolute",
                      top: 25,
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
                }       

{
                  product4!="" &&    <TouchableOpacity
                  key={product4.id}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 3,
                    marginLeft: 4,
                    marginTop:2,
                    padding:4
                
                  }}

                  onPress={()=>navigation.navigate("AyurvedaInnerScreen", {id:product4.ayu_id})}

                >
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: `https://cureofine.com/upload/ayurveda/${product4.image}` }} 
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "OpenSans",
                        fontWeight: 500,
                      }}
                    >
                      {product4.name}
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
                    onPress={()=>navigation.navigate("AyurvedaInnerScreen", {id:product4.ayu_id})}
             
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

                  <View
                    style={{
                      backgroundColor: "#103042",
                      paddingVertical: 3,
                      width: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 1,
                      borderRadius: 2,
                      position: "absolute",
                      top: 25,
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
                }
           
             

                {/* <TouchableOpacity
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
                      Session: {item.duration} minutes
                    </Text>

                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: 400,
                        fontFamily: "OpenSans",
                        marginTop: 2,
                      }}
                    >
                     Rs {item.offer_price}
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
                      Session: {item.duration} minutes
                    </Text>

                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: 400,
                        fontFamily: "OpenSans",
                        marginTop: 2,
                      }}
                    >
                     Rs {item.offer_price}
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
                      Session: {item.duration} minutes
                    </Text>

                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: 400,
                        fontFamily: "OpenSans",
                        marginTop: 2,
                      }}
                    >
                     Rs {item.offer_price}
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
                </TouchableOpacity> */}
           
            </ScrollView> 
              
      
            {
              // console.log("product1", product1)
            }
          
          </View>

        
    </>
  )
}

export default Products

// https://www.cureofine.com/upload/physiotherapy/