import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native';
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


    const [allCity, setAllCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState();

    const cityUrl = APIurls.cityURL
    const getCity = async () => {
        const res = await axios.get(cityUrl)
        const cityData = res.data.cities;
        setAllCity(cityData)
        dispatch({ type: CITY_ARRAY, payload: cityData })
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
            await AsyncStorage.setItem('@storage_Key',""+ value)
            console.log("data saved in AsyncStorage", value)
        } catch (e) {
            console.log("error when set AsyncStorage with ERROR : ", e)
        }
    }

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
                    console.log("selectedCity", selectedCity)
                    if (selectedCity) {
                        dispatch({ type: CURRENT_CITY, payload: selectedCity })
                        storeData(selectedCity)
                        // navigation.navigate('StackScreens')
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
