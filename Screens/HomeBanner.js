import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FlatListSlider } from 'react-native-flatlist-slider';


const HomeBanner = () => {

    const [bannerImage, setBanner] = useState([])


    const getImage = async () => {
        const res = await axios.get("https://cureofine.com/api/api/banner");
        const data = res.data;
       
        let imgArr = []
        for (let i = 0; i < data.length; i++) {
            if(data[i].page == "main-page"){ 
                imgArr.push({ image: `https://cureofine.com/upload/banner/${data[i].image}`, id: data[i].id });
            }
    
        }

        setBanner(imgArr)


    };

    useEffect(() => {
        getImage();

    }, []);


    return (

      
<>
    
        {
          bannerImage.length != 0 ?

          <FlatListSlider
            data={bannerImage}
            height={180}
            indicatorActiveColor={'#f46b78'}
            indicatorActiveWidth={30}
          /> :  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator color={"#f08080"} size={"large"} />
                </View>

        }

</>

    )
}




export default HomeBanner