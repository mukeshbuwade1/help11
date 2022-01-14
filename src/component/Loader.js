import React from "react";
import { ActivityIndicator, View, StyleSheet, Dimensions } from "react-native";
//import { ActivityIndicator, Colors } from "react-native-paper";
// import Colors from '../Constants/Colors';
import { COLOR } from "../constant/constant";


export default Loader = (props) => {

    return (
        <View style={{ ...STYLES.loadingContainer, ...props.loadingContainer }} >
            <ActivityIndicator animating={true} style={STYLES.loader} size={props.loaderSize ? props.loaderSize : "large"} color={props.loader ? props.loader : "#fff"} />
        </View>
    );

}

const STYLES = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: 997,
        backgroundColor: COLOR.primary,
        //borderWidth: 1
    },
    loader: {
        //borderWidth: 1
    },

    container: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: 997,
    },
    containerOpac: {
        position: "absolute",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 998
    },
    spinner: {
        flex: 1,
        alignSelf: "center",
        zIndex: 1000
    }
});
