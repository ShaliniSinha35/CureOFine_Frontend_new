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
    Button,
    Dimensions                                               
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useForm, Controller, resetField, } from "react-hook-form";
import axios from "axios";
import { Select } from "native-base";
import Toast from 'react-native-toast-message';
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from "react-redux";
const EmiScreen = ({ navigation }) => {
    const route = useRoute()
    const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number:null);

    const [photo, setPhoto] = useState(null);
    const [aadhar, setAadhar] = useState(null);



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
        }
        else {
            Alert.alert('You did not select any image.');
        }

    };

    const pickAadhar = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setAadhar(result.assets[0].uri);
        } else {
            Alert.alert('You did not select any image.');
        }
    };
    const [gender, setGender] = React.useState("");
    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("75", data, photo, aadhar, gender);

       await uploadImages(data,photo,aadhar)

        // const photopathParts = photo.split(/[\\/]/);
        // const aadharpathparts = aadhar.split(/[\\/]/);
        // const aadharName = aadharpathparts[aadharpathparts.length - 1];

        // // Get the last part of the path, which is the image name
        // const imageName = photopathParts[photopathParts.length - 1];


      

    };


const submitData = async(data,uploadedImages)=>{
    // https://cureofine.com/api/api
    try {
        const res = await axios.post("https://cureofine.com/api/api/emiForm", {

            name: data.fullname,
            attendant_name: data.guardian,
            age: data.age,
            gender: gender,
            mobile: userInfo,
            email: data.email,
            reason_emi: data.reason,
            selfi: uploadedImages[0],
            aadhaar:uploadedImages[1],
            amount: route.params.price,
            required_amount: data.amount,
            address: data.address,
            service_name: route.params.name,
            service_id: route.params.cat_id,
            book_type: route.params.cat_name
        });
        if (res.status === 200 && res.data.message === "Insertion successful") {

          
            
            // uploadImages(photo,aadhar);
            reset();
            setPhoto(null)
            setAadhar(null)
            showToast();


            navigation.navigate("Home");
        } else {
            // Handle other response statuses or messages
            console.error("Server response:", res.status, res.data.message);
        }
    } catch (error) {
        // Handle network errors
        console.error("Network error:", error.message);
    }
}


    const uploadImages = async (data,photo,aadhar) => {
        try {
            const formData = new FormData();
            formData.append('photo', {
                uri: photo,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            formData.append('aadhar', {
                uri: aadhar,
                type: 'image/jpeg',
                name: 'aadhar.jpg',
            });
    
            const response = await axios.post('https://cureofine.com/api/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.message === 'Images uploaded successfully') {
                console.log('Images uploaded successfully');
                console.log(response.data.uploadedImages)
                submitData(data,response.data.uploadedImages )
               
                // Handle success as needed
            } else {
                console.error('Failed to upload images:', response.data.message);
                // Handle failure as needed
            }
        } catch (error) {
            console.error('Error uploading images:', error.message);
            // Handle error as needed
        }
    };

    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "Thank you for booking.",
            text2: "we will get back to you soon!!",
        });

        console.log("toast called");
    };

    const EMAIL_REGEX =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    return (
        <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 50 }}>
            <Header navigation={navigation} />
            <Text style={{ height: 1, borderColor: "whitesmoke", borderWidth: 2, marginTop: 15 }} />
            <ScrollView>
                <View style={styles.safeArea}>
                    <KeyboardAvoidingView>
                        <View style={{ alignItems: "center", marginTop: 5 }}>
                            <Text allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>
                                EMI FORM
                            </Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text>Patient FullName*</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            autoFocus={true}
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            // onFocus={() => { setFocusField("fullname") }}
                                        />
                                    )}
                                    name="fullname"
                                    rules={{ required: { value: true, message: "This field is required!" } }}
                                />
                            </View>
                            {errors.fullname && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.fullname.message}</Text>
                            )}
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text>Guardian/Attendant*</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            // onFocus={() => { setFocusField("guardian") }}
                                        />
                                    )}
                                    name="guardian"
                                    rules={{ required: { value: true, message: "This field is required!" } }}
                                />
                            </View>
                            {errors.guardian && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.guardian.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Email Id*</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="email"
                                    rules={{
                                        required: {
                                          
                                            pattern: {
                                                value: EMAIL_REGEX,
                                                message: "Not a valid email",
                                            },
                                        },
                                    }}
                                />
                            </View>
                            {errors.email && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.email.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Mobile Number*</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            keyboardType="numeric"
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            // defaultValue={userInfo}
                                            value={value}
                                            // onFocus={() => { setFocusField("phone") }}
                                        />
                                    )}
                                    name="phone"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Mobile number is required!",
                                        },
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Not a valid mobile number",
                                        },
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text>Service Name</Text>
                            <View style={styles.inputBoxCont}>
                                <TextInput
                                    style={styles.input}
                                    value={route.params.name}
                                    editable={false}

                                />
                            </View>
                        </View>
                        <View style={styles.inputCont}>
    <Text style={{ fontWeight: 500, fontSize: 16 }}>Address</Text>
    <View style={{
        flexDirection: "row",
        backgroundColor: "#103042",
        width: Dimensions.get('screen').width * 0.9,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 2,
        paddingLeft: 10,
    }}>
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    multiline  // Enable multiline input
                    numberOfLines={4}  // Set initial number of lines visible
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
        <Text allowFontScaling={false} style={{ color: "red" }}>
            {errors.address.message}
        </Text>
    )}
