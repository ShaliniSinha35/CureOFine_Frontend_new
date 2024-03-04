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
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="enter your Phone Number"
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
              <FontAwesome name="user" size={24} color="gray"   style={{ marginLeft: 8 }} />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      autoFocus={true}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      style={{
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="enter your FullName"
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
                  color="gray"
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
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="enter your Email"
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
                  color="gray"
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
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="enter your City"
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
              <View style={styles.inputBoxCont}>
                <Ionicons
                  name="location-sharp"
                  size={24}
                  color="gray"
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
                        color: "gray",
                        marginVertical: 10,
                        width: 300,
                        fontSize: 16,
                      }}
                      placeholder="enter your Address"
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
              <View style={styles.inputBoxCont}>
                <Entypo
                  name="message"
                  size={24}
                  color="gray"
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
                      editable
                      multiline
                      numberOfLines={5}
                      placeholder="enter your Message"
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
    backgroundColor: "#D0D0D0",
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
