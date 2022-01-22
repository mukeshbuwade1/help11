import React,{useEffect} from 'react'
import { BackHandler,StyleSheet, Text, View } from 'react-native';
import Empty from '../component/Empty';
import { COLOR } from '../constant/constant';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, HOME_TAB_FLAG } from "../redux/Action";

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
           
            <Empty/>
            
        </View>
    )
}

export default About

const styles = StyleSheet.create({})
