import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  BackHandler
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Toast from 'react-native-toast-message';



const LoginScreen = ({ navigation }) => {

  const [phone, setPhone] = useState("");
  const [valid, setValid] = useState(false);
  const [err, setErr] = useState("");
  const [flag, setFlag] = useState(false);


  const [highlight,setHighlight] = useState(false)

  const [isFormValid, setIsFormValid] = useState(false);


  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [phone]);

  const validateForm = () => {
    let errors = {};

    if (!phone) {
      errors.phone = "Invalid Number";
    } else if (phone.length !== 10) {
      errors.phone = "Incorrect Mobile Number";
    }



    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };


  const onSubmit = async () => {



    if (isFormValid) {
      const res = await axios.post("https://cureofine.com/api/api/generateOtp", {
      
          phone: phone
        })
   
      

      if(res.data.message == "OTP generated and sent successfully"){
        setPhone("")
        await navigation.navigate("OtpScreen", {number:res.data.number});
      }
      else{
        let errors = {};

     
          errors.phone = "Invalid Mobile Number";
      
    
    
    
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
      }


      // console.log("75",res.data)

    //   if (res.data.message == "Valid Number") {
    //     await navigation.navigate("OtpScreen");
    //   }
    // }
    // else {
    //   setErr("Inavalid Number");
    //   setTimeout(() => {
    //     setErr("")
    //   }, 3000)
    //   reset();
    // }
    

     }

     else {
      setFlag(true);
    }
  }


  useEffect(() => {

    const backAction = () => {
      navigation.navigate("Home")
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

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "OTP Sent Successfully !!.",

    });


  };
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Image style={styles.img} source={require("../assets/logo.png")} />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text  allowFontScaling={false} style={styles.heading}>Login In to your Account</Text>
          </View>


          <View>
  <Pressable style={[styles.inputBoxCont]} >
    <FontAwesome5
      name="phone-alt"
      size={24} 
      color="#f08080"
      style={{ marginLeft: 8 }}
    />

<TextInput
          keyboardType="numeric"
          autoFocus={true}
          // onTouchStart={()=>setHighlight(true)}
          // onTouchEnd={()=>setHighlight(false)}
        
          onChangeText={(value) => setPhone(value)}
          value={phone}
        style={{color:"#fff",fontSize:18}}
        
          placeholder="Enter your number"
          placeholderTextColor="#fff" 
          accessibilityLabel="Phone Number"
        />


  </Pressable>

  {errors.phone && flag && <Text style={{ color: "red" }}>{errors.phone}</Text>}
  </View>





          <View style={{ marginTop: 45 }} />

          <TouchableOpacity
         
            style={styles.button}
            onPress={()=>onSubmit()}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>


         
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;




const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 70,
  },
  img: {
    width: 150,
    height: 100,
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
    gap: 10,
    backgroundColor: "#103042",
    paddingVertical: 15,
    paddingHorizontal:15,
    borderRadius: 5,
    marginTop: 40,
    width:Dimensions.get('screen').width * 0.9
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
});



 {/* <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 15 }}
          >
            <Text  allowFontScaling={false} style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable> */}

          {/* <Toast
            position='bottom'
            bottomOffset={80}
          /> */}

