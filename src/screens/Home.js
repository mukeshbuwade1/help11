import React, { useState } from 'react'
import { LogBox, ScrollView, ActivityIndicator, SafeAreaView, StyleSheet, Text, View, Image, Button, Dimensions, FlatList, TouchableOpacity, StatusBar } from 'react-native';
// import {cityapi} from "../tempdata/TempData" ;
import { SliderBox } from 'react-native-image-slider-box';
import TextTicker from 'react-native-text-ticker';
import { COLOR, APIurls } from '../constant/constant';
import Loader from '../component/Loader';
import axios from "axios";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, SET_SERVICE_ID } from "../redux/Action";

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
    const [allServiceList, setAllServiceList] = React.useState([]);
    const [allHeadlineText, setAllHeadlineText] = React.useState("ERROR: text not found fron server")
    const [timer, setTimer] = React.useState(3000)
    const [isLoading, setIsLoading] = useState(true)
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();
    console.log("myState", myState)
    const serviceUrl = APIurls.serviceURL
    const mycategoty = async () => {
        console.log("--------- url-------", serviceUrl)
        const res = await axios.get(serviceUrl)
        if (res) {
            setIsLoading(false)
        }
        const serviceData = res.data.services;
        // console.warn(serviceData)
        setAllServiceList(serviceData)
    }
    const getText = async () => {
        const url = APIurls.headlineUrl
        console.log("Home---------headlineUrl-------", url)
        
        try {
            const res = await axios.get(url);
            
            const Headline = res.data.headline[0].text;
            console.log("HEADLINE LOADED SUCCESSFULLY :)",Headline)
            setAllHeadlineText(Headline)
            const textlength = Headline.length
            setTimer(textlength * 100)
            console.log("textlength is ",textlength, " and type of textlength", typeof(textlength))

        } catch (error) {
            console.log("ERROR WHEN LOADING HEADLINE ..........&& REASON",error)
        }
    }

    React.useEffect(() => {
        mycategoty();
        getText()
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])


    const state = {
        images: [
            'https://source.unsplash.com/1024x768/?nature',
            'https://source.unsplash.com/1024x768/?water',
            'https://source.unsplash.com/1024x768/?girl',
            'https://source.unsplash.com/1024x768/?tree', // Network image
            // Local image
        ],
    };

    const getEmployee = (id) => {       
        dispatch(SET_SERVICE_ID(id))
        if (myState.currnt_city_id.length != 0) {
            navigation.navigate('EmployeeDetails')
        } else {
            alert("select city again")
        }
    }

    const renderItem = ({ item, navigation }) => {
        const { id, file, title } = item;
        return (
            <TouchableOpacity
                onPress={() => getEmployee(id, navigation)}
                style={{
                    backgroundColor: '#cfaca9',
                    margin: 5,
                    borderRadius: 5,
                    width: windowWidth * 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                }}
            >
                {console.log("item", item.id)}
                {/* <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Home-icon.svg/1200px-Home-icon.svg.png" }} style={{ width: 40, height: 40 }} /> */}
                <Image source={{ uri: file }} style={{ width: 40, height: 40 }} />
                <Text style={{ textAlign: 'center', color: "#000" }}> {title} </Text>
            </TouchableOpacity>
        );
    };

    //RENDER
    // const isLoading = false;
    if (isLoading) return <Loader />;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.primary }} >
            <StatusBar backgroundColor={COLOR.primaryDark} barStyle={"light-content"} />
            {/*....main view........ */}
            <ScrollView
                scrollEnabled={false}
                style={{ width: windowWidth }}>
                <View style={{ width: windowWidth }}>
                    {/*......slider ...... */}
                    <SliderBox
                        sliderBoxHeight={200}
                        dotStyle={{ width: 0 }}
                        autoplay={true}
                        circleLoop={true}
                        images={state.images}
                    />
                </View>
                {/*..marquee..text */}
                <View style={{ backgroundColor: COLOR.primary, width: windowWidth }}>
                    <TextTicker
                        style={{
                            fontSize: 15,
                            paddingVertical: 5,
                            color: "#fff",
                            paddingLeft: 20
                        }}
                        duration={timer}
                        loop
                        bounce
                        repeatSpacer={50}>
                        {allHeadlineText}
                        {/* {headline.map((val) => <Text>{val.text} </Text>)} */}
                    </TextTicker>
                </View>
                {/* ....categoryType.....*/}
                <View
                    style={{
                        width: windowWidth,
                        backgroundColor: "#edccca",
                        minHeight: 500
                    }}>
                    <FlatList
                        removeClippedSubviews
                        data={allServiceList}
                        renderItem={renderItem}
                        keyExtractor={(item, id) => id}
                        numColumns={3}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})
