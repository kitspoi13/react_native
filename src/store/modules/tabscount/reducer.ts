import {
    GET_COUNT,
} from './types';
import { AsyncStorage } from 'react-native';

interface TabCountState {
    for_acceptance: Number;
    in_transit: Number;
}

const initialState: TabCountState = {
    for_acceptance: 0,
    in_transit: 0,
}

export default function countTabsReducer(state = initialState, action: any): TabCountState {
    switch (action.type) {
        case GET_COUNT:
            console.log(action.payload)
            return {
                for_acceptance: action.payload.for_acceptance,
                in_transit: action.payload.in_transit,
            }
        default:
            return state
    }
}