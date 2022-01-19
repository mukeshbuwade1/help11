import React, { useState, useEffect } from 'react'
import { BackHandler,StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions, Image, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import axios from 'axios';
//.............
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR, APIurls } from '../constant/constant';
//.................
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, HOME_TAB_FLAG } from "../redux/Action";

const windowWidth = Dimensions.get('window').width;

const Video = ({ navigation }) => {
    const myState = useSelector((state) => state.changeState)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [videodata, setVideodata] = useState([])
    const getVideoData = async() => {
        const url = APIurls.youtubeUrl;
        console.log("VIDEOS LOADING..........")
        try {
            console.log("------------url----------", url)
            const res = await axios.get(url);
            console.error("video link", res.data.videos)
            if(res.data.result){
                setIsLoading(false)
                setVideodata(res.data.videos)
            }
            console.log("--------- url-------", url)
            
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getVideoData()
    }, [])

//   backhandler
useEffect(() => {
    const backAction = () => {
        dispatch(HOME_TAB_FLAG(true))
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
    const renderItem = ({ item }) => {
        const { image, title, link } = item
        return (
            <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => Linking.openURL(link)}>
                <View style={{ width: windowWidth, height: 7, backgroundColor: COLOR.primaryDark }}>
                </View>
                <ImageBackground source={{uri:image}} resizeMode="cover" style={{ width: windowWidth, height: 250, justifyContent: "center", alignItems: "center" }}>                    
                    <AntDesign style={{ backgroundColor: "#000", borderRadius: 100, opacity: 0.7, padding: 20 }} name="stepforward" size={30} color="#fff" />
                </ImageBackground>
                <Text style={{ fontSize: 18, fontWeight: "700", marginHorizontal: 10, marginVertical: 5, color: "#fff" }}>{title}</Text>
            </TouchableOpacity>
        )
    }
    //RENDER
    // const isLoading = false;
    if (isLoading) return <Loader />;
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: COLOR.primary }}>
            <FlatList
                data={videodata}
                renderItem={renderItem}
                keyExtractor={(i, id) => id}
            />
        </SafeAreaView>
    )
}

export default Video

const styles = StyleSheet.create({})
