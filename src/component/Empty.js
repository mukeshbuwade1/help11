import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import undraw1 from "../image/undraw1.png";
import { COLOR } from '../constant/constant';

const Empty = () => {
    return (
        <View
        style={{
            flex: 1,
            backgroundColor: COLOR.primary,
            padding: 20,
            alignItems: "center"
        }}>
            <Image source={undraw1} style={{ width: 300, height: 211 }}/>
            <Text style={{
                fontSize:18,
                textTransform:"capitalize",
                color:"#fff"
            }}>screen is under construction</Text>
            <Text></Text>
        </View>
    )
}

export default Empty

const styles = StyleSheet.create({})
