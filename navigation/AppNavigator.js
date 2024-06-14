import {
  View,
  Text,
  Button,
  Pressable,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Screens/HomeScreen";
import AboutScreen from "../Screens/AboutScreen";
import EnquiryScreen from "../Screens/EnquiryScreen";
import ServiceScreen from "../Screens/ServiceScreen";
import LoginScreen from "../Screens/LoginScreen";
import Presence from "../Screens/Presence";
import Terms from "../Screens/Terms";
import Faq from "../Screens/Faq";
import Privacy from "../Screens/Privacy";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Refund from "../Screens/Refund";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Refer from "../Screens/Refer";
import ShareScreen from "../Screens/Share";
import Consultation from "../Screens/Consultation";
import Surgery from "../Screens/Surgery";
import Physiotherapy from "../Screens/Physiotherapy";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProductInfoScreen from "../Screens/ProductInfoScreen";
import ServiceInfoScreen from "../Screens/ServiceInfoScreen";
import SurgeryInfoScreen from "../Screens/SurgeryInfoScreen";
import { Linking } from "react-native";
import * as Sharing from "expo-sharing";
import { Share } from "react-native";
import ContactScreen from "../Screens/ContactScreen";
import OtpScreen from "../Screens/OtpScreen";
import SingleTeamScreen from "../Screens/SingleTeamScreen";
import HomeBanner from "../Screens/HomeBanner";
import SurgeryInnerScreen from "../Screens/SurgeryInnerScreen";
import SurgeryList from "../Screens/SurgeryList";
import IVF from "../Screens/IVF";
import Dental from "../Screens/Dental";
import HairCosmetic from "../Screens/HairCosmetic";
import Ayurveda from "../Screens/Ayurveda";
import IvfInnerScreen from "../Screens/IvfInnerScreen";
import DentalInnerScreen from "../Screens/DentalInnerScreen";
import HairInnerScreen from "../Screens/HairInnerScreen";
import AyurvedaInnerScreen from "../Screens/AyurvedaInnerScreen";
import DoctorInnerScreen from "../Screens/DoctorInnerScreen";
import HospitalInnerScreen from "../Screens/HospitalInnerScreen";
import BookingScreen from "../Screens/BookingScreen";
import EmiScreen from "../Screens/EmiScreen";
import { useSelector, useDispatch } from 'react-redux';
import LogoutScreen from "../Screens/LogoutScreen";
import { logoutUser } from "../redux/actions/userActions";
import ProfileScreen from "../Screens/ProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DashboardScreen from "../Screens/DashboardScreen";
import TreatmentScreen from "../Screens/TreatmentScreen";
import VideoConsultation from "../Screens/VideoConsultation";
import VoiceConsultation from "../Screens/VoiceConsultation";
import ChatConsultation from "../Screens/ChatConsultation";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const AppNavigator = () => {

  const userInfo = useSelector(state => state.user.userInfo);
  useEffect(()=>{

  },[userInfo])

  const drawerMenu = [
    {
      id: 0,
      name: "Our Services",
      submenu: [
        { id: 0, name: "Doctor Consultation", url: "Consultation" },
        { id: 1, name: "Surgery", url: "SurgeryList" },
        { id: 2, name: "IVF", url: "IVF" },
        { id: 3, name: "Dental", url: "Dental" },
        { id: 4, name: "Hair & Cosmetic", url: "Hair & Cosmetic" },
        { id: 5, name: "Ayurveda", url: "Ayurveda" }

      ],
      icon: <MaterialIcons name="medical-services" size={24} color="white" />,
      dropdownIcon: <AntDesign name="down" size={20} color="white" />,
      url: "Consulation",
    },
    {
      id: 1,
      name: "Our Presence",
      url: "PresenceScreen",
      icon: <Entypo name="location" size={24} color="white" />,
    },
    {
      id: 8,
      name: "Contact Us",
      url: "ContactScreen",
      icon: <MaterialIcons name="contact-page" size={24} color="white" />,
    },
    {
      id: 2,
      name: "Terms & Conditions",
      url: "TermScreen",
      icon: <Foundation name="clipboard-pencil" size={24} color="white" />,
    },
    {
      id: 3,
      name: "Privacy Policy",
      url: "PrivacyScreen",
      icon: <MaterialIcons name="security" size={24} color="white" />,
    },
    {
      id: 4,
      name: "FAQ",
      url: "FaqScreen",
      icon: (
        <MaterialCommunityIcons
          name="comment-question-outline"
          size={24}
          color="white"
        />
      ),
    },
    {
      id: 5,
      name: "Refund Policy",
      url: "RefundScreen",
      icon: (
        <MaterialCommunityIcons name="cash-refund" size={24} color="white" />
      ),
    },
    // {
    //   id: 6,
    //   name: "Refer a friend",
    //   url: "ReferScreen",
    //   icon: <FontAwesome name="slideshare" size={24} color="white" />,
    // },
    {
      id: 7,
      name: userInfo?"Logout":"Login",
      url: "Login",
      icon: userInfo?<MaterialCommunityIcons name="logout" size={24} color="white" />:<Ionicons name="enter" size={24} color="white"></Ionicons> ,
    }
  ];


  const dispatch = useDispatch();


  const handleLogout = () => {
    // Dispatch the logoutUser action to set userInfo to null
    dispatch({ type: 'CLEAR_USER_INFO' });
  };

  const onShare = async (url) => {
    try {
      const result = await Share.share({
        message: "Cure O Fine | Healthcare application" + "\n" + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const shareToWhatsApp = (text) => {
    // Linking.openURL(`whatsapp://send?text=${text}`);
    const options = {
      message: "Download Our app by clicking on this below link",
      url: text,
    };
    Share.open(options)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // #1e272e

  function StackNavigator() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PresenceScreen"
          component={Presence}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermScreen"
          component={Terms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyScreen"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FaqScreen"
          component={Faq}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RefundScreen"
          component={Refund}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReferScreen"
          component={Refer}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="ShareScreen" component={ShareScreen} />
        <Stack.Screen
          name="ContactScreen"
          component={ContactScreen}
          options={{ headerShown: false }}
        />
       <Stack.Screen
  name="Consultation"
  component={Consultation}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="Doctor Consultation"
  component={Consultation}
  options={{ headerShown: false }}
/>
        <Stack.Screen
          name="Surgery"
          component={SurgeryList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Physiotherapy"
          component={Physiotherapy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductInfo"
          component={ProductInfoScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ServiceInfo"
          component={ServiceInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurgeryInfo"
          component={SurgeryInfoScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="SingleTeam"
          component={SingleTeamScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurgeryInner"
          component={SurgeryInnerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurgeryList"
          component={SurgeryList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IVF"
          component={IVF}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dental"
          component={Dental}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hair & Cosmetic"
          component={HairCosmetic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ayurveda"
          component={Ayurveda}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IvfInnerScreen"
          component={IvfInnerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DentalInnerScreen"
          component={DentalInnerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HairInnerScreen"
          component={HairInnerScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AyurvedaInnerScreen"
          component={AyurvedaInnerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorInnerScreen"
          component={DoctorInnerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HospitalInnerScreen"
          component={HospitalInnerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookingScreen"
          component={BookingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmiScreen"
          component={EmiScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />


<Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="TreatmentScreen"
          component={TreatmentScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="VideoConsultation"
          component={VideoConsultation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VoiceConsultation"
          component={VoiceConsultation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatConsultation"
          component={ChatConsultation}
          options={{ headerShown: false }}
        />


{/* <Stack.Screen
          name="PaymentStatusScreen"
          component={PaymentStatusScreen}
          options={{ headerShown: false }}
        /> */}
      </Stack.Navigator>
    );
  }

  const DrawerContent = ({ navigation }) => {
    const [submenuVisible, setSubmenuVisible] = useState(false);

    const toggleSubmenu = () => {
      setSubmenuVisible(!submenuVisible);
    };
    return (
      <ScrollView style={{ flex: 1, paddingTop: 10 }}>
        <Entypo
          name="cross"
          size={35}
          color="white"
          onPress={() => navigation.closeDrawer()}
          style={{ marginLeft: 10 }}
        />
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <FlatList
        keyExtractor={(item) => item.id.toString() + item.name}

            data={drawerMenu}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View
                key={item.id}
                style={{ justifyContent: "center", gap: 5, padding: 5 }}
              >
                {item.submenu ? (
                  <>
                    <TouchableOpacity
                      onPress={toggleSubmenu}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 15,
                        gap: 12,
                      }}
                    >
                      {item.icon}
                         <Text  allowFontScaling={false} style={{ fontSize: 17, color: "white" }}>
                        {item.name}
                      </Text>
                      <View style={{ marginLeft: 10 }}>
                        {item.dropdownIcon}
                      </View>
                    </TouchableOpacity>
                    {submenuVisible && (
                      <View style={styles.submenu}>
                        {item.submenu.map((subitem) => (
                          <TouchableOpacity
                            key={subitem.id}
                            onPress={() => navigation.navigate(subitem.url)}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              padding: 15,
                              gap: 12,
                            }}
                          >
                            <AntDesign
                              name="arrowright"
                              size={24}
                              color="white"
                            />
                               <Text  allowFontScaling={false} style={{ fontSize: 15, color: "white" }}>
                              {subitem.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </>
                ) : (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 15,
                      gap: 12,
                    }}
                    onPress={() => {
                      item.name == "Logout"
                        ? handleLogout()
                        
                        // onShare(
                        //   `https://expo.dev/artifacts/eas/5ua1tSJD4RS22HLuiVNHzJ.apk`
                        // )
                        :
                        navigation.navigate(item.url);
                    }}
                  >
                    {item.icon}
                       <Text  allowFontScaling={false} style={{ fontSize: 17, color: "white" }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}

                   <Text  allowFontScaling={false}
                  style={{
                    height: 1,
                    borderColor: "#ffe4c4",
                    borderWidth: 0.2,
                    marginTop: 0,
                  }}
                />
              </View>
            )}
                 

          />
        </View>
      </ScrollView>
    );
  };

  const BottomNavigator = () => {


    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="clinic-medical" size={24} color="#f08080" />
              ) : (
                <FontAwesome5 name="clinic-medical" size={24} color="gray" />
              ),
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarLabel: "About",
            headerShown: false,
            tabBarLabelStyle: { color: "black" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="infocirlce" size={24} color="#f08080" />
              ) : (
                <AntDesign name="infocirlce" size={24} color="gray" />
              ),
          }}
        />

        <Tab.Screen
          name="Services"
          component={ServiceScreen}
          options={{
            tabBarLabel: "Services",
            tabBarLabelStyle: { color: "black" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Fontisto name="doctor" size={24} color="#f08080" />
              ) : (
                <Fontisto name="doctor" size={24} color="gray" />
              ),
          }}
        />

        <Tab.Screen
          name="Enquiry"
          component={EnquiryScreen}
          options={{
            headerShown: false,
            tabBarLabel: "Enquiry",
            tabBarLabelStyle: { color: "black" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <MaterialCommunityIcons
                  name="file-question"
                  size={24}
                  color="#f08080"
                />
              ) : (
                <MaterialCommunityIcons
                  name="file-question"
                  size={24}
                  color="gray"
                />
              ),
          }}
        />
        <Tab.Screen
          name={userInfo ? "DashboardScreen" : "Login"}
          component={userInfo ? DashboardScreen : LoginScreen}
          options={{
          headerShown: false,
          tabBarLabel: userInfo ? "Profile" : "Login",
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) => (
            focused ? (
            userInfo? <FontAwesome5 name="hospital-user" size={24} color="#f08080" />: <Ionicons name="enter" size={24} color="#f08080"  />
            ) : (
              userInfo? <FontAwesome5 name="hospital-user" size={24} color="#f08080" />: <Ionicons name="enter" size={24} color="gray"  />
            )
          ),
        }}
      />

      </Tab.Navigator>
    )
  }






  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f08080",
            width: 240,
            opacity: 1,
          },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
  submenu: {
    borderColor: "#ffe4c4",
    borderTopWidth: 0.2,
  },
  submenuItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
});

export default AppNavigator;