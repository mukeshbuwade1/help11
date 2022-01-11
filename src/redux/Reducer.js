import {CURRENT_CITY} from "./Action";
import { combineReducers } from "redux";

const initialState = {
    currnt_city_id: "",
};

const changeState=(state=initialState, action)=>{
    switch (action.type) {
        case CURRENT_CITY:
            return {...state, currnt_city_id: action.payload }
        default:
           return state
    }
}

const rootReducer = combineReducers({changeState})
export default rootReducer;