</View>

                        <View style={styles.inputCont}>
                            <Text>Age</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            keyboardType="numeric"
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        
                                        />
                                    )}
                                    name="age"
                                    rules={{ required: { value: true, message: "Enter your age" } }}
                                />
                            </View>
                            {errors.age && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.age.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Gender</Text>
                            <Select
                                style={{ backgroundColor: "#103042",color:"#fff" }}
                                selectedValue={gender}
                                minWidth="200"
                                accessibilityLabel="Select Gender"
                                placeholder="Select Gender"
                                placeholderTextColor="#fff"
                                _selectedItem={{ bg: "#D0D0D0" }}
                                mt={1}
                                onValueChange={itemValue => setGender(itemValue)}
                            >
                                <Select.Item label="Male" value="male" />
                                <Select.Item label="Female" value="female" />
                            </Select>
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Reason for EMI Application</Text>
                            <View  style={{
        flexDirection: "row",
        backgroundColor: "#103042",
        width: Dimensions.get('screen').width * 0.9,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 2,
        paddingLeft: 10,
    }}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                        multiline 
                    numberOfLines={4}  
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                                        
                                        />
                                    )}
                                    name="reason"
                                    rules={{ required: { value: true, message: "This field is required!" } }}
                                />
                            </View>
                            {errors.reason && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.reason.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Service Cost</Text>
                            <View style={styles.inputBoxCont}>
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.input}
                                    value={`Rs ${route.params.price}`}
                                    editable={false}
                                />
                            </View>
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Amount Required</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                        
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                    )}
                                    name="amount"
                                    rules={{ required: { value: true, message: "This field is required!" } }}
                                />
                            </View>
                            {errors.amount && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.amount.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Upload Photo</Text>
                            <View style={styles.inputBoxCont}>
                                {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
                                <Button title="Choose File" color="#103042" onPress={pickImage} />
                            </View>
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Upload Aadhar</Text>
                            <View style={styles.inputBoxCont}>
                                {aadhar && <Image source={{ uri: aadhar }} style={{ width: 200, height: 200 }} />}
                                <Button title="Choose File" color="#103042" onPress={pickAadhar} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>

                        <Toast position='bottom' bottomOffset={80} />
                    </KeyboardAvoidingView>
                </View>

                <Contact />
                <Footer />
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
    input: {
        color: "white",
        marginVertical: 5,
        width: 300,
        fontSize: 16,
    },
    inputBoxCont: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: "#103042",
        width:Dimensions.get('screen').width * 0.9,
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
        marginTop:30
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    inputCont: {
        marginTop: 10,
    },
});

export default EmiScreen;



// i want to pass the photo and aadhar image to backend and store this on backend upload folder when user submit the form
