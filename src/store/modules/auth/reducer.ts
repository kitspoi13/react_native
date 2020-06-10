import {
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    RESTORE_TOKEN,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from './types';
import { AsyncStorage } from 'react-native';

interface AuthState {
    token: String;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {};
}

const initialState: AuthState = {
    token: '',
    isAuthenticated: false,
    isLoading: false,
    user: {},
};

export default function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('LOGIN_SUCCESS', action.payload)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.data
            }
        case RESTORE_TOKEN:
            console.log('RESTORE_TOKEN', action.payload)
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: action.payload.auth,
                isLoading: false,
            }
        case LOGIN_FAIL: {
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: {},
            }
        }
        case LOGOUT_SUCCESS:
        case AUTH_ERROR: {
            console.log('LOGOUT_SUCCESS')
            AsyncStorage.clear();
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: {},
            }
        }
        case USER_LOADING: {
            return {
                ...state,
                isLoading: true,
            }
        }
        default:
            return state;
    }
}