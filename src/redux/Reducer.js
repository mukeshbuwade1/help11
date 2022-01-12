import { CURRENT_CITY, SET_SERVICE_ID, CURRENT_CITY_NAME,CITY_ARRAY } from "./Action";
import { combineReducers } from "redux";

const initialState = {
    currnt_city_id: "",
    currnt_city_name:"",
    currnt_service_id: "",
    city_array:[]
    
};

const changeState = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_CITY:
            return { ...state, currnt_city_id: action.payload }
        case SET_SERVICE_ID:
            return { ...state, currnt_service_id: action.payload }
        case CURRENT_CITY_NAME:
            return { ...state, currnt_city_name: action.payload }
        case CITY_ARRAY:
            return { ...state, city_array: action.payload }
        default:
            return state
    }
}

const rootReducer = combineReducers({ changeState })
export default rootReducer;