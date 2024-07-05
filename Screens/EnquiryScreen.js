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
  Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { FontAwesome } from '@expo/vector-icons';
const EnquiryScreen = ({ navigation }) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();



  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Your enquiry is successfully received.",
      text2: "We will get back to you soon!!",
    });

    console.log("toast called");
  };


  const onSubmit = async (data) => {
    console.log(data);
    reset()


    const res = await axios.post("https://cureofine.com/api/api/enquiry", {
      name: data.fullname,
      email: data.email,
      message: data.message,
      phone: data.phone,
      city: data.city,
      address: data.address
    })
      .then((response) => response.json())
      .then((serverResponse) => console.warn(serverResponse));

    showToast()

  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50 }}>
      <Header navigation={navigation}></Header>
        <ScrollView>
        <View style={styles.safeArea}>
          <KeyboardAvoidingView>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text  allowFontScaling={false} style={{ color: "gray", fontSize: 10 }}>
                Have any Enquiry?
              </Text>
              <Text  allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>
                Feel free to contact us
              </Text>
            </View>

            <View>



              <View style={styles.inputBoxCont}>
                <FontAwesome5
                  name="phone-alt"
                  size={24}
                  color="#f08080"
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
                      style={{
                        color: "#fff",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your Phone Number"
                      placeholderTextColor="white"
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
                <Text  allowFontScaling={false} style={{ color: "red" }}>{errors.phone.message}</Text>
              )}
            </View>

            <View style={{ marginTop: 8 }}>
              <View style={styles.inputBoxCont}>
              <FontAwesome name="user" size={24} color="#f08080"   style={{ marginLeft: 8 }} />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{
                        color: "#fff",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your FullName"
                      placeholderTextColor="white"
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
                <Text  allowFontScaling={false} style={{ color: "red" }}>{errors.fullname.message}</Text>
              )}
            </View>

            <View>
              <View style={styles.inputBoxCont}>
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="email"
                  size={24}
                  color="#f08080"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{
                        color: "#fff",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your Email"
                      placeholderTextColor="white"
                    />
                  )}
                  name="email"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
              </View>

              {errors.email && (
                <Text  allowFontScaling={false} style={{ color: "red" }}>{errors.email.message}</Text>
              )}
            </View>



            <View>
              <View style={styles.inputBoxCont}>
                <MaterialIcons
                  name="location-city"
                  size={24}
                  color="#f08080"
                  style={{ marginLeft: 8 }}
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{
                        color: "#fff",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your City"
                      placeholderTextColor="white"
                    />
                  )}
                  name="city"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
              </View>
              {errors.city && (
                <Text  allowFontScaling={false} style={{ color: "red" }}>{errors.city.message}</Text>
              )}
            </View>

            <View>
              <View  style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: "#103042",
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 18,
        width: Dimensions.get('screen').width * 0.9,
    }}>
                <Ionicons
                  name="location-sharp"
                  size={24}
                  color="#f08080"
                  style={{ marginLeft: 8 }}
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    multiline 
                      autoFocus={true}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{
                        color: "#fff",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="Enter your Address"
                      placeholderTextColor="white"
                    />
                  )}
                  name="address"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required!",
                    },
                  }}
                />
              </View>

              {errors.address && (
                <Text  allowFontScaling={false} style={{ color: "red" }}>{errors.address.message}</Text>
              )}


            </View>

            <View>
              <View  style={{
       flexDirection: "row",
       alignItems: "center",
       gap: 7,
       backgroundColor: "#103042",
       paddingVertical: 5,
       borderRadius: 5,
       marginTop: 18,
       width: Dimensions.get('screen').width * 0.9,
    }}>
                <Entypo
                  name="message"
                  size={24}
                  color="#f08080"
                  style={{ marginLeft: 8 }}
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    multiline 
                      numberOfLines={4}
                      style={{
                        color: "#fff",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="Enter your Message"
                      placeholderTextColor="white"
                      
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
                <Text  allowFontScaling={false} style={{ color: "red" }}>{errors.message.message}</Text>
              )}   
            </View>

            <View style={{ marginTop: 30 }}></View>
            <TouchableOpacity
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
                Submit
              </Text>
            </TouchableOpacity>



            <Toast
              position='bottom'
              bottomOffset={80}
            >

            </Toast>

          </KeyboardAvoidingView>

        </View>


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
    backgroundColor: "#103042",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 18,
  },

  button: {
    width: 150,
    backgroundColor: "#f08080",
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 15,
    marginBottom: 20,
  },
});

export default EnquiryScreen;
