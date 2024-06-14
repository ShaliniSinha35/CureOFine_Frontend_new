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
    Linking
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useForm, Controller, resetField, } from "react-hook-form";
import axios from "axios";
import { Select } from "native-base";
// import Toast from 'react-native-simple-toast';
import Toast from 'react-native-toast-message';
import { useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import moment from 'moment'; 
import BookingAlert from "../Components/BookingAlert";
const BookingScreen = ({ navigation }) => {
    const [paymentResult, setPaymentResult] = useState(null);
    const userInfo = useSelector(state => state.user.userInfo ? state.user.userInfo.number:null);
    const route = useRoute()
    console.log(route.params.book_type)
    const [service, setService] = useState(route.params.name);
    const [price, setPrice] = useState(route.params.display_price)
    const [gender, setGender] = React.useState("");
const [emi, setEmi] = useState("")
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [time, setTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [visible,setVisible]= useState(false)

    const userId = useSelector(state => state.user.userInfo ?state.user.userInfo.id:null);

const [flag,setFlag] = useState(false)
   
    const showTimepicker = () => {
        setShowTimePicker(!showTimePicker);
    };
    
    const handleTimeChange = (event, selectedTime) => {
        if (selectedTime) {
        
            setTime(selectedTime);
            setShowTimePicker(false);
        }
    };


    const goToHome = async ()=>{
        if(!route.params.name){
            navigation.navigate("Home")
        }
    }
    useEffect(()=>{
        goToHome()
    })


    const showDatepicker = () => {
        setShowDatePicker(!showDatePicker);
    };



    const onDateChange = (event, selectedDate) => {
 
        if (selectedDate) {
            
            setDate(selectedDate);
            setShowDatePicker(!showDatePicker);
        } 
    };
    
  

    const {
        register,
        setValue,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("75", data, gender);
        // https://cureofine.com/api/api/bookSurgery
        const transactionId = "T" + Date.now();
        const MUID = "MUID" + Date.now()

        const newDate= moment(date).format('YYYY-MM-DD')
        const newTime= moment(time).format('HH:mm')


  
        if (route.params.book_type === "Consultation" || route.params.book_type === "Ayurveda") {
            console.log("route.params.book_type == Consultation or Ayurveda", route.params.book_type);
    
            try {
                const res = await axios.post("https://cureofine.com/api/api/bookSurgeryForConsultation", {
                    user_id: userId,
                    service_id: route.params.id,
                    name: data.fullname,
                    gender: gender,
                    age: data.age,
                    address: data.address,
                    mobile: userInfo,
                    email: data.email,
                    service_name: route.params.name,
                    service_date: newDate,
                    service_time: newTime,
                    amount: route.params.price,
                    book_type: route.params.book_type,
                    tax: 0,
                });
    
                console.log(route.params.book_type);
    
                if (res.status === 200 && res.data.message === "Insertion successful") {
                    reset();
                    setGender("");
    
                    try {
                        const paymentResponse = await axios.post('https://cureofine.com/api/api/api/payment', {
                            transactionId: transactionId,
                            MUID: MUID,
                            name: data.fullname,
                            mobile: userInfo,
                            amount: route.params.price
                        });
    
                        console.log("paymentResponse", paymentResponse);
    
                        if (paymentResponse.status === 200) {
                            console.log("119", paymentResponse.data.message);
                            if (paymentResponse.data.result) {
                                setPaymentResult(paymentResponse.data.result);
                                const tId = paymentResponse.data.transactionId;
                                const mId = paymentResponse.data.merchantId;
                                console.log(tId);
                                console.log(mId);
    
                                const res1 = await Linking.openURL(paymentResponse.data.result);
    
                                const intervalId = setInterval(async () => {
                                    try {
                                        const statusResponse = await axios.post(`https://cureofine.com/api/api/status/${tId}`);
    
                                        console.log("Payment Status:", statusResponse.data);
    
                                        if (statusResponse.data.status === "success") {
                                            clearInterval(intervalId);
    
                                            try {
                                                const updateRes = await axios.post("https://cureofine.com/api/api/updateTransactionSuccess", {
                                                    phone: userInfo,
                                                    transaction_id: tId,
                                                    service_name: route.params.name,
                                                    user_id: userId
                                                });
    
                                                console.log(updateRes.data.message);
                                            } catch (err) {
                                                console.log(err);
                                            }
    
                                            navigation.navigate("Home");
                                        } else if (statusResponse.data.status === "failure") {
                                            clearInterval(intervalId);
    
                                            try {
                                                const updateRes = await axios.post("https://cureofine.com/api/api/updateTransactionFailure", {
                                                    phone: userInfo,
                                                    transaction_id: tId,
                                                    service_name: route.params.name,
                                                    user_id: userId
                                                });
    
                                                console.log(updateRes.data.message);
                                            } catch (err) {
                                                console.log(err);
                                            }
    
                                            navigation.navigate("Home");
                                        }
                                    } catch (error) {
                                        console.error("Error checking payment status:", error);
                                    }
                                }, 5000);
                            }
                        }
                    } catch (error) {
                        Alert.alert("Payment API network error");
                        console.error("Payment API network error:", error.message);
                    }
                }
            } catch (error) {
                console.error("Network error:", error.message);
            }
        } else {
            console.log("route.params.book_type !== Consultation or Ayurveda", route.params.book_type);
    
            try {
                const res = await axios.post("https://cureofine.com/api/api/bookSurgery", {
                    user_id: userId,
                    service_id: route.params.id,
                    name: data.fullname,
                    gender: gender,
                    age: data.age,
                    address: data.address,
                    mobile: userInfo,
                    email: data.email,
                    service_name: route.params.name,
                    service_date: newDate,
                    service_time: newTime,
                    amount: route.params.price,
                    book_type: route.params.book_type,
                    display_price: route.params.display_price,
                    tax: 0,
                    opd_price: route.params.price,
                    emi: emi
                });
    
                console.log("277", route.params.book_type);
    
                if (res.status === 200 && res.data.message === "Insertion successful") {
                    setVisible(true);
                    reset();
                    setGender("");
                    setEmi("");
                }
            } catch (error) {
                console.error("Network error:", error.message);
            }
        }

   

}





        
 

    // const handleRedirect = async (event) => {
    //     const { url } = event;
    //     console.log(url)
    //     // Check if the URL matches your redirect URL pattern
    //     if (url.startsWith('https://cureofine.com/api/api/status/')) {
    //       // Extract transactionId from the URL (You may need to parse the URL accordingly)
    //       const transactionId = url.split('/').pop();
    //       console.log('Transaction ID:', transactionId);
    //       // Call your backend to check the payment status
    //       try {
    //         const statusResponse = await axios.post(`https://cureofine.com/api/api/status/${transactionId}`);
    //         // Handle the payment status (statusResponse.data.status)
    //         console.log('Payment Status:', statusResponse.data.status);
    //         navigation.navigate("PaymentStatusScreen",{status:statusResponse.data.status})

    //         // if(statusResponse.data.status){
    //         // }
    //       } catch (error) {
    //         console.error('Error checking payment status:', error);
    //       }
    //     }
    //   };


  


    const showToast = () => {
        Toast.show({
            type: "success",
            text1: "Thank you for booking.",
            text2: "we will get back to you soon!!",
        });
        navigation.navigate("Home")

        // console.log("toast called");
    };

    const EMAIL_REGEX =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const handleNavigationChange = (navState) => {
            const { url } = navState;
            console.log("242",url)
            // Check if the URL indicates a successful payment
            if (url.startsWith('https://cureofine.com/api/api/api/status/')) {
              // Close or navigate away from the WebView
              // This can be done using navigation.goBack() or similar
              // For example:
              navigation.navigate('PaymentStatusScreen'); // Navigate to your home screen
            }
          };
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
            ></Text>
            <ScrollView>
                <View style={styles.safeArea}>
                    <KeyboardAvoidingView>
                        <View style={{ alignItems: "center", marginTop: 5 }}>
                            <Text allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>
                                Book Now
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
                                            style={{
                                                color: "gray",
                                                marginVertical: 5,
                                                width: 300,
                                                fontSize: 16,
                                            }}

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
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.fullname.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Email Id*</Text>
                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={{
                                                color: "gray",
                                                marginVertical: 5,
                                                width: 300,
                                                fontSize: 16,
                                            }}

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
                                            autoFocus={true}
                                            style={{
                                                color: "gray",
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
                            {errors.phone && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.phone.message}</Text>
                            )}
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text>Service Name</Text>
                            <View style={styles.inputBoxCont}>

                                <TextInput
                                    autoFocus={true}
                                    style={{
                                        color: "gray",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}



                                    value={route.params.name}
                                />



                            </View>

                        </View>

                        {/* {console.log(route.params.price)} */}

                        <View style={styles.inputCont}>
                            <Text>Surgery Cost</Text>
                            <View style={styles.inputBoxCont}>
                                <TextInput
                                    autoFocus={true}

                                    style={{
                                        color: "gray",
                                        marginVertical: 5,
                                        width: 300,
                                        fontSize: 16,
                                    }}
                                    value={`Rs ${route.params.price}`}
                                />

                            </View>

                        </View>

                        <View style={styles.inputCont}>
                            <Text>Address</Text>

                            <View style={styles.inputBoxCont}>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            autoFocus={true}

                                            multiline
                                            numberOfLines={4}
                                            // onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
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
                            {errors.message && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.message.message}</Text>
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
                                            autoFocus={true}
                                            style={{
                                                color: "gray",
                                                marginVertical: 5,
                                                width: 300,
                                                fontSize: 16,
                                            }}

                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                    name="age"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter your age",
                                        },
                                    }}
                                />
                            </View>
                            {errors.age && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>{errors.age.message}</Text>
                            )}
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Gender</Text>
                            <Select style={{ backgroundColor: "#D0D0D0" }} selectedValue={gender} minWidth="200" accessibilityLabel="Select Gender" placeholder="Select Gender" _selectedItem={{
                                bg: "#D0D0D0"
                                // endIcon: <CheckIcon size="5"/>
                            }} mt={1} onValueChange={itemValue => setGender(itemValue)}>
                                <Select.Item label="Male" value="male" />
                                <Select.Item label="Female" value="female" />
                                <Select.Item label="Others" value="others" />

                            </Select>
                        </View>

                        <View style={styles.inputCont}>
                            <Text>Schedule Date</Text>
                            <View style={[styles.inputBoxCont, { padding: 20 }]}>

                                <Text style={{ margin: 10 }}><EvilIcons name="calendar" size={24} color="black" onPress={() => showDatepicker()} /></Text>

                                {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
                         <Text>{moment(date).format('YYYY-MM-DD')}</Text>

                            </View>

                        </View>


                        <View style={styles.inputCont}>
                            <Text>Schedule Time</Text>
                            <View style={[styles.inputBoxCont, { padding: 20 }]}>

                                <Text style={{ margin: 10 }}><EvilIcons name="clock" size={24} color="black" onPress={() => showTimepicker()} /></Text>
                                {showTimePicker && (
                                    <DateTimePicker
                                        value={time}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={handleTimeChange}
                                    />
                                )}
 <Text>{moment(time).format('HH:mm')}</Text>

                            </View>

                        </View>


{route.params.book_type != "Consultation"  ?

<View style={styles.inputCont}>
<Text>Need EMI for treatment*</Text>
<Select style={{ backgroundColor: "#D0D0D0" }} selectedValue={emi} minWidth="200" accessibilityLabel="Select" placeholder="Select" _selectedItem={{
    bg: "#D0D0D0"
    // endIcon: <CheckIcon size="5"/>
}} mt={1} onValueChange={itemValue => setEmi(itemValue)}>
    <Select.Item label="YES" value="yes" />
    <Select.Item label="NO" value="no" />
  

</Select>
</View>
: null
}
                      

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
                                Submit
                            </Text>
                        </TouchableOpacity>

                        <Toast
                            position='bottom'
                            bottomOffset={80}
                        />

                    </KeyboardAvoidingView>

                </View>



                <BookingAlert
        isVisible={visible}
        onClose={() => setVisible(false)}
        onConfirm={()=>{
          navigation.navigate("DashboardScreen")
        }}
      />     
       


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

export default BookingScreen;