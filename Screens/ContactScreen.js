import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useForm, Controller,  resetField, } from "react-hook-form";
import axios from "axios";
// import Toast from 'react-native-simple-toast';
import Toast from 'react-native-toast-message';

const ContactScreen = ({ navigation }) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data.email);
     reset()
     showToast()
      const res = await axios
        .post("https://cureofine.com/api/api/contact", {
          name: data.fullname,
          email: data.email,
          message: data.message,
          phone: data.phone,
          subject: data.subject,
        })
        .then((response) => response.json())
        .then((serverResponse) => console.warn(serverResponse));
      

  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Thank you for contacting us.",
      text2: "we will get back to you soon!!",
    });

    console.log("toast called");
  };

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50 }}>
      <Header navigation={navigation}></Header>
       <Text
                    style={{
                        height: 1,
                        borderColor: "whitesmoke",
                        borderWidth: 2,
                        marginTop: 15,
                    }}
                />
      <ScrollView>
        <View style={styles.safeArea}>
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center", marginTop: 5 }}>
              <Text  allowFontScaling={false}style={{ color: "gray", fontSize: 10 }}>
                HOW CAN WE HELP ?{" "}
              </Text>
              <Text  allowFontScaling={false}style={{ color: "gray", fontSize: 15 }}>
                Feel free to contact us{" "}
              </Text>
             
            </View>
            <Text
                    style={{
                        height: 1,
                        borderColor: "whitesmoke",
                        borderWidth: 2,
                        marginTop: 10,
                    }}
                />
            <View style={{ marginTop: 20 }}>
              <Text> Your FullName*</Text>
              <View style={styles.inputBoxCont}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your FullName"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="fullname"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
              </View>
              {errors.fullname && (
                <Text  allowFontScaling={false}style={{ color: "red" }}>{errors.fullname.message}</Text>
              )}
            </View>

            <View style={styles.inputCont}>
              <Text>Your Email*</Text>
              <View style={styles.inputBoxCont}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your Email"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="email"
                  rules={{
                    required: {
                      value: true,
                      message: "Email is required!",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Not a valid email",
                      },
                    },
                  }}
                />
              </View>
              {errors.email && (
                <Text  allowFontScaling={false}style={{ color: "red" }}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.inputCont}>
              <Text>Your Phone Number*</Text>
              <View style={styles.inputBoxCont}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    keyboardType="numeric"
                      autoFocus={true}
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your Phone Number"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="phone"
                  rules={{
                    required: {
                      value: true,
                      message: "Phone number is required!",
                    },
                  }}
                />
              </View>
              {errors.phone && (
                <Text  allowFontScaling={false}style={{ color: "red" }}>{errors.phone.message}</Text>
              )}
            </View>

            <View style={styles.inputCont}>
              <Text>Subject*</Text>
              <View style={styles.inputBoxCont}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Subject"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="subject"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
              </View>
              {errors.subject && (
                <Text  allowFontScaling={false}style={{ color: "red" }}>{errors.subject.message}</Text>
              )}
            </View>

            <View style={styles.inputCont}>
              <Text>Message*</Text>

              <View style={styles.inputBoxCont}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      editable
                      multiline
                      numberOfLines={5}
                      placeholder="Enter your Message"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="message"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
              </View>
              {errors.message && (
                <Text  allowFontScaling={false}style={{ color: "red" }}>{errors.message.message}</Text>
              )}
            </View>
      

       <View style={{ marginTop: 30 }} />

          

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
                // onPress={showToast}

            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Send Your Message
              </Text>
            </TouchableOpacity>

            <Toast
        position='bottom'
        bottomOffset={80}
         />
        
          </KeyboardAvoidingView>
        
        </View>

     
        <Contact></Contact>
        <Footer></Footer>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 15,
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
    marginTop: 5,
    marginBottom: 2,
    paddingLeft: 10,
  },

  button: {
    width: 350,
    backgroundColor: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginBottom: 20,
  },
  inputCont: {
    marginTop: 10,
  },
});

export default ContactScreen;
