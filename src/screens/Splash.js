import React,{useEffect} from 'react'
import { Animated, StyleSheet, StatusBar, Text, View } from 'react-native';
import { COLOR } from '../constant/constant';


const Splash = () => {
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLOR.primary }}>
            <StatusBar backgroundColor={COLOR.primaryDark} barStyle={"light-content"} />
            <View>
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "#fff",
                    }}>
                    Loading ....
                </Text>
               
            </View>

        </View>
    )
}

export default Splash

const styles = StyleSheet.create({})
