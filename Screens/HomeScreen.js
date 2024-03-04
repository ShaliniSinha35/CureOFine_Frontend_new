import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  StatusBar,
  Pressable,
  Alert,
  TextInput,
  BackHandler,
  TouchableOpacity
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
const { width } = Dimensions.get("window");
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Header from "../Components/Header";
import Services from "../Components/Services";
import Products from "../Components/Products";
import MostBooked from "../Components/MostBooked";
// import Categories from "../Components/Categories";
import Specialization from "../Components/Specialization";
import Brands from "../Components/Brands";
import Teams from "../Components/Teams";
import Location1 from "../Components/Location";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { Foundation } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "native-base";
import axios from "axios";
import { Select } from "native-base";
import { FlatListSlider } from 'react-native-flatlist-slider';
import { FontAwesome } from '@expo/vector-icons';
import { decode } from 'html-entities';
import RenderHtml from 'react-native-render-html';
import { ActivityIndicator } from "react-native";
import HomeBanner from "./HomeBanner";
import CallBanner from "../Components/CallBanner";
import Testimonials from "./Testimonials";
import Hospitals from "../Components/Hospitals";
import OfferBanner from "./OfferBanner";

// import { TouchableOpacity } from "react-native-gesture-handler";
SplashScreen.preventAutoHideAsync();



