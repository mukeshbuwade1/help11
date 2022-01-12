import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//constant
import { COLOR, APIurls } from '../constant/constant';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_CITY, SET_SERVICE_ID } from "../redux/Action";
import axios from 'axios';
//image
import boy from "../image/boy.png"
import call from "../image/call.png"
import Email from "../image/email.png"

const EmployeeDetails = () => {
    //useState
    const [currentEmployee, setCurrentEmployee] = useState([])
    console.log("currentEmployee in EmployeeDetails", currentEmployee)
    //REDUX
    const myState = useSelector((state) => state.changeState);
    const { currnt_city_id, currnt_service_id } = myState;
    const dispatch = useDispatch();
    console.log("myState in EmployeeDetails", myState)
    const { employeeURL } = APIurls;
    const createEmpoyeeLink = `${employeeURL}city_id=${currnt_city_id}&service_id=${currnt_service_id}`;
    console.log("createEmpoyeeLink", createEmpoyeeLink);

    const getSevice = async () => {
        const res = await axios.get(createEmpoyeeLink)
        const employeeData = res.data.employees
        setCurrentEmployee(employeeData)
    }
    useEffect(() => {
        getSevice()
    }, [])
    const RenderItem = ({ item }) => {
        console.log(item)
        const { email, name, number } = item;
        return (
            <View
                style={{
                    flexDirection: "row",
                    backgroundColor: COLOR.primaryDark,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    marginTop: 10,
                    borderRadius: 7,
                    width: "100%",
                    alignItems: "center"
                }}>
                <Image source={boy} style={{ width: 65, height: 65 }} />
                <View style={{ marginLeft: 15, }}>
                    <View>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "600",
                                textTransform: "uppercase",
                                color: "#fff"
                            }}>
                            {name}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }} >
                            <Image
                                source={call}
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: 10,
                                }}
                                tintColor={COLOR.textLight}
                            />
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: "600",
                                    color: COLOR.textLight
                                }}
                            >
                                {number}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <Image source={Email} style={{ width: 15, height: 15, marginRight: 10, }} tintColor={COLOR.textLight} />
                            <Text style={{ fontSize: 14, fontWeight: "600", color: COLOR.textLight }} >{email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: COLOR.textLight, flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 5, marginTop: 5, borderRadius: 5 }}>
                        <Image source={call} style={{ width: 18, height: 18, marginRight: 20, }} tintColor={COLOR.primary} />
                        <Text style={{ fontSize: 14, fontWeight: "700", textTransform: "uppercase", color: COLOR.primary }}>call now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    //render
    return (
        <View style={{ flex: 1, backgroundColor: COLOR.primary, paddingHorizontal: 10 }}>
            <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: "300" }} >City</Text>
                <Text style={{ color: "#fff", fontSize: 13, fontWeight: "300" }} >Service</Text>
            </View>
            <FlatList
                data={currentEmployee}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default EmployeeDetails

const styles = StyleSheet.create({})
