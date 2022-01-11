import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking, Dimensions, Image, SafeAreaView, FlatList, ImageBackground } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { Colors } from "../constant/Constant";
import thumbnail from "../image/thumbnail.jpg";
import err from "../image/404.jpg";
import insta from "../image/insta.jpg";
import newn from "../image/newn.jpg";
import iso from "../image/iso.jpg";
// import CommonHeader from '../component/CommonHeader';
//.............
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../constant/constant';
//.................

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const videodata = [
    { thumbnail: thumbnail, title: "Create a Netflix logo using css", link: "https://www.youtube.com/watch?v=hMgidlSVRmk", },
    { thumbnail: err, title: "Amazing 404 Typography Page Using Html & CSS Only", link: "https://www.youtube.com/watch?v=gSpCRacA6ck", },
    { thumbnail: insta, title: "Instagram logo with HTML and CSS", link: "https://www.youtube.com/watch?v=urUVzGzx-ks", },
    { thumbnail: newn, title: "Attractive Isometric text by HTML and CSS", link: "https://www.youtube.com/watch?v=uv-s1H610Dw", },
    { thumbnail: iso, title: "Atractive Neon Text || webdevelopment tricks 2021", link: "https://www.youtube.com/watch?v=89Aroh2pBN0", },

]

const renderItem = ({ item }) => {
    const { thumbnail, title, link } = item
    return (
        <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => Linking.openURL(link)}>
            <View style={{ width: windowWidth, height: 7, backgroundColor: COLOR.primaryDark }}>
            </View>
            <ImageBackground source={thumbnail} style={{ width: windowWidth, height: 250, justifyContent: "center", alignItems: "center" }}>
                {/* <AntDesign style={{ backgroundColor: "#000", borderRadius: 100, opacity: 0.7 }} name="play" size={80} color="#fff" /> */}
                <AntDesign style={{ backgroundColor: "#000", borderRadius: 100, opacity: 0.7,padding:20 }} name="stepforward" size={30} color="#fff" />
            </ImageBackground>

            <Text style={{ fontSize: 18, fontWeight: "700", marginHorizontal: 10, marginVertical: 5, color: "#fff" }}>{title}</Text>

        </TouchableOpacity>
    )
}

const Video = ({navigation}) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: COLOR.primary }}>
            {/* <CommonHeader navigation={navigation} title={"Videos"}/> */}
            
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
