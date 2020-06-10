/* eslint-disable no-undef */
import { apiBaseURL } from './config'
export const REQUEST_TYPE_DELIVERY = 1
export const REQUEST_TYPE_PICKUP = 2
export const REQUEST_TYPE_TEXT = [
    { code: 0, text: 'Filter Type' },
    { code: 1, text: 'Delivery' },
    { code: 2, text: 'Pickup' },
]

export const IS_URGENT_YES = 1
export const IS_URGENT_NO = 2
export const IS_URGENT = [
    { code: 0, text: 'None' },
    { code: 1, text: 'Yes' },
    { code: 2, text: 'No' },
]

export const TRACKING_STATUS_PREVIEW = 0
export const TRACKING_STATUS_REQUEST_SENT = 1
export const TRACKING_STATUS_FOR_DELIVERY = 2
export const TRACKING_STATUS_FOR_PICKUP = 3
export const TRACKING_STATUS_DELIVERY_IN_TRANSIT = 4
export const TRACKING_STATUS_PICKUP_IN_TRANSIT = 5
export const TRACKING_STATUS_DELIVERED = 6
export const TRACKING_STATUS_PICKEDUP = 7
export const TRACKING_STATUS_CANNOT_PICKUP = 8
export const TRACKING_STATUS_NOT_PICKEDUP = 9
export const TRACKING_STATUS_NON_DELIVERABLE = 10
export const TRACKING_STATUS_NOT_DELIVERED = 11
export const TRACKING_STATUS_CANCELLED = 12
export const TRACKING_STATUS_CANCELLED_REQUESTOR = 13
export const TRACKING_STATUS = [
    { code: 0, text: 'Filter Status' },
    { code: 1, text: 'Request Sent' },
    { code: 2, text: 'For Delivery' },
    { code: 3, text: 'For Pick Up' },
    { code: 4, text: 'Delivery in Transit' },
    { code: 5, text: 'Pick Up in Transit' },
    { code: 6, text: 'Delivered' },
    { code: 7, text: 'Picked Up' },
    { code: 8, text: 'Cannot Pick Up' },
    { code: 9, text: 'Not Picked Up' },
    { code: 10, text: 'Non Deliverable' },
    { code: 11, text: 'Not Delivered' },
    { code: 12, text: 'Cancelled' },
    { code: 13, text: 'Cancelled Requestor' },
]
export const ACTIVE_STATUS = [
    { code: 1, text: 'Active' },
    { code: 2, text: 'Inactive' },
]

export const PARTNER_AVIDA = 1
export const PARTNER_INTELLICARE = 2
export const PARTNER = [
    { code: 0, text: 'None' },
    { code: 1, text: 'Avega' },
    { code: 2, text: 'Intellicare' },
]

export const REQUEST_STATUS_PENDING = 0
export const REQUEST_STATUS_UNASSIGNED = 1
export const REQUEST_STATUS_ASSIGNED = 2
export const REQUEST_STATUS_PENDING_ACCEPTANCE = 3
export const REQUEST_STATUS_ACCEPTED_BY_MESSAGNER = 4

export const REQUEST_ITEM_TYPE_OTHER = 0
export const REQUEST_ITEM_TYPE_CHECK = 1
export const REQUEST_ITEM_TYPE_SOA = 2
export const REQUEST_ITEM_TYPE_CONTRACT_CARDS = 3
// export const  = 4;
export const REQUEST_ITEM_TYPE = [
    { code: 0, text: 'Other' },
    { code: 1, text: 'Check' },
    { code: 2, text: 'SOA' },
    { code: 3, text: 'ID Cards' },
    // { code: 4, text: "Other" },
]

export const HIMS_DEPARTMENT_NODEPT = 1
export const HIMS_DEPARTMENT_CASHIERING = 2
export const HIMS_DEPARTMENT = [
    { code: 0, text: 'None' },
    { code: 1, text: 'No Department Yet' },
    { code: 2, text: 'Cashiering' },
]

// For URL API
// const API_URL = "http://localhost:5000";
const API_URL = apiBaseURL
// console.log(API_URL)

export const LOGIN_USER = API_URL + '/dds/messenger/login'
export const FOR_ACCEPTANCE = API_URL + '/dds/messenger/requests/for-acceptance'
export const IN_TRANSIT = API_URL + '/dds/messenger/requests/in-transit'
export const CURRENT_TABS = {
    acceptance: API_URL + '/dds/messenger/requests/for-acceptance',
    intransit: API_URL + '/dds/messenger/requests/in-transit'
}
export const VIEW_DETAILS = API_URL + '/dds/messenger/requests'
export const GET_TAB_COUNT = API_URL + '/dds/messenger/requests/tabs-stats'
export const ACCEPT_REQUEST = API_URL + '/dds/messenger/requests/for-acceptance/accept'
export const GET_USER = API_URL + '/dds/users/'
export const REGISTER_USER = API_URL + ''
export const ALL_USER = API_URL + ''