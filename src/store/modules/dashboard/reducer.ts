import {
    LIST_ACCEPTANCE,
    LOADING_ACCEPTANCE,
    SELECT_REQUEST,
    VIEW_DETAILS,
    SET_KEYWORD,
    CLEAR_DETAILS,
    CLEAR_SEARCH,
    ACCEPTED_REQUEST,
    CLEAR_MESSAGE,
} from './types';
import { AsyncStorage } from 'react-native';

interface AcceptanceState {
    acceptance: {
        requestType: String,
        allChecked: boolean,
        request: [],
    },
    search: {
        keyword: String,
    },
    details: Object,
    message: String,
    isLoading: boolean;
}

const initialState: AcceptanceState = {
    acceptance: {
        requestType: '',
        allChecked: false,
        request: [],
    },
    search: {
        keyword: '',
    },
    details: {},
    message: '',
    isLoading: false,
};

export default function acceptanceReducer(state = initialState, action: any): AcceptanceState {
    switch (action.type) {
        case LIST_ACCEPTANCE:
            console.log('LIST_ACCEPTANCE', action.payload)
            return {
                ...state,
                acceptance: {
                    allChecked: false,
                    requestType: action.payload.requestType,
                    request: action.payload.request,
                },
                isLoading: false,
            }
        case SELECT_REQUEST:
            console.log('SELECT_REQUEST', action.payload)
            return {
                ...state,
                acceptance: action.payload,
                isLoading: false,
            }
        case SET_KEYWORD:
            console.log('SET_KEYWORD', action.payload)
            return {
                ...state,
                search: {
                    keyword: action.payload
                },
                isLoading: false,
            }
        case VIEW_DETAILS:
            console.log('VIEW_DETAILS', action.payload)
            return {
                ...state,
                details: action.payload,
                isLoading: false,
            }
        case ACCEPTED_REQUEST:
            console.log('ACCEPTED_REQUEST', action.payload)
            return {
                ...state,
                message: action.payload,
            }
        case CLEAR_MESSAGE:
            console.log('CLEAR_MESSAGE')
            return {
                ...state,
                message: '',
            }
        case CLEAR_DETAILS:
            console.log('CLEAR_DETAILS')
            return {
                ...state,
                details: {},
                isLoading: false,
            }
        case CLEAR_SEARCH:
            console.log('CLEAR_SEARCH')
            return {
                ...state,
                search: {
                    keyword: '',
                },
                isLoading: false,
            }
        case LOADING_ACCEPTANCE:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state;
    }
}