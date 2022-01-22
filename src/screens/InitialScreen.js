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
    const [allCity, setAllCity] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [isLoading, setIsLoading] = useState(true)
    const [isInternetConected, setIsInternetConected] = useState(false)
    const [isCityFound, setIsCityFound] = useState(false)
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();
    // Internet connection listener
    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type', state.type);
            // console.log(`Connection type  ${state.type}`);
            console.log('Is connected?', state.isConnected);
            setIsInternetConected(state.isConnected)
            dispatch(IS_INTERNET_ACTIVE(state.isConnected));
        });
        return unsubscribe;
    }, []);


    const cityUrl = APIurls.cityURL
    const getCity = async () => {
        console.log("InitialScreen---------city url-------", cityUrl)
        console.log("CITY LIST LOADING..........")
        try {
            const res = await axios.get(cityUrl)
            // console.warn("---------city res-------", res)
            if (res) {
                const cityData = res.data.cities;
                console.log("CITY LIST LOADED SUCCESSFULLY..........")
                setAllCity(cityData)
                dispatch(CITY_ARRAY(cityData))
                console.log("CHECK IF USER SELECT CITY ALLREADY..........")
                getData()

            }
        } catch (error) {
            Alert.alert(
                "Alert",
                "Something went wrong !!",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            setIsLoading(false)  
            console.log("ERROR WHEN LOADING CITY LIST ..........&& REASON", error)
        }
    }
    useEffect(() => {
        getCity()
    }, []);
    //AsyncStorage function.............
    const storeData = async (Value) => {
        console.log(`TRYING TO STORE CITY VALUE = ${Value} IN  AsyncStorage ............... `)
        try {
            await AsyncStorage.setItem('@storage_Key', "" + Value)
            console.log(` CITY VALUE = ${Value} STORED SUCCESSFULLY IN  AsyncStorage :) `)
            dispatch(CURRENT_CITY(Value))
            
        } catch (e) {
            console.log(`ERROR TO STORE CITY VALUE IN  AsyncStorage !!! ERRMSG ${e}`)
        }
    }
    const getData = async () => {
        console.log(`TRYING TO GET CITY VALUE FROM  AsyncStorage ............... `)
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                console.log(" CITY VALUE FOUND IN AsyncStorage", value)
                setSelectedCity(value)
                // setIsLoading(false)
                onpressAction(value)
                // setTimeout(() => {
                //     onpressAction(value)
                // }, 1000);
            } else {
                console.log(" CITY VALUE NOT FOUND IN AsyncStorage")
                setIsLoading(false)
            }
        } catch (e) {
            console.log("ERROR TO GET CITY VALUE FROM  AsyncStorage !!!  ERRMSG", e)
            setIsLoading(false)
        }
    }

    const onpressAction = (selectedCity) => {
        console.warn("selectedCity", selectedCity)
        if (selectedCity) {
            dispatch(CURRENT_CITY(selectedCity))
            storeData(selectedCity)
            navigation.navigate('StackScreens')
        } else {
            console.log("please select city first ")
        }
    }


    //render
    // isLoading = true;
    if (isLoading) return <Loader />;
    return (
        <View
            style={styles.container}>
            <StatusBar backgroundColor={COLOR.primaryDark} barStyle={"light-content"} />
            <Image source={undraw} style={{ width: 300, height: 211 }} />
            <View style={{ width: windowWidth * 0.8, }}>
                <Text style={styles.title}> Select City </Text>
                <View
                    style={[styles.cityContainer, { backgroundColor: isInternetConected ? COLOR.primaryDark : "transparent", }]}>
                    {/* map mathod */}
                    {
                        allCity.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    style={[styles.cityRow, { backgroundColor: selectedCity == item.id ? COLOR.primary : "transparent", }]}
                                    key={i}
                                    onPress={() => { setSelectedCity(item.id) }}>
                                    <Text style={styles.cityText}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
            {/* next button */}
            {selectedCity ? (
                <TouchableOpacity
                    onPress={() => onpressAction(selectedCity)}
                    style={styles.nextButton}
                >
                    <Text style={{ fontWeight: "700", fontSize: 18, color: "#fff" }}>NEXT</Text>
                </TouchableOpacity>
            ) : <Text></Text>}

        </View>
    )
}

export default InitialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.primary,
        padding: 20,
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 5,
        color: "#fff"
    },
    cityContainer: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginTop: 5
    },
    cityRow: {
        paddingLeft: 25,
        paddingVertical: 10,
        borderRadius: 5
    },
    cityText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#fff",
        textTransform: "capitalize",
    },
    nextButton: {
        position: "absolute",
        bottom: 20, left: 10, right: 10,
        backgroundColor: COLOR.primaryDark,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center"
    }

})

