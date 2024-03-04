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



  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();




  const onSubmit = async (data) => {
    console.log(data.phone);

    var phoneno = /^\d{10}$/;
    if ((data.phone.match(phoneno))) {
      const res = await axios.post("https://cureofine.com/api/api/generateOtp", {
      
          phone: data.phone
        })
   

      if(res.data.message == "OTP generated and sent successfully"){
        await navigation.navigate("OtpScreen", {number:res.data.number});
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
    

     };
  }

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };


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
  <View style={styles.inputBoxCont}>
    <FontAwesome5
      name="phone-alt"
      size={24} 
      color="gray"
      style={{ marginLeft: 8 }}
    />

    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          keyboardType="numeric"
          autoFocus={true}
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          style={styles.phoneNumberInput}
          placeholder="Enter your Phone Number"
          accessibilityLabel="Phone Number"
        />
      )}
      name="phone"
      rules={{
        required: {
          value: true,
          message: "This field is required!",
        },
      }}
    />
  </View>

  {errors.phone && (
    <Text style={styles.errorText}>{errors.phone.message}</Text>
  )}

  {err !== "" && <Text style={styles.errorText}>{err}</Text>}
</View>




          <View style={{ marginTop: 45 }} />

          <TouchableOpacity
            delayPressIn={0}
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
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
    backgroundColor: "#D0D0D0",
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 40,
    width:250
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

