import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { COLOR, APIurls } from '../constant/constant';
import axios from "axios";
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, CITY_ARRAY } from "../redux/Action";
//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const InitialScreen = ({ navigation }) => {

    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();
    const isInternetActive = myState.is_internet
    console.error("isInternetActive",isInternetActive)


    const [allCity, setAllCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState();

    const cityUrl = APIurls.cityURL
    const getCity = async () => {
        console.log("--------- url-------", cityUrl)
        const res = await axios.get(cityUrl)
        const cityData = res.data.cities;
        setAllCity(cityData)
        dispatch(CITY_ARRAY(cityData))
    }
    useEffect(() => {
        getCity()
    }, []);
    //AsyncStorage function.............
    const storeData = async (value) => {
        console.log("data value =", value)
        // const val= toString(value)
        // console.log("data val =", val)
        try {
            await AsyncStorage.setItem('@storage_Key', "" + value)
            console.log("data saved in AsyncStorage", value)
        } catch (e) {
            console.log("error when set AsyncStorage with ERROR : ", e)
        }
    }


    const cityIsSelected = (value) => {
        console.log(`fromasync ${value}`)
        // console.log(`for + async  && ${navigation}`)
        dispatch(CURRENT_CITY(value))
        console.warn("dispatch({ type: CURRENT_CITY, payload: value })", myState)
        //navigation.navigate('StackScreens')
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                console.warn("city found", value)
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

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {

                }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: "#fff",
                        textTransform: "capitalize",
                        marginVertical: 3
                    }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    //render
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLOR.primary,
                justifyContent: "center",
                alignItems: "center"
            }}>
                {!isInternetActive ? Alert.alert("Internet Error", "Please connect to your internet") : console.log("internet connected")}
            <View style={{ width: windowWidth * 0.6, }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "700",
                        marginLeft: 5,
                        color: "#fff"
                    }}
                >
                    Select City
                </Text>
                <View
                    style={{
                        width: "100%",
                        backgroundColor: COLOR.primaryDark,
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 5
                    }}>
                    {
                        allCity.map((item, i) => {

                            return (
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: selectedCity == item.id ? COLOR.primary : "transparent",
                                        paddingHorizontal: 15,
                                        paddingVertical: 10,
                                        borderRadius: 5
                                    }}
                                    key={i}
                                    onPress={() => {

                                        setSelectedCity(item.id)
                                    }}
                                >
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

                    {/* <FlatList
                        style={{ height: 200 }}
                        data={allCity}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    /> */}

                </View>
            </View>
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
        </View>
    )
}

export default InitialScreen

const styles = StyleSheet.create({})
