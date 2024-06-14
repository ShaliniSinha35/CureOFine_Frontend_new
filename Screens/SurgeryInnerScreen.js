import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, FlatList, Modal, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Avatar, Button, Card, Text, ActivityIndicator } from 'react-native-paper';
import { FontAwesome, AntDesign, Entypo } from "@expo/vector-icons";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { decode } from "html-entities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import moment from "moment";

const { width } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

const SurgeryInnerScreen = ({ navigation }) => {
    const route = useRoute();
    const [surgery, setSurgery] = useState([]);
    const [hospitalImgArr, setHospitalImgArr] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const userInfo = useSelector(state => state.user.userInfo);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const getSurgeryList = async () => {
        try {
            const locationId = JSON.parse(await AsyncStorage.getItem("locationId"));
            const res = await axios.get("https://cureofine.com/api/api/surgeryList", {
                params: {
                    cat_id: route.params.id,
                    location_id: locationId
                }
            });
            const data = res.data;
            let newArr = data;

            for (let i = 0; i < newArr.length; i++) {
                const imgArr = JSON.parse(newArr[i].hospital_image);
                newArr[i].image = imgArr;

                if (newArr[i].facility_type !== "") {
                    let facArr = JSON.parse(newArr[i].facility_type);
                    const res = await axios.get("https://cureofine.com/api/api/facilityType");
                    const facilities = res.data;
                    let facArr1 = facArr.map(facilityId => facilities.find(facility => facility.fac_id === facilityId));
                    newArr[i].facilityArr = facArr1;
                }
            }
            setSurgery(newArr);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getSurgeryList();
    }, []);

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={{ height: 1, borderColor: "whitesmoke", borderWidth: 2, marginTop: 15 }} />
                <Text allowFontScaling={false}  style={{ color: "black", padding: 15, fontSize: 15, paddingBottom: 2 }}>Elevate Your Healthcare Experience -</Text>
                <Text allowFontScaling={false}  style={{ color: "#eb3b5a", paddingLeft: 12, fontSize: 12 }}>Explore a Range of Premium Medical Services on our App.</Text>
                <View style={{ height: 1, borderColor: "whitesmoke", borderWidth: 2, marginTop: 15 }} />
                <View style={{ marginTop: 20, paddingBottom: 50 }}>
                    {surgery.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text allowFontScaling={false}  style={{ fontSize: 20, color: "#103042", fontWeight: "500" }}>Hospitals</Text>
                            <ActivityIndicator size="large" color="#103042" />
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <Text allowFontScaling={false}  style={{ fontSize: 18, color: "#103042", fontWeight: "500", marginLeft: 20 }}>{route.params.name} Hospitals</Text>
                            {surgery.map((item) => (
                                <Card key={item.id} style={{ margin: 10, backgroundColor: "white" }}>
                                    <View style={{ flexDirection: "row", width: "100%" }}>
                                        <FlatList
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            data={item.image}
                                            keyExtractor={(image, index) => index.toString()}
                                            renderItem={({ item: hos }) => (
                                                <Image
                                                    source={{ uri: `https://cureofine.com/upload/hospital/${hos}` }}
                                                    style={{ height: 150, width: 200, resizeMode: "contain", marginRight: 5 }}
                                                />
                                            )}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 0, flex: 1 }}>
                                        <Card.Content>
                                            <Text allowFontScaling={false}  style={{ fontWeight: "bold", fontSize: 16 }}>{decode(item.hospital_name)}</Text>
                                            <Text allowFontScaling={false}  style={{ fontWeight: 200, fontSize: 12, marginTop: 5 }}>{decode(item.surgery_details)}</Text>
                                            <Text allowFontScaling={false}  style={{ fontWeight: 200, fontSize: 12, marginTop: 5, marginBottom: 5 }}>
                                                <Entypo name="location" size={15} color="red" />  {decode(item.hospital_address)}
                                            </Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text allowFontScaling={false}  style={{ fontWeight: 200, fontSize: 12, marginTop: 5, marginBottom: 5 }}>Service available: </Text>
                                                {item.hospital_time === "Business Hour" ? (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedHospital(item);
                                                            setModalVisible(true);
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontWeight: 200,
                                                                fontSize: 12,
                                                                marginTop: 5,
                                                                marginBottom: 5,
                                                                color: "red",
                                                                fontWeight: "bold"
                                                            }}
                                                        >
                                                            View
                                                        </Text>
                                                    </TouchableOpacity>
                                                ) : (
                                                    <Text
                                                        style={{
                                                            fontWeight: 200,
                                                            fontSize: 12,
                                                            marginTop: 5,
                                                            marginBottom: 5,
                                                            color: "red",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        {item.hospital_time}
                                                    </Text>
                                                )}
                                            </View>
                                            <Text allowFontScaling={false}  style={{ color: "gray", marginTop: 5 }}>Facilities</Text>
                                            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                                                {item.facilityArr && item.facilityArr.map(facility => (
                                                    <View key={facility.id} style={{ flexDirection: "row", alignItems: "center", marginTop: 5, margin: 5 }}>
                                                        <AntDesign name="arrowright" size={12} color="#f46b78" />
                                                        <Text allowFontScaling={false}  style={{ color: "#f46b78", fontSize: 12, marginLeft: 2 }}>{facility.name}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                            <Text allowFontScaling={false}  style={{ marginTop: 10, fontWeight: 700, fontSize: 16 }}>
                                                Treatment Price: <FontAwesome name="rupee" size={14} color="#103042" /> {item.display_price}
                                            </Text>
                                            <Text allowFontScaling={false}  style={{ fontWeight: 700, marginTop: 5, fontSize: 16 }}>
                                                OPD Price: <FontAwesome name="rupee" size={14} color="#103042" /> {item.opd}
                                            </Text>
                                        </Card.Content>
                                        <Card.Actions style={{ marginTop: 10, marginRight: 30 }}>
                                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo ? navigation.navigate("Login") : navigation.navigate("BookingScreen", { id: item.ser_id, name: item.name, price: item.opd, cat_id: route.params.id, cat_name: route.params.name, display_price: item.display_price, book_type: "surgery", opd_price: item.opd })}>
                                                <Text allowFontScaling={false}  style={{ color: "white" }}>Book OPD</Text>
                                            </Button>
                                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo ? navigation.navigate("Login") : navigation.navigate("EmiScreen", { id: item.ser_id, name: item.name, price: item.opd, cat_id: route.params.id, cat_name: route.params.name, display_price: item.display_price, book_type: "surgery", opd_price: item.opd })}>
                                                <Text allowFontScaling={false}  style={{ color: "white" }}>EMI</Text>
                                            </Button>
                                        </Card.Actions>
                                    </View>
                                </Card>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
            {selectedHospital && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
              <Text allowFontScaling={false} style={styles.modalText}>
                Sunday: {selectedHospital.sun_status !== "Closed" ? 
                  `${moment(selectedHospital.sun_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.sun_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Monday: {selectedHospital.mon_status !== "Closed" ? 
                  `${moment(selectedHospital.mon_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.mon_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Tuesday: {selectedHospital.tue_status !== "Closed" ? 
                  `${moment(selectedHospital.tue_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.tue_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Wednesday: {selectedHospital.wed_status !== "Closed" ? 
                  `${moment(selectedHospital.wed_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.wed_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Thursday: {selectedHospital.thu_status !== "Closed" ? 
                  `${moment(selectedHospital.thu_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.thu_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Friday: {selectedHospital.fri_status !== "Closed" ? 
                  `${moment(selectedHospital.fri_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.fri_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <Text allowFontScaling={false} style={styles.modalText}>
                Saturday: {selectedHospital.sat_status !== "Closed" ? 
                  `${moment(selectedHospital.sat_start, 'HH:mm').format('h:mm A')} to ${moment(selectedHospital.sat_end, 'HH:mm').format('h:mm A')}` 
                  : "Closed"}
              </Text>
              <Text allowFontScaling={false} style={styles.separator} />

              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Text allowFontScaling={false} style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        borderColor: "whitesmoke",
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        margin: 20,
        padding: 55,
        backgroundColor: "#103042",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        fontSize: 15,
        textAlign: "center",
        color: "white"
    },
    closeButton: {
        backgroundColor: "#f08080",
        borderRadius: 10,
        paddingHorizontal: 25,
        paddingVertical: 10,
        elevation: 2,
        marginTop: 20
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15
    }
});

export default SurgeryInnerScreen;
