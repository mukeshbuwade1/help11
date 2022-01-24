import React, { useEffect } from 'react'
import { BackHandler, ImageBackground, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Empty from '../component/Empty';
import { COLOR } from '../constant/constant';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, HOME_TAB_FLAG } from "../redux/Action";

const windowWidth = Dimensions.get('window').width;

const About = () => {
  const myState = useSelector((state) => state.changeState)
  const dispatch = useDispatch()
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.primary,
        padding: 20,
        alignItems: "center"
      }}>

      <ImageBackground
        source={require("../image/about.jpg")}
        resizeMode='cover'
        style={{
          width: windowWidth,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        }} >
        <View
          style={[styles.border, {
            width: "95%",
            height: "70%",
          }]}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "900",
              letterSpacing: 2,
              color: "#fff",
            }}>Who We Are?</Text>
        </View>
      </ImageBackground>
      <View style={{
        marginTop: 20,
        width: windowWidth,
        paddingHorizontal: 10,
      }}>
        <View style={{
          borderWidth: 5,
          borderRightColor: COLOR.primary,
          borderLeftColor: COLOR.primaryDark,
          borderBottomColor: COLOR.primary,
          borderTopColor: COLOR.primary,
          paddingLeft: 10,

        }}>

          <Text style={{
            fontSize: 18,
            fontWeight: "900",
            color:"#fff"
          }}>RE news...</Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "justify",
              color:"#fff"
            }}> {" \t "}  Renews is your platform for all the Latest News For Madhya Pradesh. You can find latest updates on Renews Application.
            In addition to it we also provide the Various types of Daily needs Service Providers to help you whenever you need.
          </Text>

        </View>
        <View style={{
          borderWidth: 5,
          borderRightColor: COLOR.primary,
          borderLeftColor: COLOR.primaryDark,
          borderBottomColor: COLOR.primary,
          borderTopColor: COLOR.primary,
          paddingLeft: 10,
          marginTop:30

        }}>

          <Text style={{
            fontSize: 18,
            fontWeight: "900",
            color:"#fff"
          }}>Contact us...</Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "justify",
              color:"#fff"
            }}>
            Address : Zone 1,MP nagar ,462021, Bhopal
            {"\n"}
            Website : renews18.com
          </Text>

        

        </View>
      </View>


    </View>
  )
}

export default About

const styles = StyleSheet.create({
  border: {
    borderWidth: 5,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: "95%",
    opacity: 0.9


  }
})
