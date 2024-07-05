import {
    View,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    Modal,
    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Header from "../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { decode } from "html-entities";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import moment from "moment";

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get("window");

const IvfInnerScreen = ({ navigation }) => {
    const route = useRoute();
    const userInfo = useSelector(state => state.user.userInfo);
    const [hospitals, setHospitals] = useState("");
    const [surgery, setSurgery] = useState("");
    const [facility, setFacility] = useState("");
    const [hospitalImgArr, setHospitalImgArr] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);

    const handleCloseModal = () => {
        console.log("Closing modal"); // Debug log
        setModalVisible(false);
    };

    const getSurgeryList = async () => {
        const locationId = JSON.parse(await AsyncStorage.getItem("locationId"));

        const res = await axios.get("https://cureofine.com/api/api/ivfList", {
            params: {
                cat_id: route.params.id,
                location_id: locationId
            }
        });
        const data = res.data;
        console.log(data, "data value");
        let newArr = data;

        for (let i = 0; i < newArr.length; i++) {
            const imgArr = JSON.parse(newArr[i].hospital_image);
            console.log("53", imgArr);
            setHospitalImgArr(imgArr);

            newArr[i].image = imgArr;
            if (newArr[i].facility_type !== "") {
                let facArr = JSON.parse(newArr[i].facility_type);

                const res = await axios.get("https://cureofine.com/api/api/facilityType");
                const data = res.data;
                let facArr1 = [];

                for (let j = 0; j < facArr.length; j++) {
                    if (facArr[j] === data.fac_id) {
                        facArr1.push(data[j]);
                    }
                }
                console.log("72", facArr1);
                newArr[i].facilityArr = facArr1;
            }
        }
        console.log("newarr", newArr);
        setSurgery(newArr);
    };

    useEffect(() => {
        getSurgeryList();
    }, []);

    return (
        <View style={{ backgroundColor: "white", height: "100%" }}>
            {/* Header component */}
            <Header navigation={navigation} />

            <ScrollView>
                {/* Separator */}
                <View style={{ height: 1, borderColor: "whitesmoke", borderWidth: 2, marginTop: 15 }} />

                {/* Title and subtitle */}
                <Text allowFontScaling={false}  style={{ color: "black", padding: 15, fontSize: 15, paddingBottom: 2 }}>Elevate Your Healthcare Experience -</Text>
                <Text allowFontScaling={false}  style={{ color: "#eb3b5a", paddingLeft: 12, fontSize: 12 }}>Explore a Range of Premium Medical Services on our App.</Text>

                {/* Separator */}
                <View style={{ height: 1, borderColor: "whitesmoke", borderWidth: 2, marginTop: 15 }} />

                {/* Main content */}
                <View style={{ marginTop: 20, paddingBottom: 50 }}>
                    {surgery === "" ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text allowFontScaling={false}  style={{ fontSize: 20, color: "#103042", fontWeight: "500" }}>Hospitals</Text>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <Text allowFontScaling={false}  style={{ fontSize: 18, color: "#103042", fontWeight: "500", marginLeft: 20 }}>{route.params.name} Hospitals</Text>
                            {surgery.map((item) => (
                                <Card key={item.id} style={{ margin: 10, backgroundColor: "white" }}>
                                    {/* Hospital images section */}
                                    <View style={{ flexDirection: "row", width: "100%" }}>
                                        <FlatList
                                            horizontal
                                            data={item.image}
                                            keyExtractor={(image, index) => index.toString()}
                                            renderItem={({ item: hos }) => (
                                                <Image
                                                    source={{ uri: `https://cureofine.com/upload/hospital/${hos}` }}
                                                    style={{ height: 150, width: 200, resizeMode: "contain", marginBottom: 5 }}
                                                />
                                            )}
                                        />
                                    </View>

                                    {/* Hospital details section */}
                                    <View style={{ marginLeft: 0, marginTop: 0, flex: 1 }}>
                                        <Card.Content>
                                            <Text allowFontScaling={false}  style={{ fontWeight: "bold", fontSize: 16 }}>{decode(item.hospital_name)}</Text>
                                            <Text allowFontScaling={false}  style={{ fontWeight: 200, fontSize: 12, marginTop: 5 }}>{decode(item.dental_details)}</Text>
                                            <Text allowFontScaling={false}  style={{ fontWeight: 200, fontSize: 12, marginTop: 5, marginBottom: 5 }}>
                                                <Entypo name="location" size={15} color="red" /> {decode(item.hospital_address)}
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
                                                Treatment Price: <FontAwesome name="rupee" size={14} color="black" /> {item.display_price}
                                            </Text>
                                            <Text allowFontScaling={false}  style={{ fontWeight: 700, marginTop: 5, fontSize: 16 }}>
                                                OPD Price: <FontAwesome name="rupee" size={14} color="black" /> {item.opd}
                                            </Text>
                                        </Card.Content>

                                        {/* Actions */}
                                        <Card.Actions style={{ marginTop: 10, marginRight: 30 }}>
                                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo ? navigation.navigate("Login") : navigation.navigate("BookingScreen", { id: item.ser_id, name: item.name, price: item.opd, cat_id: route.params.id, cat_name: route.params.name, display_price: item.display_price, book_type: "ivf", opd_price: item.opd })}>
                                                <Text allowFontScaling={false} style={{ color: "white" }}>Book OPD</Text>
                                            </Button>
                                            <Button mode="contained" theme={{ colors: { primary: '#f08080' } }} onPress={() => !userInfo ? navigation.navigate("Login") : navigation.navigate("EmiScreen", { id: item.ser_id, name: item.name, price: item.opd, cat_id: route.params.id, cat_name: route.params.name, display_price: item.display_price, book_type: "ivf", opd_price: item.opd })}>
                                                <Text allowFontScaling={false} style={{ color: "white" }}>EMI</Text>
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
}

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

export default IvfInnerScreen;
