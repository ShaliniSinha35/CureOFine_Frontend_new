import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/actions/userActions";
import { useRoute } from "@react-navigation/native";

const OtpScreen = ({ navigation }) => {


  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const route = useRoute()
  console.log(route.params.number)
  const [code, setCode] = useState("");
  const [err, setErr] = useState("")
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const onSubmit = async () => {

    if (code.length == 6) {
      try {
        const res = await axios.post("https://cureofine.com/api/api/verifyOTP", {
          phone: route.params.number,
          otp: code
        })

        if (res.data.message == "OTP verification successful") {
          console.log("OTP verification was successful");
          console.log(res.data.number)
          dispatch({ type: 'SET_USER_INFO', payload: route.params.number  });
    
 // You can navigate to the next page here if the OTP is verified.
        await navigation.navigate("Home");
        
      
        } else {
          console.log("OTP verification failed");
          setErr("Incorrect OTP")
          setTimeout(() => {
            setErr("")
          }, 3000)



          // navigation.navigate("Login");
          // Handle the case where the OTP verification failed, e.g., show an error message to the user.
        }
      }

      catch (error) {
        console.error("An error occurred:", error);
        setErr("Invalid OTP")
        setTimeout(() => {
          setErr("")
        }, 3000)

      }
    }

    else {
      setErr("Incorrect OTP");
      setTimeout(() => {
        setErr("")
      }, 3000)
    }




    // if (code.length == 6) {
    //   try {
    //     const response = await axios.post("https://cureofine.com/api/api/verify", {
    //       otp: code,
    //     });

    //     console.log(response.data);


    //     if (response.data.message === "OTP verification successful") {
    //       console.log("OTP verification was successful");
    //       console.log(response.data.number)
    //       dispatch(setUser(response.data.number));
    //       storeData(response.data.number)
    //       // You can navigate to the next page here if the OTP is verified.
    //       await navigation.navigate("Home");
    //     } else {
    //       console.log("OTP verification failed");
    //       setErr("Incorrect OTP")
    //       setTimeout(() => {
    //         setErr("")
    //       }, 3000)
    //       // navigation.navigate("Login");
    //       // Handle the case where the OTP verification failed, e.g., show an error message to the user.
    //     }
    //   }
    //    catch (error) {
    //     console.error("An error occurred:", error);
    //     setErr("Invalid OTP")
    //     setTimeout(() => {
    //       setErr("")
    //     }, 3000)

    //   }
    // }

    // else {
    //   setErr("Incorrect OTP");
    //   setTimeout(() => {
    //     setErr("")
    //   }, 3000)
    // }



  };





  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Image style={styles.img} source={require("../assets/logo.png")} />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
               <Text  allowFontScaling={false} style={styles.heading}>Enter Your OTP</Text>
          </View>

          <View>
               <TextInput
              onChangeText={(value) => setCode(value)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 16,
                borderBottomWidth: 2,
                borderColor: "#f08080",
                marginTop: 30,
                padding: 40,
              }}
              value={code}
              placeholder="Enter your 6-digits code here"
              keyboardType="numeric"
            ></TextInput>

            {err !== "" &&    <Text  allowFontScaling={false} style={{ color: "red" }}>{err}</Text>}
          </View>

          <View style={{ marginTop: 85 }} />

          <TouchableOpacity delayPressIn={0} style={styles.button} onPress={onSubmit}>
               <Text  allowFontScaling={false}
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Verify
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};


export default OtpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 70,
  },
  img: {
    width: 200,
    height: 120,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    color: "#041E42",
  },
  inputBoxCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#D0D0D0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  forgotCont: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    width: 200,
    backgroundColor: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
