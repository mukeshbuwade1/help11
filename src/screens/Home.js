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
const windowHeight = Dimensions.get('window').height;
const Home = ({ navigation }) => {
    const [allServiceList, setAllServiceList] = React.useState([]);
    const [allHeadlineText, setAllHeadlineText] = React.useState("")
    const [timer, setTimer] = React.useState(3000)
    const [isLoading, setIsLoading] = useState(true)
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();
    console.log("myState", myState)


    // const headline = [{
    //     text: "Super long piece of text is long. The quick brown fox jumps over the lazy dog."
    // },
    // {
    //     text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
    // }]
    // headline.map((val)=>{
    //     setAllHeadlineText({})
    // })





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
        console.log("text")
        const res = await axios.get("https://www.getpostman.com/collections/5685ec58059ef4609039");
        // const abcurl = res.data.item[3].request.url
        // const abcres = await axios.get(abcurl);
        // console.error("abcres",abcres.data.newspapers)
        const api = res.data.item
        const url = api[5].request.url
        console.log("--------- url-------", url)
        const URLres = await axios.get(url)
        const textList = URLres.data.headline;
        console.log("lenght", textList.length)
        let text = "";
        let totleLenght = 0;
        for (let i = 0; i < textList.length; i++) {
            text = text + textList[i].text + " || "
            totleLenght = totleLenght + textList[i].text.length
        }
        console.log("finalText : ", text)
        setAllHeadlineText(text)
        console.log("length : ", totleLenght)
        setTimer(totleLenght * 100)
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
    const categoryType = [
        { title: 'plumber', icon: 'agriculture' },
        { title: 'Advocate', icon: 'agriculture' },
        { title: 'agarbatti manufacture', icon: 'agriculture' },
        { title: 'agriculture & fertilizer', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
        { title: 'plumber', icon: 'agriculture' },
    ];

    const getEmployee = async (id) => {
        // console.log("APIurls",APIurls.employeeURL);
        // console.log("id",id);
        // console.log("city id", myState.currnt_city_id);
        // http://renews18.com/api/employee_list?city_id=1&service_id=1;

        // const createEmpoyeeLink = `${APIurls.employeeURL}city_id=${myState.currnt_city_id}&service_id=${id}`;
        // console.log("createEmpoyeeLink",createEmpoyeeLink);
        // const res = await axios.get(createEmpoyeeLink);
        // console.log(res.data.employees)
        // console.warn("navigation",navigation)
        await dispatch(SET_SERVICE_ID(id))
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
