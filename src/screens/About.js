import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Empty from '../component/Empty';
import { COLOR } from '../constant/constant';

const About = () => {
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
