import axios from 'axios'
import {
    USER_LOADING,
    LOGIN_SUCCESS,
    RESTORE_TOKEN,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from './types';
import { returnErrors, clearErrors } from '../error/action'
import * as API from '../../../utils/Constants'
import { AsyncStorage } from 'react-native'

export const loginUser = ({ username, password }) => (dispatch, getState) => {
    dispatch({ type: USER_LOADING })

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }
    // const httpsAgent = new https.Agent({ ca: fs.readFileSync('../../../ssl/fullchain2.pem') })
    const body = JSON.stringify({ username, password })

    console.log(API.LOGIN_USER, body)

    // let token = "token"
    // console.log(token)
    // _storeData(token)
    // dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: token,
    // })
    axios
        .post(API.LOGIN_USER, body, config)
        .then((res) => {
            console.log(res.data)
            const payload = {
                token: res.data.data.token,
                data: res.data.data,
            }

            _storeData(res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: payload,
            })
            // dispatch(loadUser())
        })
        .catch((err) => {
            console.log(err.response)
            if (!!err.response) {
                let errors = []
                if (!!err.response.data.errors) {
                    errors = err.response.data.errors
                } else {
                    let errMessage = "Somethings wrong with your connection", path = "connection"
                    if (!!err.response.data) {
                        if (!!err.response.data.message) {
                            errMessage = err.response.data.message
                            path = "invalid"
                        }
                    }
                    errors = [{ "errMessage": errMessage, "path": path, }]
                }
                dispatch(
                    returnErrors(errors, err.response.status, err.response.data.message)
                )
                dispatch({
                    type: LOGIN_FAIL,
                })
            }
        })
}

export const logoutUser = () => (dispatch) => {
    dispatch(clearErrors())
    dispatch({
        type: LOGOUT_SUCCESS,
    })
}

export const restoreToken = () => dispatch => {
    AsyncStorage.getItem('userToken').then((value) => {
        let data = { token: value, auth: false }
        if (value) data.auth = true
        dispatch({
            type: RESTORE_TOKEN,
            payload: data,
        })
    }).catch((error) => {
        console.log(error)
        const errors = [{
            "errMessage": "Cannot Access User Data",
            "path": "invalidtoken",
        }]
        dispatch(
            returnErrors(errors, 500, 'User Token')
        )
        dispatch({
            type: LOGIN_FAIL,
        })
    })
}

const _storeData = async (data: { data: { token: any; }; }) => {
    try {
        const user = data.data.token

        await AsyncStorage.setItem('userToken', JSON.stringify(user));
        console.log('Saving user data', user);
        // props.navigation.replace('PageNavigation');
    } catch (error) {
        // alert(`Data saving error, ${error}`);
        console.log(error);
    }
}

// const _retrieveData = async () => {
//     try {
//         const userData = await AsyncStorage.getItem('userToken');
//         console.log('RETRIEVING user data', userData);

//         if (userData) return {
//             token: userData,
//             auth: true
//         }

//         return {
//             token: '',
//             auth: false
//         }
//     } catch (error) {
//         console.log(error);
//         return {
//             token: '',
//             auth: false
//         }
//     }
// }

// Setup config/Headers and token
export const tokenConfig = (getState: any) => {
    // Get token from local storage
    const token = ''

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    }

    // If token, add to headers
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
}