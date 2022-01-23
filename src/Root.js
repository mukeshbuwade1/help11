import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated, Alert } from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown'
import { Picker } from '@react-native-picker/picker';
// Constant....
import { COLOR } from './constant/constant';
// images....
import home from "./image/home.png";
import film from "./image/film.png";
import information from "./image/information-button.png";
import news from "./image/news.png";
import close from "./image/close.png";
import menu from "./image/menu.png";
import location from "./image/location.png";

//screens......
import Home from './screens/Home';
import News from './screens/News';
import Video from './screens/Video';
import About from './screens/About';
import NewsPaper from './screens/NewsPaper';

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, CITY_ARRAY, HOME_TAB_FLAG } from "./redux/Action";
//API URL
import { APIurls } from './constant/constant';
import axios from 'axios';
//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';


//RENDER FUNCTION
const Root = ({ navigation }) => {
    //redux
    const myState = useSelector((state) => state.changeState)
    const dispatch = useDispatch()
    const initialSelectedCity = myState.currnt_city_id;
    const isInternetActive = myState.is_internet
    console.log("currnt city", myState.currnt_city_id)
    console.log("*******redux data *******", myState)
    const StoredCity = myState.city_array

    const [active, setactive] = useState("Home")
    const [ShowMenu, setShowMenu] = useState(false)
    const [allCity, setAllCity] = useState(StoredCity);
    const [selectedCity, setSelectedCity] = useState(initialSelectedCity);
    // const [flag, setFlag] = useState(false)

    const storeData = async (value) => {
        // console.log("data value =", value)
        console.log(`TRYING TO STORE CITY VALUE = ${value} IN  AsyncStorage ............... `)
        try {
            await AsyncStorage.setItem('@storage_Key', "" + value)
            console.log(` CITY VALUE = ${value} STORED SUCCESSFULLY IN  AsyncStorage :) `)
            dispatch(CURRENT_CITY(value))
        } catch (e) {
            console.log(`ERROR TO STORE CITY VALUE IN  AsyncStorage !!! ERRMSG ${e}`)
        }
    }

    const getData =  async() => {
        try {
            const Value = await AsyncStorage.getItem('@storage_Key')
            if (Value !== null) {
                console.log(" CITY VALUE FOUND IN AsyncStorage", Value)

                //dispatch(CURRENT_CITY(Value))
                setSelectedCity(Value)
                // setIsCitySelected("StackScreens")
                // value previously stored
            }else{
                setSelectedCity(2)
            }
        } catch (e) {
            console.log("ERROR TO GET CITY VALUE FROM  AsyncStorage !!!  ERRMSG", e)
            return  myState.currnt_city_id
        }
    }
    // useEffect(() => {
    //    getData()
    // }, [])

    // useEffect(()=>{

    //     const data =  myState.currnt_city_id;
    //     if(data.toString().length !=0){

    //         setSelectedCity(data)
    //     }
    // })

    const selectCity = () => {
        return (
            <View style={{ height: 50, width: 150, justifyContent: "center" }}>
                <Picker
                
                    dropdownIconColor={"#fff"}
                    style={{ height: 50, width: 150, color: '#fff', }}
                    selectedValue={selectedCity}
                    onValueChange={(itemValue, itemIndex) => {
                        // console.log("data value initial =", itemValue)
                        // console.log("flag value =", flag)
                        setSelectedCity(itemValue)
                        storeData(itemValue)
                    }}>
                    {console.log("selectedCity", selectedCity)}
                    {
                        allCity.map(i => {
                            let { name, id } = i;
                            return (<Picker.Item label={name} value={id} key={id} />)
                        })
                    }
                </Picker>
                <Image style={{ position: "absolute", right: 10, zIndex: -1, width: 24, height: 24, tintColor: "#fff" }} source={location} />
            </View>
        )
    }

    //Animated view..................
    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const closeButtonOffset = useRef(new Animated.Value(0)).current

    const viewAnimation = () => {
        Animated.timing(scaleValue, {
            toValue: ShowMenu ? 1 : 0.88,
            duration: 300,
            useNativeDriver: true
        }).start()

        Animated.timing(offsetValue, {
            toValue: ShowMenu ? 0 : 230,
            duration: 300,
            useNativeDriver: true
        }).start()

        setShowMenu(!ShowMenu)
    }
    console.log("myState.home_tab)", myState.home_tab)
    useEffect(() => {
        if (myState.home_tab) {
            setactive("Home")
            console.log("myState.home_tab", myState.home_tab)
        }
    }, [active, myState.home_tab])


    const selectScreen = (active, navigation) => {
        switch (active) {
            case "Home":
                return <Home navigation={navigation} />;
            case "News":
                return <News />
            case "Video":
                return <Video />
            case "AboutUs":
                return <About />
            case "News Paper":
                return <NewsPaper />
            default:
                return <Home navigation={navigation} />

        }
    }
    const activewindowAndAnimation = (Title) => {
        dispatch(HOME_TAB_FLAG(false))
        setactive(Title),
            viewAnimation()
    }

    const myTab = (Title, icon) => {
        return (
            <TouchableOpacity onPress={
                () => activewindowAndAnimation(Title)
            } style={{ flexDirection: "row", borderRadius: 5, paddingHorizontal: 20, paddingVertical: 7, backgroundColor: active == Title ? "#fff" : "transparent", marginVertical: 3 }} >
                <Image style={{ width: 25, height: 25, tintColor: active == Title ? COLOR.primary : "#fff" }} source={icon} />
                <Text style={{ fontSize: 18, fontWeight: "700", marginLeft: 15, color: active == Title ? COLOR.primary : "#fff" }}>{Title}</Text>
            </TouchableOpacity>
        )

    }
    //RENDER
    const isLoading = false;
    if (isLoading) return <Loader />;
    return (
        <View style={{ flex: 1, }}>
            {
                isInternetActive == false ? (
                    Alert.alert("Internet Error", "Please connect to your internet")
                ) : (<View style={{ flex: 1, }}>
                    <View style={{ flex: 1, backgroundColor: COLOR.primaryDark, paddingTop: 80, paddingHorizontal: 20, alignItems: "flex-start", justifyContent: "flex-start" }} >
                        <Text style={{ fontSize: 25, fontWeight: "700", color: "#fff" }} >WellCome</Text>
                        <View style={{ marginTop: 30 }} >
                            {myTab("Home", home)}
                            {myTab("News", news)}
                            {myTab("News Paper", news)}
                            {myTab("Video", film)}
                            {myTab("AboutUs", information)}      
                        </View>
                        <Text style={{position:"absolute", bottom:30, left:40,fontSize:11}}> &copy; 2021 REnews18</Text>
                    </View>
                    <Animated.View style={{
                        flexGrow: 1,
                        position: "absolute",
                        backgroundColor: COLOR.primary,
                        top: 0, left: 0, right: 0, bottom: 0,
                        paddingTop: active == "Home" ? 7 : 20,
                        borderRadius: ShowMenu ? 15 : 0,
                        //Animated view 
                        transform: [
                            { scale: scaleValue },
                            { translateX: offsetValue }
                        ]
                    }}
                    >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 15, }}>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center" }}
                                onPress={() => { viewAnimation() }}>
                                <Image source={ShowMenu ? close : menu} style={{ width: 20, height: 20, tintColor: "#fff" }} />
                                <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "600", color: "#fff" }}>{active}</Text>
                            </TouchableOpacity>
                            {
                                active == "Home" ? selectCity() : null
                            }
                        </View>

                        {selectScreen(active, navigation)}
                    </Animated.View>
                </View>
                )
            }
        </View>
    )
}

export default Root

const styles = StyleSheet.create({})