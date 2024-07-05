import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Pressable,
  BackHandler
} from "react-native";
import axios from "axios";
import { TextInput } from "react-native";
import { useDispatch } from 'react-redux';
import { useRoute } from "@react-navigation/native";

const OtpScreen = ({ navigation }) => {
  const route = useRoute();
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [route.params.number]);

  const startTimer = () => {
    setTimer(30); // Reset timer
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setShowResend(true);
          clearInterval(timerRef.current);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  };

  const resendOtp = async () => {
    try {
      const res = await axios.post("https://cureofine.com/api/api/generateOtp", {
        phone: route.params.number
      });
      if (res.data) {
        if (res.data) {
          setFlag(true);
          setShowResend(false); // Hide Resend OTP button
          startTimer();
          setTimeout(() => {
            setFlag(false);
          }, 2000);
        }}
    } catch (err) {
      console.log(err.message);
    }
  };

  const onSubmit = async () => {
    if (code.length === 6) {
      try {
        const res = await axios.post("https://cureofine.com/api/api/verifyOTP", {
          phone: route.params.number,
          otp: code
        });

        if (res.data.message === "OTP verification successful") {
          console.log(res.data.results);
          console.log("OTP verification was successful");
          dispatch({ type: 'SET_USER_INFO', payload: { number: route.params.number, id: res.data.results } });
          // Navigate to the next page here if the OTP is verified.
          // await navigation.navigate("Home");
        } else {
          console.log("OTP verification failed");
          setErr("Incorrect OTP");
          setTimeout(() => {
            setErr("");
          }, 3000);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setErr("Invalid OTP");
        setTimeout(() => {
          setErr("");
        }, 3000);
      }
    } else {
      setErr("Incorrect OTP");
      setTimeout(() => {
        setErr("");
      }, 3000);
    }
  };


  const resetState = () => {
    setCode("");
    setErr("");
    setFlag(false);
    setShowResend(false);
    setTimer(30);
    clearInterval(timerRef.current);
  };

  const handleChange = () => {
    resetState();
    navigation.navigate("Login");
  };




  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Image style={styles.img} source={require("../assets/logo.png")} />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text allowFontScaling={false} style={styles.heading}>Enter Your OTP</Text>
          </View>

          <View>
            <TextInput
              onChangeText={(value) => {
                setCode(value);
                if (!flag) {
                  setFlag(true); // Start the timer when user interacts with input
                  startTimer();
                }
              }}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: 16,
                borderBottomWidth: 2,
                borderColor: "#f08080",
                marginTop: 30,
                padding: 10,
              }}
              value={code}
              placeholder="Enter your 6-digit code here"
              keyboardType="numeric"
            />
            
            <View style={{flexDirection:"row"}}>
            <Text style={{ color: "black",fontSize:12 }}>OTP has been sent to  </Text>
            <Text style={{ color: "red",fontSize:12,marginRight:5 }}>{route.params.number}</Text>
             <Pressable onPress={()=>handleChange()}><Text style={{ color: "#103042",fontSize:12,fontWeight:500}}>Change</Text></Pressable>
            </View>

            {err !== "" && <Text allowFontScaling={false} style={{ color: "red" }}>{err}</Text>}
          </View>

          <View style={{ marginTop: 55 }} />

          <TouchableOpacity
            delayPressIn={0}
            style={styles.button}
            onPress={onSubmit}
            disabled={code.length !== 6}
          >
            <Text allowFontScaling={false} style={styles.buttonText}>
              Verify
            </Text>
          </TouchableOpacity>

          {showResend && (
            <TouchableOpacity
              delayPressIn={0}
              style={[styles.button, { marginTop: 20, backgroundColor: "#f08080" }]}
              onPress={resendOtp}
              disabled={flag}
            >
              <Text allowFontScaling={false} style={styles.buttonText}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}

          {!showResend && (
            <Text allowFontScaling={false} style={{textAlign:"center",fontSize:12}}>
              Resend OTP in {timer} seconds
            </Text>
          )}
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
  button: {
    width: 200,
    backgroundColor: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
});
