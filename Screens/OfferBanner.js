import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FlatListSlider } from 'react-native-flatlist-slider';


const OfferBanner = () => {

    const [bannerImage, setBanner] = useState([])


    const getImage = async () => {
        const res = await axios.get("https://cureofine-azff.onrender.com/offerBanner");
        const data = res.data;
       
        let imgArr = []
        for (let i = 0; i < data.length; i++) {
        
                imgArr.push({ image: `https://cureofine.com/upload/offerbanner/${data[i].image}`, id: data[i].id });
      
    
        }

        setBanner(imgArr)


    };

    useEffect(() => {
        getImage();

    }, []);


    return (

      
<>
    
        {
          bannerImage.length != 0 &&

          <FlatListSlider
        //   indicatorActiveColor={'#fff'}
        //   indicatorInActiveColor={'#fff'}
            data={bannerImage}
            height={180}
            indicator={false}
            
        
            // indicatorActiveColor={'#f46b78'}
            // indicatorActiveWidth={30}
          /> 

        }

</>

    )
}




export default OfferBanner