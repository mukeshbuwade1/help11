// import { CURRENT_CITY, SET_SERVICE_ID, CURRENT_CITY_NAME,CITY_ARRAY,IS_INTERNET_ACTIVE } from "./Action";
import {current_city_id,is_internet_active,current_city_name, set_service_id, city_array,tab_flag,city_flag} from "./ActionType";
import { combineReducers } from "redux";

const initialState = {
    currnt_city_id: "",
    currnt_city_name:"",
    currnt_service_id: "",
    city_array:[],
    is_internet:null,
    home_tab: true,
    crr_city_flag:true
    
};

const changeState = (state = initialState, action) => {
    switch (action.type) {
        case current_city_id:
            return { ...state, currnt_city_id: action.payload }
        case set_service_id:
            return { ...state, currnt_service_id: action.payload }
        case current_city_name:
            return { ...state, currnt_city_name: action.payload }
        case city_array:
            return { ...state, city_array: action.payload }
        case is_internet_active:
            return { ...state, is_internet: action.payload }
        case tab_flag:
            return { ...state, home_tab: action.payload }
        case city_flag:
            return { ...state, home_tab: action.payload }
        default:
            return state
    }
}

const rootReducer = combineReducers({ changeState })
export default rootReducer;