// import {CURRENT_CITY, CURRENT_CITY_NAME, SET_SERVICE_ID, CITY_ARRAY, IS_INTERNET_ACTIVE} from "./ActionType";
import {current_city_id,is_internet_active,current_city_name, set_service_id, city_array} from "./ActionType";

export const CURRENT_CITY = (value) => {
    return (
        { type: current_city_id, payload: value , }
    )
}
export const CURRENT_CITY_NAME = (value) => {
    return (
        { type: current_city_name, payload: value , }
    )
}
export const SET_SERVICE_ID = (value) => {
    return (
        { type: set_service_id, payload: value, }
    )
} 
export const CITY_ARRAY = (value) => {
    return (
        { type: city_array, payload: value , }
    )
}
export const IS_INTERNET_ACTIVE = (value) => {
    return (
        { type: is_internet_active, payload: value , }
    )
}