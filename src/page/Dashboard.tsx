import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Toast } from 'native-base'
import { RootState } from '../store/modules/combinedReducers'

import AcceptanceScreen from '../screens/acceptance'

const Dashboard = ({ route, navigation }) => {
  const [currentTab, setCurrentTab] = useState('acceptance')
  const [refreshList, setRefreshList] = useState(true)

  const setTabHandler = (tab: any) => {
    setCurrentTab(tab)
    setRefreshList(true)
  }

  return (
    <Container>
      <AcceptanceScreen route={route} navigation={navigation} setTabHandler={setTabHandler} currentTab={currentTab} setRefreshList={setRefreshList} refreshList={refreshList} />
    </Container >
  )
}

export default Dashboard