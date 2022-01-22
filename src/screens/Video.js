import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Alert, Linking, Dimensions, Image, SafeAreaView, FlatList, ImageBackground ,BackHandler} from 'react-native';
import axios from 'axios';
//.............
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR, APIurls } from '../constant/constant';
//.................


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Video = ({ navigation }) => {
    const [videoList, setVideoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getVideoData = async () => {
        const url = APIurls.youtubeUrl
        console.log("VIDEO LIST LOADING..........")
        try {
            const res = await axios.get(url);
            const data = res.data.videos
            console.log(data)
            setVideoList(data)
            // const api = res.data.item
            // const url = api[5].request.url
            if (url) {
                setIsLoading(false)
                console.log("VIDEO LIST LOADED SUCCESSFULLY :)")
            }
            console.log("video.js------------url----------", url)

        } catch (error) {
            console.log("ERROR WHEN LOADING VIDEO LIST .......... && ERRMSG", error)
        }
    }

    useEffect(() => {
        getVideoData()
    }, [])

    // backbutton Handler
    useEffect(() => {
        const backAction = () => {
            navigation.navigate("Root")
        //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //     {
        //       text: "Cancel",
        //       onPress: () => null,
        //       style: "cancel"
        //     },
        //     { text: "YES", onPress: () => BackHandler.exitApp() }
        //   ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    

    const renderItem = ({ item }) => {
        console.error(item)
        const { image, title, link } = item
        return (
            <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => Linking.openURL(link)}>
                <View style={{ width: windowWidth, height: 7, backgroundColor: COLOR.primaryDark }}>
                </View>
                <ImageBackground source={{uri:image}} style={{ width: windowWidth, height: 250, justifyContent: "center", alignItems: "center" }}>
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
                data={videoList}
                renderItem={renderItem}
                keyExtractor={(i, id) => id}
            />
        </SafeAreaView>
    )
}

export default Video

const styles = StyleSheet.create({})
