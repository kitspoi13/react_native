import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Toast } from 'native-base'
import { RootState } from '../../store/modules/combinedReducers'

import * as AUTH from '../../store/modules/auth/action'
import * as ACCEPTANCE from '../../store/modules/dashboard/action'
import * as TABSCOUNT from '../../store/modules/tabscount/action'

import BodyComponent from '../../components/body'
import FooterComponent from '../../components/footer'
import HeaderComponent from '../../components/header'

const AcceptanceScreen = ({ route, navigation, setTabHandler, currentTab, setRefreshList, refreshList }) => {
    let checkedCount = 0
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)
    const acceptance = useSelector((state: RootState) => state.acceptance)
    const tabsCount = useSelector((state: RootState) => state.tabsCount)
    const [searchBar, setSearchBar] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [notAllowAccept, setNotAllowAccept] = useState(true)
    const [refreshtabs, setRefreshtabs] = useState(true)

    const searchTextHandler = (value: any) => {
        setSearchText(value)
    }

    const searchCLoseHandler = () => {
        console.log(searchText)
        dispatch(ACCEPTANCE.searchKeyword(searchText))
        setRefreshList(state => !state)
        setSearchBar(state => !state)
    }

    const selectChangeHandler = (requestName: any, checked: boolean) => {
        console.log(requestName, checked)
        let prevRequestList = acceptance.acceptance
        if (checked) { checked = false } else { checked = true; }

        let { requestType, request, allChecked } = prevRequestList;
        if (requestName === "checkAll") {
            allChecked = checked;
            request = request.map(request => ({ ...request, isChecked: checked }));
        } else {
            request = request.map(request =>
                request.id === requestName ? { ...request, isChecked: checked } : request
            );

            allChecked = request.every(request => request.isChecked);
        }

        dispatch(ACCEPTANCE.selectTrigger({ requestType, request, allChecked }));
    }

    const viewDetailsHandler = (transmittal_no: any, id: any, currentTab: any) => {
        dispatch(ACCEPTANCE.viewDetails(id))
        navigation.push('RequestDetails', {
            transmittalNo: transmittal_no,
            currentTab: currentTab,
        })
    }

    const showToastHandler = (text: any) => {
        console.log(text)
        setRefreshtabs(state => !state)
        dispatch(ACCEPTANCE.clearMessage())
        Toast.show({
            text: text,
            buttonText: "Okay",
            duration: 3000
        })
    }

    const acceptButtonSelectedHandler = () => {
        let request_id = []
        let request_selected = {
            requests: []
        }
        acceptance.acceptance.request.map(request => {
            if (request.isChecked) {
                request_id = [...request_id, request.id]
            }
        }
        );
        request_selected = { requests: request_id }

        dispatch(ACCEPTANCE.acceptRequest(request_selected))
    }

    const closeSearchHandler = () => {
        setSearchText('')
        dispatch(ACCEPTANCE.clearSearch())
        setRefreshList(state => !state)
    }

    const logout = () => {
        dispatch(AUTH.logoutUser())
    }

    useEffect(() => {
        function selectHandler() {
            if (acceptance.acceptance.request.length > 0) {
                const haveChecked = acceptance.acceptance.request.some(requestChecked => requestChecked.isChecked === true)
                setNotAllowAccept(!haveChecked)
                // console.log('Request List', requestList)
            }
        }

        function getAcceptance() {
            setRefreshList(state => !state)
            dispatch(ACCEPTANCE.listAcceptance(currentTab))
        }

        function tabsCountRefresh() {
            setRefreshtabs(state => !state)
            dispatch(TABSCOUNT.getTabCount())
        }

        selectHandler()
        if (refreshList) getAcceptance()
        if (refreshtabs) tabsCountRefresh()
        if (acceptance.message.length > 0) showToastHandler(acceptance.message)
    }, [acceptance.acceptance, refreshtabs, refreshList, acceptance.message])
    return (
        <>
            <HeaderComponent
                searchBar={searchBar}
                searchText={searchText}
                setSearchBar={setSearchBar}
                setSearchText={setSearchText}
                searchTextHandler={searchTextHandler}
                setRefreshList={setRefreshList}
                searchCLoseHandler={searchCLoseHandler}
                closeSearchHandler={closeSearchHandler}
                logout={logout}
            />
            <BodyComponent
                currentTab={currentTab}
                tabsCount={tabsCount}
                acceptance={acceptance}
                setTabHandler={setTabHandler}
                selectChangeHandler={selectChangeHandler}
                viewDetailsHandler={viewDetailsHandler}
            />
            <FooterComponent
                currentTab={currentTab}
                notAllowAccept={notAllowAccept}
                acceptButtonSelectedHandler={acceptButtonSelectedHandler}
            />
        </>
    )
}

export default AcceptanceScreen