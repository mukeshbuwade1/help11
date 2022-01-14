import React, { useEffect, useState } from 'react'
import { FlatList, StatusBar, StyleSheet, Alert, Dimensions, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { COLOR, APIurls } from '../constant/constant';
import axios from "axios";
import Loader from '../component/Loader';
import undraw from "../image/undraw.png";
import NetInfo from '@react-native-community/netinfo';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, CITY_ARRAY, IS_INTERNET_ACTIVE } from "../redux/Action";
//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const InitialScreen = ({ navigation }) => {
    const [isInternetConected,setIsInternetConected] = useState(false)
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();
    // Internet connection listener
    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            setIsInternetConected(state.isConnected)
            dispatch(IS_INTERNET_ACTIVE(state.isConnected));
        });
        return unsubscribe;
    }, []);
    const [allCity, setAllCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [isLoading, setIsLoading] = useState(true)

    const cityUrl = APIurls.cityURL
    const getCity = async () => {
        console.log("---------city url-------", cityUrl)
        const res = await axios.get(cityUrl)
        // console.warn("---------city res-------", res)
        if (res) {
            setIsLoading(false)
        }
        const cityData = res.data.cities;
        setAllCity(cityData)
        dispatch(CITY_ARRAY(cityData))
    }
    useEffect(() => {
        // dispatch(IS_INTERNET_ACTIVE(value))
        getCity()
    }, []);
    //AsyncStorage function.............
    const storeData = async (Value) => {
        //console.log("data Value =", Value)
        // const val= toString(Value)
        // console.log("data val =", val)
        try {
            await AsyncStorage.setItem('@storage_Key', "" + Value)
            console.log("data saved in AsyncStorage", Value)
        } catch (e) {
            console.log("error when set AsyncStorage with ERROR : ", e)
        }
    }
    const cityIsSelected = (Value) => {
        //console.log(`fromasync ${Value}`)
        // console.log(`for + async  && ${navigation}`)
        //dispatch(CURRENT_CITY(Value))
        console.log("dispatch({ type: CURRENT_CITY, payload: Value })", myState)
        //navigation.navigate('StackScreens')
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                console.log("city found", value)
                console.log(`fromasync ${value} && ${navigation}`)
                cityIsSelected(value)
                // setIsCitySelected("StackScreens")
                // value previously stored
            }
        } catch (e) {
            // error reading value
            console.log("error when get city")
        }
    }
    useEffect(() => {
        getData()
    }, [])
    //render
    // const isLoading = true;
    if (isLoading) return <Loader />;
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLOR.primary,
                padding: 20,
                alignItems: "center"
            }}>
            <StatusBar backgroundColor={COLOR.primaryDark} barStyle={"light-content"} />
            {/* {isInternetActive === false ? Alert.alert("Internet Error", "Please connect to Network") : console.log("internet connected")} */}
            <Image source={undraw} style={{ width: 300, height: 211 }} />
            <View style={{ width: windowWidth * 0.8, }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "700",
                        marginLeft: 5,
                        color: "#fff"
                    }}>
                    Select City
                </Text>
                <View
                    style={{
                        width: "100%",
                        backgroundColor: isInternetConected ? COLOR.primaryDark : "transparent",
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        borderRadius: 10,
                        marginTop: 5
                    }}>
                    {/* map mathod */}
                    {
                        allCity.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: selectedCity == item.id ? COLOR.primary : "transparent",
                                        paddingLeft: 25,
                                        paddingVertical: 10,
                                        borderRadius: 5
                                    }}
                                    key={i}
                                    onPress={() => {

                                        setSelectedCity(item.id)
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            fontWeight: "500",
                                            color: "#fff",
                                            textTransform: "capitalize",
                                        }}>{item.name}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
            {/* next button */}
            {selectedCity ? (
                <TouchableOpacity
                    onPress={() => {
                        // console.log("selectedCity", selectedCity)
                        if (selectedCity) {
                            dispatch(CURRENT_CITY(selectedCity))
                            storeData(selectedCity)
                            navigation.navigate('StackScreens')
                        } else {
                            console.log("please select city first ")
                        }
                    }}
                    style={{
                        position: "absolute",
                        bottom: 20, left: 10, right: 10,
                        backgroundColor: COLOR.primaryDark,
                        borderRadius: 5,
                        paddingVertical: 10,
                        alignItems: "center"
                    }}
                >
                    <Text style={{ fontWeight: "700", fontSize: 18, color: "#fff" }}>
                        NEXT
                    </Text>
                </TouchableOpacity>
            ) : <Text></Text>}

        </View>
    )
}

export default InitialScreen

const styles = StyleSheet.create({})
