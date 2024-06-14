import {
    View,
    ScrollView,
    Image,
    FlatList,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions
} from "react-native";
import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import Header from "../Components/Header";
import { ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { decode } from "html-entities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

SplashScreen.preventAutoHideAsync();

const HairInnerScreen = ({ navigation }) => {
    const route = useRoute();
    const userInfo = useSelector(state => state.user.userInfo);
    const [surgery, setSurgery] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const getSurgeryList = async () => {
        try {
            const locationId = JSON.parse(await AsyncStorage.getItem("locationId"));
            const res = await axios.get("https://cureofine.com/api/api/hairList", {
                params: {
                    cat_id: route.params.id,
                    location_id: locationId
                }
            });

            const data = res.data;
            let newArr = data.map(item => {
                item.image = JSON.parse(item.hospital_image);
                if (item.facility_type) {
                    let facArr = JSON.parse(item.facility_type);
                    return axios.get("https://cureofine.com/api/api/facilityType")
                        .then(res => {
                            let facArr1 = facArr.map(facId => res.data.find(fac => fac.fac_id === facId));
                            item.facilityArr = facArr1;
                            return item;
                        });
                }
                return item;
            });

            Promise.all(newArr).then(results => {
                setSurgery(results);
                setLoading(false);
                SplashScreen.hideAsync();
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
            SplashScreen.hideAsync();
        }
    };

    useEffect(() => {
        getSurgeryList();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
            <Header navigation={navigation} />

            <ScrollView>
                <View style={styles.separator} />
                <Text allowFontScaling={false}  style={styles.headerText}>Elevate Your Healthcare Experience -</Text>
                <Text allowFontScaling={false}  style={styles.subHeaderText}>Explore a Range of Premium Medical Services on our App.</Text>
                <View style={styles.separator} />

                <View style={styles.contentContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#103042" />
                    ) : (
                        <>
                            <Text allowFontScaling={false}  style={styles.sectionTitle}>{route.params.name} Hospitals</Text>
                            {surgery.map(item => (
                                <Card key={item.id} style={styles.card}>
                                    <View style={styles.imageContainer}>
                                        <FlatList
                                            horizontal
                                            data={item.image}
                                            keyExtractor={(image, index) => index.toString()}
                                            renderItem={({ item: hos }) => (
                                                <Image
                                                    source={{ uri: `https://cureofine.com/upload/hospital/${hos}` }}
                                                    style={styles.hospitalImage}
                                                />
                                            )}
                                        />
                                    </View>

                                    <Card.Content>
                                        <Text allowFontScaling={false}  style={styles.hospitalName}>{decode(item.hospital_name)}</Text>
                                        <Text allowFontScaling={false}  style={styles.hospitalDetails}>{decode(item.hair_details)}</Text>
                                        <Text allowFontScaling={false}  style={styles.hospitalAddress}>
                                            <Entypo name="location" size={15} color="red" /> {decode(item.hospital_address)}
                                        </Text>
                                        <View style={styles.serviceContainer}>
                                            <Text allowFontScaling={false}  style={styles.serviceText}>Service available: </Text>
                                            {item.hospital_time === "Buisness Hour" ? (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedHospital(item);
                                                        setModalVisible(true);
                                                    }}
                                                >
                                                    <Text allowFontScaling={false}  style={styles.viewText}>View</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <Text allowFontScaling={false}  style={styles.viewText}>{item.hospital_time}</Text>
                                            )}
                                        </View>
                                        <Text allowFontScaling={false}  style={styles.facilitiesText}>Facilities</Text>
                                        <View style={styles.facilityList}>
                                            {item.facilityArr && item.facilityArr.map(facility => (
                                                <View key={facility.id} style={styles.facilityItem}>
                                                    <AntDesign name="arrowright" size={12} color="#f46b78" />
                                                    <Text allowFontScaling={false}  style={styles.facilityName}>{facility.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                        <Text allowFontScaling={false}  style={styles.priceText}>
                                            Treatment Price: <FontAwesome name="rupee" size={14} color="#103042" /> {item.display_price}
                                        </Text>
                                        <Text allowFontScaling={false}  style={styles.priceText}>
                                            OPD Price: <FontAwesome name="rupee" size={14} color="#103042" /> {item.opd}
                                        </Text>
                                    </Card.Content>
                                    <Card.Actions style={styles.cardActions}>
                                        <Button
                                            mode="contained"
                                            theme={{ colors: { primary: '#f08080' } }}
                                            onPress={() => !userInfo
                                                ? navigation.navigate("Login")
                                                : navigation.navigate("BookingScreen", {
                                                    id: item.ser_id,
                                                    name: item.name,
                                                    price: item.opd,
                                                    cat_id: route.params.id,
                                                    cat_name: route.params.name,
                                                    display_price: item.display_price,
                                                    book_type: "Hair",
                                                    opd_price: item.opd
                                                })}
                                        >
                                            <Text allowFontScaling={false}  style={styles.buttonText}>Book OPD</Text>
                                        </Button>
                                        <Button
                                            mode="contained"
                                            theme={{ colors: { primary: '#f08080' } }}
                                            onPress={() => !userInfo
                                                ? navigation.navigate("Login")
                                                : navigation.navigate("EmiScreen", {
                                                    id: item.ser_id,
                                                    name: item.name,
                                                    price: item.opd,
                                                    cat_id: route.params.id,
                                                    cat_name: route.params.name,
                                                    display_price: item.display_price,
                                                    book_type: "Hair",
                                                    opd_price: item.opd
                                                })}
                                        >
                                            <Text allowFontScaling={false}  style={styles.buttonText}>EMI</Text>
                                        </Button>
                                    </Card.Actions>
                                </Card>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>

            {selectedHospital && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: 1,
        borderColor: "whitesmoke",
        borderWidth: 1,
        marginVertical: 15
    },
    headerText: {
        color: "black",
        padding: 15,
        fontSize: 15,
        paddingBottom: 2
    },
    subHeaderText: {
        color: "#eb3b5a",
        paddingLeft: 12,
        fontSize: 12
    },
    contentContainer: {
        marginTop: 20,
        paddingBottom: 50
    },
    sectionTitle: {
        fontSize: 18,
        color: "#103042",
        fontWeight: "500",
        marginLeft: 20
    },
    card: {
        margin: 10,
        backgroundColor: "white"
    },
    imageContainer: {
        flexDirection: "row",
        width: "100%"
    },
    hospitalImage: {
        height: 150,
        width: 200,
        resizeMode: "contain",
        marginBottom: 5
    },
    hospitalName: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 5
    },
    hospitalDetails: {
        fontWeight: "200",
        fontSize: 12,
        marginTop: 5
    },
    hospitalAddress: {
        fontWeight: "200",
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5
    },
    serviceContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    serviceText: {
        fontWeight: "200",
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5
    },
    viewText: {
        fontWeight: "bold",
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
        color: "red"
    },
    facilitiesText: {
        color: "gray",
        marginTop: 5
    },
    facilityList: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    facilityItem: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        margin: 5
    },
    facilityName: {
        color: "#f46b78",
        fontSize: 12,
        marginLeft: 2
    },
    priceText: {
        marginTop: 10,
        fontWeight: "700",
        fontSize: 16
    },
    cardActions: {
        marginTop: 10,
        marginRight: 30,
        justifyContent: "space-between"
    },
    buttonText: {
        color: "white"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
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

export default HairInnerScreen;
