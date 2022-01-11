import React, { useRef, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
// Constant....
import { COLOR } from './constant/constant';
// icons..........
// images....
import home from "./image/home.png";
import film from "./image/film.png";
import information from "./image/information-button.png";
import news from "./image/news.png";
import close from "./image/close.png";
import menu from "./image/menu.png";

//header.........
import Header from './component/Header';

//screens......
import Home from './screens/Home';
import News from './screens/News';
import Video from './screens/Video';
import About from './screens/About';
//RNPickerSelect

const Root = () => {
    const [active, setactive] = useState("Home")
    const [ShowMenu, setShowMenu] = useState(false)
    // const [selectedLocationValue, setSelectedLocationValue] = useState("java");
    const [selectedCity, setSelectedCity] = useState();
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    console.log("selectedCity", selectedCity)
    const selectCity =()=>{
        return(
            <SelectDropdown
            buttonStyle={{justifyContent:"flex-end" , backgroundColor:"transparent", width:130,margin:0,padding:0  }}
            buttonTextStyle={{color:"#fff"}}
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            setSelectedCity(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
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

    const selectScreen = (active) => {
        switch (active) {
            case "Home":
                return <Home />;
            case "News":
                return <News />
            case "Video":
                return <Video />
            case "AboutUs":
                return <About />
            default:
                return <Home />

        }
    }
    const activewindowAndAnimation = (Title) => {
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
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, backgroundColor: COLOR.primaryDark, paddingTop: 80, paddingHorizontal: 20, alignItems: "flex-start", justifyContent: "flex-start" }} >
                <Text style={{ fontSize: 25, fontWeight: "700", color: "#fff" }} >WellCome</Text>
                <View style={{ marginTop: 30 }} >
                    {myTab("Home", home)}
                    {myTab("News", news)}
                    {myTab("Video", film)}
                    {myTab("AboutUs", information)}
                </View>
            </View>
            <Animated.View style={{
                flexGrow: 1,
                position: "absolute",
                backgroundColor: COLOR.primary,
                top: 0, left: 0, right: 0, bottom: 0,
                paddingTop: active == "Home"?7:20,
                borderRadius: ShowMenu ? 15 : 0,
                //Animated view 
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }}
            >
                <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center", paddingHorizontal: 15,}}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row"
                        }}
                        onPress={() => {
                            viewAnimation()
                        }}>
                        <Image source={ShowMenu ? close : menu} style={{ width: 25, height: 25, tintColor: "#fff" }} />
                        <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: "600", color: "#fff" }}>{active}</Text>
                    </TouchableOpacity>
                    {
                        active == "Home" ? selectCity() : null
                    }
                </View>

                {selectScreen(active)}
            </Animated.View>
        </View>
    )
}

export default Root

const styles = StyleSheet.create({})

{/* 
    <Entypo name="newsletter" size={24} color="black" />
    <Entypo name="home" size={24} color="black" />
    <Entypo name="folder-video" size={24} color="black" />
    <Entypo name="user" size={24} color="black" />
 */}
