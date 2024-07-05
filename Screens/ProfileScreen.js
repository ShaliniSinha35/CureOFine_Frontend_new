import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Select } from "native-base";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../Components/Header";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

const ProfileScreen = ({ navigation }) => {
  const [editableFullName, setEditableFullName] = useState("");
  const [editableCity, setEditableCity] = useState("");
  const [editableState, setEditableState] = useState("");
  const [editableCountry, setEditableCountry] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [editablePincode, setEditablePincode] = useState("");
  const [editableGender, setEditableGender] = useState("");
  const [editableProfileImage, setEditableProfileImage] = useState("");

  const [profileData, setProfile] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [imageName, setImage] = useState("");

  const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number:null);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // iOS closes the picker on selection
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uriParts = result.assets[0].uri.split('/');
      const imageName = uriParts[uriParts.length - 1];
      setPhoto(result.assets[0].uri);
      setImage(imageName);
    } else {
      Alert.alert("You did not select any image.");
    }
  };

  const [gender, setGender] = React.useState("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const getProfileData = async () => {
    try {
      const res = await axios.get("https://cureofine.com/api/api/userInfo", {
        params: {
          phone: userInfo,
        },
      });

      if (res.data && res.data.length > 0) {
        const initialProfile = res.data[0];
        setProfile(initialProfile);

        setEditableFullName(initialProfile.name || "");
        setEditableCity(initialProfile.city || "");
        setEditableState(initialProfile.state || "");
        setEditableCountry(initialProfile.country || "");
        setEditableEmail(initialProfile.email || "");
        setEditablePincode(initialProfile.pincode || "");
        setEditableGender(initialProfile.gender || "");
        setEditableProfileImage(initialProfile.image || "");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [userInfo]);

//   useEffect(() => {
//     if (profileData) {
//       setEditableFullName(profileData.name);
//       setEditableCity(profileData.city);
//       setEditableState(profileData.state);
//       setEditableCountry(profileData.country);
//       setEditableEmail(profileData.email);
//       setEditablePincode(profileData.pincode);
//       setEditableGender(profileData.gender);
//       setEditableProfileImage(profileData.image);
//     }
//   }, [profileData]);

  const onSubmit = async (data) => {
    console.log(data.fullname,editableFullName)
    const res = await axios.post("https://cureofine.com/api/api/updateProfile", {
      phone: userInfo,
      name: data.fullname ? data.fullname : editableFullName,
      city:data.city ? data.city : editableCity,
      state: data.state ? data.state : editableState,
      country: data.country ? data.country : editableCountry,
      email:data.email ? data.email : editableEmail,
      pincode:data.pincode ? data.pincode : editablePincode,
      gender: gender ? gender : editableGender,
      image: imageName ? imageName : editableProfileImage,
    });

    if (res.data.message === "Updation successful") {
      getProfileData();
    }

    showToast();

  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Your profile is updated.",
    });
  };

  return (
    
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50 }}>
    <Header navigation={navigation}></Header>
       <Text  allowFontScaling={false}
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
                       <Text  allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>
                        ACCOUNT DETAILS
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                       <Text  allowFontScaling={false} >FullName</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            editable
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    autoFocus={true}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}

                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setEditableFullName(value);
                                        onChange(value);
                                      }}
                                    
                                      value={editableFullName}
                                />
                            )}
                            name="fullname"

                        />
                    </View>

                </View>
                <View style={{ marginTop: 20 }}>
                       <Text  allowFontScaling={false}>City</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    autoFocus={true}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}

                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setEditableCity(value);
                                        onChange(value);
                                      }}
                                      value={editableCity}
                                />
                            )}
                            name="city"

                        />
                    </View>

                </View>
                <View style={{ marginTop: 20 }}>
                       <Text  allowFontScaling={false} >State</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    autoFocus={true}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}

                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setEditableState(value);
                                        onChange(value);
                                      }}
                                      value={editableState}
                                />
                            )}
                            name="state"

                        />
                    </View>

                </View>
                <View style={{ marginTop: 20 }}>
                       <Text  allowFontScaling={false} >Country</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    autoFocus={true}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}

                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setEditableCountry(value);
                                        onChange(value);
                                      }}
                                      value={editableCountry}
                                />
                            )}
                            name="country"

                        />
                    </View>

                </View>
                <View style={styles.inputCont}>
                       <Text  allowFontScaling={false} >Email</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}

                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setEditableEmail(value);
                                        onChange(value);
                                      }}
                                      value={editableEmail}
                                />
                            )}
                            name="email"

                        />
                    </View>

                </View>

                <View style={styles.inputCont}>
                       <Text  allowFontScaling={false} >Mobile Number</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    keyboardType="numeric"
                                    autoFocus={true}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}
                                    // placeholder="enter your Phone Number"
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    value={userInfo}
                                />
                            )}
                            name="phone"

                        />
                    </View>

                </View>

                <View style={styles.inputCont}>
                       <Text  allowFontScaling={false} >Pincode</Text>
                    <View style={styles.inputBoxCont}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                   <TextInput  allowFontScaling={false}
                                    keyboardType="numeric"
                                    autoFocus={true}
                                    style={{
                                        color: "white",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}

                                    onBlur={onBlur}
                                    onChangeText={(value) => {
                                        setEditablePincode(value);
                                        onChange(value);
                                      }}
                                      value={editablePincode}
                                />
                            )}
                            name="pincode"

                        />
                    </View>

                </View>

                <View style={styles.inputCont}>
                       <Text  allowFontScaling={false} >Gender</Text>
                    <Select style={{ backgroundColor: "#103042",color:"white",fontSize:18 }} selectedValue={editableGender} minWidth="200" accessibilityLabel="Select Gender" placeholder="Select Gender" _selectedItem={{
                        bg: "#D0D0D0"
                        // endIcon: <CheckIcon size="5"/>
                    }} mt={1} onValueChange={(itemValue) => 
                        {
                            setGender(itemValue)
                            setEditableGender(itemValue)
                        }
                   }>
                        <Select.Item label="Male" value="male" />
                        <Select.Item label="Female" value="female" />

                    </Select>
                </View>


          



                <View style={{ marginTop: 30 }} />



                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                // onPress={showToast}

                >
                       <Text  allowFontScaling={false}
                    
                        style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Update Profile
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
  inputBoxCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#103042",
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

export default ProfileScreen;
