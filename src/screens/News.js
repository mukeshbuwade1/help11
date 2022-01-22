import React,{useEffect} from 'react'
import {BackHandler,Alert ,   FlatList,  SafeAreaView, StyleSheet, Text, TouchableOpacity, View,  } from 'react-native';
// import CommonHeader from '../component/CommonHeader';
// import { Colors } from '../constant/Constant';
import { APIurls, COLOR } from '../constant/constant';
import Screenshot from "../image/Screenshot.png";
import axios from "axios";
// import Emptylist from '../components/Emptylist';
import Loader from '../component/Loader';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { HOME_TAB_FLAG,  } from "../redux/Action";

const News = () => {
    const [news, setNews] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const dispatch = useDispatch();


    const mycategoty = async () => {
        const url = APIurls.newspaper;
        console.log("NEWS LOADING..........")
        try {
            console.log("------------url----------", url)
            const res = await axios.get(url)
            if (res) {
                console.log("NEWS LOADED SUCCESSFULLY :)")
                setIsLoading(false)
            }
            const data = res.data.news
            console.log("newsapi", data)
            setNews(data)
        }
        catch (err) {
            console.log("ERROR WHEN LOADING NEWS ..........")
            console.log("ERROR", err)
            if (err) {
                setIsLoading(false)
            }
        }
    }
    React.useEffect(() => {
        mycategoty();
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
        console.log("item", item)
        const { title, description } = item
        return (
            <View style={{ padding: 25, backgroundColor: COLOR.primaryDark, marginTop: 5 }}>
                <Text style={{ fontSize: 18, color: "#fff", fontWeight: "700" }}>{title}</Text>
                <Text style={{ fontSize: 15, color: "#fffc", fontWeight: "400", marginTop: 10 }}> {description}</Text>
            </View>
        )
    }
    //RENDER
    // const isLoading = false;
    if (isLoading) return <Loader />;
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: COLOR.primary }}>
            {
                news.length == 0 ? null : (<FlatList
                    data={news}
                    renderItem={renderItem}
                    keyExtractor={(i, id) => id}
                />)
            }
        </SafeAreaView>
    )
}

export default News

const styles = StyleSheet.create({})
