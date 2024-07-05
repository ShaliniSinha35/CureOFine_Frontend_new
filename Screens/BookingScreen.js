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
    Linking,
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
// import Toast from 'react-native-simple-toast';
import Toast from 'react-native-toast-message';
import { useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { WebView } from 'react-native-webview';
import moment from 'moment-timezone';
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

    const formatDateToIST = (utcDate) => {
        return moment.utc(utcDate).tz('Asia/Kolkata').format('hh:mm A');
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


  
        if (route.params.book_type === "ayurveda") {
            console.log("route.params.book_type ==  Ayurveda", route.params.book_type);
    
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
                    const booking_id= res.data.booking_id
    
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
                          
                                 navigation.navigate("Home")
                                const intervalId = setInterval(async () => {
                                    try {
                                        const statusResponse = await axios.post(`https://cureofine.com/api/api/api/status/${tId}`);
    
                                        console.log("Payment Status:", statusResponse.data);
    
                                //         // if (statusResponse.data.status === "success") {
                                //         //     clearInterval(intervalId);
    
                                //         //     try {
                                //         //         const updateRes = await axios.post("https://cureofine.com/api/api/updateTransactionSuccess", {
                                //         //             phone: userInfo,
                                //         //             transaction_id: tId,
                                //         //             service_name: route.params.name,
                                //         //             user_id: userId,
                                //         //             booking_id:booking_id
                                //         //         });
    
                                //         //         console.log(updateRes.data.message);
                                //         //     } catch (err) {
                                //         //         console.log(err);
                                //         //     }
    
                                //         //     navigation.navigate("Home");
                                //         // } else if (statusResponse.data.status === "failure") {
                                //         //     clearInterval(intervalId);
    
                                //         //     try {
                                //         //         const updateRes = await axios.post("https://cureofine.com/api/api/updateTransactionFailure", {
                                //         //             phone: userInfo,
                                //         //             transaction_id: tId,
                                //         //             service_name: route.params.name,
                                //         //             user_id: userId,
                                //         //             booking_id:booking_id
                                //         //         });
    
                                //         //         console.log(updateRes.data.message);
                                //         //     } catch (err) {
                                //         //         console.log(err);
                                //         //     }
    
                                //         //     navigation.navigate("Home");
                                //         // }
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
        }
        
        else if (route.params.book_type === "voice" || route.params.book_type === "video" || route.params.book_type === "chat") {
            console.log("route.params.book_type == Consultation", route.params.book_type);
    
            try {

                console.log(userId)
                const res = await axios.post("https://cureofine.com/api/api/consultationBooking", {
                    pid: userId,
                    did: route.params.cat_id,
                    name: data.fullname,
                    gender: gender,
                    age: data.age,
                    address: data.address,
                    mobile: userInfo,
                    email: data.email,
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
                    const booking_id= res.data.booking_id
    
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
                                navigation.navigate("Home");
    
                                // const intervalId = setInterval(async () => {
                                //     try {
                                //         const statusResponse = await axios.post(`https://cureofine.com/api/api/api/status/${tId}`);
    
                                //         console.log("Payment Status:", statusResponse.data);
    
                                //         // if (statusResponse.data.status === "success") {
                                //         //     clearInterval(intervalId);
    
                                //         //     try {
                                //         //         const updateRes = await axios.post("https://cureofine.com/api/api/updateConsultationTransactionSuccess", {
                                //         //             phone: userInfo,
                                //         //             transaction_id: tId,
                                //         //             service_name: route.params.name,
                                //         //             user_id: userId,
                                //         //             booking_id:booking_id
                                //         //         });
    
                                //         //         console.log(updateRes.data.message);
                                //         //     } catch (err) {
                                //         //         console.log(err);
                                //         //     }
    
                                //         //     navigation.navigate("Home");
                                //         // } else if (statusResponse.data.status === "failure") {
                                //         //     clearInterval(intervalId);
    
                                //         //     try {
                                //         //         const updateRes = await axios.post("https://cureofine.com/api/api/updateConsultationTransactionFailure", {
                                //         //             phone: userInfo,
                                //         //             transaction_id: tId,
                                //         //             service_name: route.params.name,
                                //         //             user_id: userId,
                                //         //             booking_id:booking_id
                                //         //         });
    
                                //         //         console.log(updateRes.data.message);
                                //         //     } catch (err) {
                                //         //         console.log(err);
                                //         //     }
    
                                //         //     navigation.navigate("Home");
                                //         // }
                                //     } catch (error) {
                                //         console.error("Error checking payment status:", error);
                                //     }
                                // }, 5000);
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
        } 
        else {
    
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
            <Header navigation={navigation} />
            <Text style={styles.separator} />
            <ScrollView>
                <View style={styles.safeArea}>
                    <KeyboardAvoidingView>
                        <View style={{ alignItems: "center", marginTop: 5 }}>
                            <Text allowFontScaling={false} style={{ color: "gray", fontSize: 15 }}>
                                Book Now
                            </Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{fontWeight:500,fontSize:16}}>Patient FullName*</Text>
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
                                <Text allowFontScaling={false} style={{ color: "red" }}>
                                    {errors.fullname.message}
                                </Text>
                            )}
                        </View>
                        <View style={styles.inputCont}>
                            <Text style={{fontWeight:500,fontSize:16}}>Email Id</Text>
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
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: "Not a valid email",
                                            },
                                        },
                                    }}
                                />
                            </View>
                            {errors.email && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>
                        <View style={styles.inputCont}>
                            <Text style={{fontWeight:500,fontSize:16}}>Mobile Number*</Text>
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
                                            editable={true}
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
                            {errors.phone && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>
                                    {errors.phone.message}
                                </Text>
                            )}
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{fontWeight:500,fontSize:16}}>Service Name</Text>
                            <View style={styles.inputBoxCont}>
                                <TextInput
                                    style={styles.input}
                                    value={route.params.name}
                                    editable={false}
                                />
                            </View>
                        </View>
                        <View style={styles.inputCont}>
                            <Text style={{fontWeight:500,fontSize:16}}>Service Cost</Text>
                            <View style={styles.inputBoxCont}>
                                <TextInput
                                    style={styles.input}
                                    value={`Rs ${route.params.price}`}
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
                            <Text style={{fontWeight:500,fontSize:16}}>Age</Text>
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
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter your age",
                                        },
                                    }}
                                />
                            </View>
                            {errors.age && (
                                <Text allowFontScaling={false} style={{ color: "red" }}>
                                    {errors.age.message}
                                </Text>
                            )}
                        </View>
                        <View style={styles.inputCont}>
                            <Text style={{fontWeight:500,fontSize:16}}>Gender</Text>
                            <Select
                                style={{ backgroundColor: "#103042",color:"#fff",fontSize:16 }}
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
                                <Select.Item label="Others" value="others" />
                            </Select>
                        </View>
                        <View style={styles.inputCont}>
                            <Text style={{fontWeight:500,fontSize:16}}>Schedule Date</Text>
                            <Pressable style={[styles.inputBoxCont, { padding: 20 }]} onPress={showDatepicker}>
                                <Text style={{ margin: 10 }}>
                                    <EvilIcons name="calendar" size={24} color="#f08080" onPress={showDatepicker} />
                                </Text>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                                <Text style={{color:"#fff",fontSize:16}}>{moment(date).format('YYYY-MM-DD')}</Text>
                            </Pressable>
                        </View>
                        <View style={styles.inputCont}>
                            <Text style={{fontWeight:500,fontSize:16}}>Schedule Time</Text>
                            <Pressable style={[styles.inputBoxCont, { padding: 20 }]} onPress={showTimepicker}>
                                <Text style={{ margin: 10 }}>
                                    <EvilIcons name="clock" size={25} color="#f08080" onPress={showTimepicker} />
                                </Text>
                                {showTimePicker && (
                                    <DateTimePicker
                                        value={time}
                                        mode="time"
                                        is24Hour={true}
                                        display="default"
                                        onChange={handleTimeChange}
                                    />
                                )}
                                <Text style={{color:"#fff",fontSize:16}}>{formatDateToIST(time)}</Text>
                            </Pressable>
                        </View>
                        {route.params.book_type !== "voice" && route.params.book_type !== "video" && route.params.book_type !== "chat" && (
                            <View style={styles.inputCont}>
                                <Text style={{fontWeight:500,fontSize:16}}>Need EMI for treatment*</Text>
                                <Select
                                    style={{ backgroundColor: "#103042",color:"#fff",fontSize:16 }}
                                    selectedValue={emi}
                                    minWidth="200"
                                    accessibilityLabel="Select"
                                    placeholder="Select"
                                    placeholderTextColor="#fff"
                                    _selectedItem={{ bg: "#fff",color:"#fff" }}
                                    mt={1}
                                    onValueChange={itemValue => setEmi(itemValue)}
                                >
                                    <Select.Item label="YES" value="yes" />
                                    <Select.Item label="NO" value="no" />
                                </Select>
                            </View>
                        )}
                        <View style={{ marginTop: 30 }} />
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
                        <Toast position='bottom' bottomOffset={80} />
                    </KeyboardAvoidingView>
                </View>
                <BookingAlert
                    isVisible={visible}
                    onClose={() => setVisible(false)}
                    onConfirm={() => {
                        navigation.navigate("DashboardScreen");
                    }}
                />
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
    separator: {
        height: 1,
        borderColor: "whitesmoke",
        borderWidth: 2,
        marginTop: 15,
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
    input: {
        color: "#fff",
        marginVertical: 5,
        width: 300,
        fontSize: 16,
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