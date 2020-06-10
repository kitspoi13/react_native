import axios from 'axios'
import {
    LIST_ACCEPTANCE,
    LOADING_ACCEPTANCE,
    SELECT_REQUEST,
    VIEW_DETAILS,
    CLEAR_DETAILS,
    SET_KEYWORD,
    CLEAR_SEARCH,
    ACCEPTED_REQUEST,
    CLEAR_MESSAGE,
} from './types';
import { returnErrors } from '../error/action'
import * as API from '../../../utils/Constants'
import { AsyncStorage } from 'react-native'

export const listAcceptance = (content) => (dispatch, getState) => {
    dispatch({ type: LOADING_ACCEPTANCE })

    const search = getState().acceptance.search
    let paramsQuery = ""
    if (search.keyword.length > 0) {
        const searchAcceptance = JSON.parse(JSON.stringify(search))
        paramsQuery = `?${new URLSearchParams(searchAcceptance).toString()}`
    }
    // Headers
    const config = tokenConfig(getState)

    console.log(API.CURRENT_TABS[content], config)

    axios
        .get(API.CURRENT_TABS[content] + paramsQuery, config)
        .then((res) => {
            let data = {}, request: any[] = []

            if (content === 'acceptance') {
                res.data.data.map((acceptance, index) => {
                    request = [...request, {
                        key: index,
                        isChecked: false,
                        id: acceptance.id,
                        expected_date: acceptance.expected_date,
                        company: acceptance.company,
                        transmittal_no: acceptance.transmittal_no,
                        is_urgent: acceptance.is_urgent
                    }]
                })

            } else {
                request = res.data.data
            }

            data = {
                requestType: content,
                request,
            }
            console.log(res.data, data)
            dispatch({
                type: LIST_ACCEPTANCE,
                payload: data,
            })
        })
        .catch((err) => {
            if (!!err.response) {
                let errors = []
                if (!!err.response.data.errors) {
                    errors = err.response.data.errors
                } else {
                    errors = [{
                        "errMessage": err.response.data.message,
                        "path": "invalid",
                    }]
                }
                dispatch(
                    returnErrors(errors, err.response.status, err.response.data.message)
                )
            }
            console.log(err)
        })
}

export const viewDetails = (id: any) => (dispatch, getState) => {
    dispatch({ type: LOADING_ACCEPTANCE })

    // Headers
    const config = tokenConfig(getState)

    console.log(API.VIEW_DETAILS + "/" + id + "/view", config)
    axios
        .get(API.VIEW_DETAILS + "/" + id + "/view", config)
        .then((res) => {
            dispatch({
                type: VIEW_DETAILS,
                payload: res.data.data,
            })
        })
        .catch((err) => {
            if (!!err.response) {
                let errors = []
                if (!!err.response.data.errors) {
                    errors = err.response.data.errors
                } else {
                    errors = [{
                        "errMessage": err.response.data.message,
                        "path": "invalid",
                    }]
                }
                dispatch(
                    returnErrors(errors, err.response.status, err.response.data.message)
                )
            }
            console.log(err)
        })
}

export const searchKeyword = (keyword: any) => {
    return {
        type: SET_KEYWORD,
        payload: keyword
    }
}

export const acceptRequest = (requests: any) => (dispatch, getState) => {
    // Headers
    const config = tokenConfig(getState)
    const body = JSON.stringify(requests)
    console.log('ACCEPTING', body)
    axios
        .put(API.ACCEPT_REQUEST, body, config)
        .then((res) => {
            console.log('ACCEPTED', res.data)
            dispatch({
                type: ACCEPTED_REQUEST,
                payload: 'Request Accepted'
            })

            dispatch(listAcceptance('acceptance'))
        })
        .catch((err) => {
            if (!!err.response) {
                let errors = []
                if (!!err.response.data.errors) {
                    errors = err.response.data.errors
                } else {
                    errors = [{
                        "errMessage": err.response.data.message,
                        "path": "invalid",
                    }]
                }
                dispatch(
                    returnErrors(errors, err.response.status, err.response.data.message)
                )
            }
            console.log(err)
        })
}

export const clearSearch = () => {
    return {
        type: CLEAR_SEARCH,
    }
}

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE,
    }
}

export const clearDetails = () => {
    return {
        type: CLEAR_DETAILS
    }
}

export const selectTrigger = (select: { requestType, request, allChecked }) => (dispatch) => {
    dispatch({
        type: SELECT_REQUEST,
        payload: select,
    })
}

// Setup config/Headers and token
export const tokenConfig = (getState: any) => {
    // Get token from local storage
    const token = getState().auth.token.replace(/[^a-zA-Z0-9.]/g, "");
    console.log('Token Config', token)

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

    console.log('Config', config)
    return config
}