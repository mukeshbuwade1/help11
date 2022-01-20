import React from 'react'
import { ImageBackground,BackHandler, ActivityIndicator, FlatList, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
// import CommonHeader from '../component/CommonHeader';
// import { Colors } from '../constant/Constant';
import { COLOR, APIurls } from '../constant/constant';
import Screenshot from "../image/Screenshot.png";
import axios from "axios";
// import Emptylist from '../components/Emptylist';
import Loader from '../component/Loader';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { HOME_TAB_FLAG,  } from "../redux/Action";


const data = [
    { pdfcover: Screenshot, file: "https://renews18.com/public/storage/newspaper/2JRBDNBvdCUeWpadh5RbA1bya61NLKmMxHFvXlhI.pdf" },
    { pdfcover: Screenshot, file: "https://drive.google.com/file/d/1irQpSCOFAQuk6Qf77Df5j1KbYJYQLdLu/view?usp=sharing" }
]

const renderItem = ({ item }) => {
    const url = item.file
    return (
        <TouchableOpacity onPress={() => Linking.openURL(url)} style={{ marginBottom: 25, marginTop: 5 }} >
            <ImageBackground source={item.pdfcover? item.pdfcover:require("../image/Screenshot.png") } style={{ width: 325, height: 550, justifyContent: "center", alignItems: "center" }} >
                <View style={{ padding: 15, backgroundColor: "#a00b", borderRadius: 15 }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "#fff" }}>
                        26/12/2021
                    </Text>
                    <Text style={{ fontSize: 15, fontWeight: "bold", color: "#fff" }}>
                        Click here to read news
                    </Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const NewsPaper = () => {
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true)
    const [news, setNews] = React.useState([])
    // const getNews = async (api) => {
    //     const newslink = api[3].request.url
    //     const news = await axios.get(newslink)

    // }
    //   backhandler
    React.useEffect(() => {
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

    const mycategoty = async () => {
        const myURL = APIurls.newspaperpdf
        console.log("TRYING TO GET NEWSPAPER DATA.........")
        try {
            const res = await axios.get(myURL)
            console.log("NEWSPAPER LOADED..........")
            if (res) {
                setIsLoading(false)
                const data = res.data.newspapers;
                console.log("news123", data)
                setNews(data)
            } else {
                console.log("NEWSPAPER DATA NOT FOUND.........")
                Alert.alert("Server Error", "Retry again")
            }
        }
        catch (err) {
            console.log("ERROR WHEN LOADING NEWSPAPER ..........")
            console.log("ERROR", err)
            if (err) {
                setIsLoader(false)
            }
        }
    }
    React.useEffect(() => {
        mycategoty();
    }, [])
    if (isLoading) return <Loader />;
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: COLOR.primary }}>
            {
                data.length == 0 ? null : (<FlatList
                    data={news}
                    renderItem={renderItem}
                    keyExtractor={(i, id) => id}
                />)
            }

        </SafeAreaView>
    )
}

export default NewsPaper

const styles = StyleSheet.create({})