const Home = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [address, setAdd] = useState("");
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [selected, setSelected] = React.useState("");
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching your location"
  );
  const [bannerImage, setBaner] = useState([]);

  const [pageMenu, setpageMenu] = useState("")
  const [content, setContent] = useState("")

  const [locationId, setLocationId] = useState('')


  const getText = async () => {
    const res = await axios.get("https://cureofine.com/api/api/staticText");
    const data = res.data;

    // console.log(data)
    // console.log(decode(data[0].content))
    //  console.log(data[0].page_menu)
    setpageMenu(data[0].page_menu)
    setContent(decode(data[0].content))

  }

  useEffect(() => {
    getText()
  }, [])

  // backhandler
  useEffect(() => {

    const backAction = () => {
      Alert.alert('CureOFine', 'Are you sure you want to close the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
    ;
  }, []);


 


  // const getState = async () => {
  //   const res = await axios.get("https://cureofine.com/api/api/state");
  //   const data = res.data;
  //   // console.log(data);
  //   setState(data);
  // };
  // const getCity = async () => {
  //   const res = await axios.get("https://cureofine.com/api/api/city");
  //   const data = res.data;
  //   // console.log(data);
  //   setCity(data);
  // };

  const [cLoc, setLoc] = useState([])


  const getLocation = async () => {

    const res = await axios.get("https://cureofine.com/api/api/presence");
    const data = res.data;
    // console.log("147", data)
    // console.log("147", data)
    setLoc(data)
    setLocationId(data[0].location_id)
    setDisplayCurrentAddress(data[0].name)

    const res1 = await AsyncStorage.setItem("user", JSON.stringify(data[0].name));
    const res2 = await AsyncStorage.setItem("locationId", JSON.stringify(data[0].location_id));

  }



  useEffect(() => {
    // getState();
    // getCity();
    getLocation()
  }, []);

  useEffect(() => {
    getImage();

  }, []);

  const getImage = async () => {
    const res = await axios.get("https://cureofine.com/api/api/banner");
    const data = res.data;
    let imgArr = []
    for (let i = 0; i < data.length; i++) {

      imgArr.push({ image: `https://cureofine.com/upload/banner/${data[i].image}`, id: data[i].id });
    }
    // console.log(imgArr)
    setBaner(imgArr)
    // console.log(res.data);

  };



  const handleAddress = async (address, state, city) => {
    // console.log("called")
    setModalVisible(false);
    if (address.length > 0 || state !== "" || city !== "") {
      const fullAdd = city;
      setDisplayCurrentAddress(fullAdd);


      // const res = await AsyncStorage.setItem("user", JSON.stringify(fullAdd));
      // const res1 = await AsyncStorage.setItem("locationId", JSON.stringify(locId));
    }

  };

  const getAddress = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("user"));
    const locationId = JSON.parse(await AsyncStorage.getItem("locationId"));
    if (userData && locationId) {
      
      setDisplayCurrentAddress(userData);
      setLocationId(locationId)
    }
  

  };

  useEffect(() => {
    getAddress();
  });




  const route = useRoute();

  const [fontsLoaded] = useFonts({
    OpenSans: require("../assets/fonts/openSans.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  
  

  return (
    <>
      <SafeAreaView
        onLayout={onLayoutRootView}
        style={{
          paddinTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          flex: 1,
          backgroundColor: "white",
          // marginTop:5
        }}
      >
        <StatusBar
          backgroundColor={"white"}
          barStyle={"dark-content"}
          translucent={false}
        />




        {/* header */}
        <Header navigation={navigation}></Header>
        {/* header */}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
            padding: 10,
            backgroundColor: "#103042",
            paddingLeft: 15,
            flexWrap: "wrap",
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Ionicons name="location-outline" size={20} color="white" />

          <Pressable onPress={() => setModalVisible(!modalVisible)}>
               <Text  allowFontScaling={false} style={{ color: "white", fontSize: 15, textAlign: "center" }}>
              {displayCurrentAddress}
            </Text>
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="whitesmoke" />
        </TouchableOpacity>

        <ScrollView>
          {/* banner slider start */}
          <View style={styles.container}>
            <HomeBanner></HomeBanner>
          </View>
          {/* banner slider end */}

          {/* service section start */}
          <MostBooked navigation={navigation}></MostBooked>
          {/* <Services navigation={navigation}></Services> */}
          {/* service section end */}


             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 20,
            }}
          />

          {/* products section start */}
          <Products navigation={navigation}></Products>
          {/* products section end */}

          {/* offers & deals start */}
             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 18,
            }}
          />

          {/* <View style={styles.container}>
            <Carousel
              pagination={PaginationLight}
              renderItem={renderItem}
              data={banner2}
              loop
              autoplay
            />
          </View> */}

          {/*    <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 18,
            }}
          /> */}
          {/* offers & deals end */}

          {/* most booked services section start */}

          {/* <MostBooked navigation={navigation}></MostBooked>  */}

          {/* most booked services section end */}

          {/*    <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          /> */}

          {/* shop by category start */}

          {/* <Categories></Categories> */}

          {/* shop by category end */}

          {/*    <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          /> */}

          {/* specialization section start */}
          {/* <Specialization navigation={navigation}></Specialization> */}
          {/* specialization section end */}

          {/*    <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 18,
            }}
          /> */}

          {/* teams */}

          <Teams navigation={navigation}></Teams>
          {/* teams */}


             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              marginBottom:10
            }}
          />

          <OfferBanner></OfferBanner>


             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              marginBottom:10
            }}
          />

          <Hospitals navigation={navigation}></Hospitals>


             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 10,
            }}
          />


          {/* Testimonials start */}
          <Testimonials></Testimonials>
          {/* Testimonials end */}
             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 10,
            }}
          />

          {/* brands */}
          <Brands></Brands>
          {/* brands */}

          {/*    <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          /> */}

          {/* footer banner */}
          {/* <FlatList
            data={footerBanner}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={item.coverImageUri}
                style={{
                  width: Dimensions.get("screen").width * 1,
                  height: 180,
                  borderRadius: 10,

                  resizeMode: "contain",
                }}
              ></Image>
            )}
          ></FlatList> */}




             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 18,
            }}
          />

          <CallBanner></CallBanner>

          {/* banner */}


             <Text  allowFontScaling={false}
            style={{
              height: 3,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          {/* our presence */}
          <Location1 navigation={navigation}></Location1>
          {/* our presence */}

             <Text  allowFontScaling={false}
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
        


          {/* contact */}
          <Contact></Contact>
          {/* contact */}

          <Footer></Footer>
        </ScrollView>
      </SafeAreaView>



      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: "auto" }}>



          <Pressable style={{ position: "absolute", right: 10, top: 10 }} unstable_pressDelay={0}>
            <AntDesign name="close" size={28} color="black" style={{ zIndex: 1001 }} onPress={() => setModalVisible(!modalVisible)} />
          </Pressable>

          <View style={{ marginBottom: 8, marginTop: 8 }}>
               <Text  allowFontScaling={false} style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>
          </View>

          {cLoc.length != 0 && (
            <View style={{ marginTop: 10 }}>
                 <Text  allowFontScaling={false}
                style={{ color: "#f08080", fontWeight: 500, marginBottom: 5 }}
              >
                Choose City
              </Text>
              <Select
                selectedValue={selectedCity}
                minWidth="200"
                accessibilityLabel="Choose City"
                placeholder="Choose City"
                _selectedItem={{
                  bg: "#f08080",
                  // endIcon: <CheckIcon size="5" />,
                }}
                style={{ zIndex: 1000 }}
                mt={1}
                onValueChange={async (itemValue) => {
                  console.log("Selected City:", itemValue);

                  // Find the selected item in the cLoc array
                  const selectedLocation = cLoc.find((item) => item.name === itemValue);

                  // Check if the selectedLocation is found
                  if (selectedLocation) {
                    // Set the location_id to the id of the selectedLocation
                    setLocationId(selectedLocation.location_id);
                  } else {
                    console.warn("Selected location not found");
                  }

                  // Set the selected city
                  setSelectedCity(itemValue);

                  // Alert.alert(itemValue, selectedLocation.location_id)

                  const res = await AsyncStorage.setItem("user", JSON.stringify(itemValue));
                  const res1 = await AsyncStorage.setItem("locationId", JSON.stringify(selectedLocation.location_id));
                }}
              >
                {cLoc.map((item) => (
                  <Select.Item

                    key={item.id}
                    label={item.name}
                    value={item.name}
                  />
                ))}
              </Select>
            </View>
          )}


          {/* <View >
               <Text  allowFontScaling={false} style={{ color: "#f08080", fontWeight: 500, marginTop: 10 }}>
              Your Address
            </Text>
            <View style={styles.inputBoxCont}>
                 <Text  allowFontScaling={false}Input
                editable
                multiline
                numberOfLines={3}
                maxLength={50}
                onChangeText={(text) => setAdd(text)}
                value={address}
                style={{
                  color: "gray",
                  alignItems: "flex-start",
                  width: 300,
                  fontSize: 12,
                  zIndex:1000
                }}
                placeholder="Enter Your Address"
              />
            </View>
          </View> */}


          <View style={{ marginTop: 30 }} />

          <Pressable
            onPress={() => handleAddress(address, selectedState, selectedCity)}
            unstable_pressDelay={0}
            style={{ backgroundColor: "#f08080", padding: 18, zIndex: 1005 }}
          >
               <Text  allowFontScaling={false} style={{ textAlign: "center", fontSize: 18, color: "white" }}>
              Add Your Address
            </Text>
          </Pressable>

        </ModalContent>
      </BottomModal>


    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },

  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    // borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    // width: width * 0.9,
    height: width * 0.5,
    width: width,
    resizeMode: "contain",
  },

  imgContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 200,
    color: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    borderColor: "#f08080",
    borderWidth: 2,
    marginTop: 18,
  },
  heading: {
    paddingTop: 14,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 7,
    fontFamily: "OpenSans",
  },

  cardContainer1: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper1: {
    borderRadius: 10,
    overflow: "hidden",
  },
  card1: {
    width: width * 1,
    height: width * 0.5,
    resizeMode: "contain",
  },
  inputBoxCont: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 15,
    paddingVertical: 5,
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: "gray",
    paddingLeft: 10,
  },
  button1: {
    width: 120,
    backgroundColor: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginBottom: 20,
  },
});

export default Home;



// <ImageBackground
// source={require("../assets/cure.jpg")}
// style={{
//   width: "100%",
//   height: 200,
//   resizeMode: "cover",
//   marginTop: 15,
// }}
// >
// <View
//   style={{
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//      <Text  allowFontScaling={false}
//     style={{ fontWeight: "bold", fontSize: 26, color: "white" }}
//   >
//     {/* Need a Doctor for Checkup? */}
//     {pageMenu}
//   </Text>
//      <Text  allowFontScaling={false} style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>
//     {/* Just make an Appointment & You're Done! */}


//     <RenderHtml tagsStyles={tagsStyles} source={{ html: decode(content) }} contentWidth={width} ></RenderHtml>


//   </Text>
//   <TouchableOpacity
//     style={styles.button}
//     onPress={() => Linking.openURL("tel:7250446555")}
//   >
//        <Text  allowFontScaling={false}
//       style={{
//         textAlign: "center",
//         color: "#f08080",
//         fontSize: 16,
//         fontWeight: "bold",
//       }}
//     >
//       Call Us Now
//     </Text>
//   </TouchableOpacity>
// </View>
// </ImageBackground>



// http://192.168.0.164:3000/state