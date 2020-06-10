import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Header, Left, Body, Right, Title, Subtitle, Button, Content, Card, CardItem, Text, Grid, Col, View, Footer, FooterTab, Badge, Spinner, Toast } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { RootState } from '../store/modules/combinedReducers';
import { useSelector, useDispatch } from 'react-redux';
import { REQUEST_ITEM_TYPE } from '../utils/Constants';

import { clearDetails } from '../store/modules/dashboard/action';
import * as ACCEPTANCE from '../store/modules/dashboard/action'

const RequestDetails = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { transmittalNo, currentTab } = route.params;
    const acceptance = useSelector((state: RootState) => state.acceptance)
    const [allowedBtnAccept, setAllowedBtnAccept] = useState(true)
    const [disabledBtnAccept, setDisabledBtnAccept] = useState(false)
    const [notAllowedBtnBack, setNotAllowedBtnBack] = useState(false)

    const closeRequestDetailsHandler = () => {
        if (!notAllowedBtnBack) {
            setNotAllowedBtnBack(state => !state)
            dispatch(clearDetails())
            navigation.goBack()
        }
    }

    const acceptButtonSelectedHandler = (id: any) => {
        setDisabledBtnAccept(state => !state)
        let request_selected = {
            requests: [id]
        }
        dispatch(ACCEPTANCE.acceptRequest(request_selected))
    }

    const showToastHandler = (text: any) => {
        console.log(text)
        dispatch(ACCEPTANCE.clearMessage())
        Toast.show({
            text: text,
            buttonText: "Okay",
            duration: 3000
        })
        setAllowedBtnAccept(state => !state)
    }

    useEffect(() => {
        if (acceptance.message.length > 0) showToastHandler(acceptance.message)
    }, [acceptance.message])

    return (
        <Container>
            <Header style={{ backgroundColor: '#FFFFFF', height: 80 }}>
                <Left style={{ paddingLeft: 5 }}>
                    <Button transparent disabled={notAllowedBtnBack} onPress={event => closeRequestDetailsHandler()}>
                        <Ionicons name='md-arrow-back' size={24} />
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: '#2F3542' }}>Transmittal No.</Title>
                    <Subtitle style={{ color: '#A5B0BE' }}>{transmittalNo}</Subtitle>
                </Body>
                <Right />
            </Header>
            <Content padder>
                {acceptance.isLoading && acceptance.details ? <Spinner /> : acceptance.details ? <>
                    {acceptance.details.is_urgent ? acceptance.details.is_urgent === 1 ? <Badge style={{ width: 81, backgroundColor: '#FA5656', height: 30, justifyContent: 'center', borderRadius: 4 }}>
                        <Text>Urgent</Text>
                    </Badge> : null : null}
                    <Card style={{ marginTop: 10 }}>
                        <CardItem header bordered>
                            <Text style={{ color: '#2F3542', fontWeight: 'bold' }}>Company Details</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Grid>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Name
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.requestor_name ? acceptance.details.company.name : null}
                                        </Text>
                                    </Col>
                                </Grid>
                                <Grid style={{ marginTop: 10 }}>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Contact Person
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.company ? acceptance.details.company.contact_person ? acceptance.details.company.contact_person : null : null}
                                        </Text>
                                    </Col>
                                </Grid>
                                <Grid style={{ marginTop: 10 }}>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Contact Number
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.company ? acceptance.details.company.contact_number ? acceptance.details.company.contact_number : null : null}
                                        </Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ marginTop: 20 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: 'bold', color: '#2F3542' }}>Address</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Grid>
                                    <Col>
                                        <Text>
                                            {acceptance.details.address ? acceptance.details.address.unit ? `${acceptance.details.address.unit} ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.floor_no ? `${acceptance.details.address.floor_no}/F ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.building_name ? `${acceptance.details.address.building_name}, ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.street ? `${acceptance.details.address.street}, ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.barangay ? `${acceptance.details.address.barangay}, ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.city ? `${acceptance.details.address.city}, ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.province ? `${acceptance.details.address.province} ` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.country ? `${acceptance.details.address.country}` : null : null}
                                            {acceptance.details.address ? acceptance.details.address.zip_code && (acceptance.details.address.zip_code > 0) ? `, ${acceptance.details.address.zip_code}` : null : null}
                                        </Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={{ marginTop: 20 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: 'bold', color: '#2F3542' }}>Item Details</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                {acceptance.details.item ? acceptance.details.item.items.length > 0 ? acceptance.details.item.items.map((request, index) => (
                                    <>
                                        {index > 0 ? <View key={10 + index} style={styles.viewStyleForLine}></View> : null}
                                        <Grid style={{ marginTop: 10 }} key={20 + index}>
                                            <Col>
                                                <Text style={{ color: '#A5B0BE' }}>
                                                    Item for Pickup
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={{ textAlign: 'right' }}>
                                                    {REQUEST_ITEM_TYPE[request.type].text}
                                                    {/* {REQUEST_ITEM_TYPE[request.type].text} */}
                                                </Text>
                                            </Col>
                                        </Grid>
                                        {request.type === 0 ? <Grid key={30 + index} style={{ marginTop: 10 }}>
                                            <Col>
                                                <Text style={{ color: '#A5B0BE' }}>
                                                    Other
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={{ textAlign: 'right' }}>
                                                    {request.other}
                                                    {/* {REQUEST_ITEM_TYPE[request.type].text} */}
                                                </Text>
                                            </Col>
                                        </Grid> : null}
                                        <Grid style={{ marginTop: 10 }} key={40 + index}>
                                            <Col>
                                                <Text style={{ color: '#A5B0BE' }}>
                                                    No. of Item/s
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={{ textAlign: 'right' }}>
                                                    {request.count}
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </>
                                )) : null : null}
                                <View style={styles.viewStyleForLine}></View>
                                <Grid style={{ marginTop: 10 }}>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Expected {acceptance.details.request_type_label}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.item ? acceptance.details.item.expected_date : null}
                                        </Text>
                                    </Col>
                                </Grid>
                                <Grid style={{ marginTop: 10 }}>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Urgent Request
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.is_urgent_label}
                                        </Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <View>
                                <Text style={{ color: '#A5B0BE' }}>Reason for Urgency</Text>
                                <Text style={{ marginTop: 5 }}>{acceptance.details.reason_urgency}</Text>
                            </View>
                        </CardItem>
                    </Card>
                    <Card style={{ marginTop: 20 }}>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: 'bold', color: '#2F3542' }}>Remarks</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Grid>
                                    <Col>
                                        <Text>
                                            {acceptance.details.remarks}
                                        </Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text style={{ fontWeight: 'bold', color: '#2F3542' }}>Request Details</Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Grid>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Requestor
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.company ? acceptance.details.requestor_name : null}
                                        </Text>
                                    </Col>
                                </Grid>
                                <Grid style={{ marginTop: 10 }}>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Requestor Dept.
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.company ? acceptance.details.requestor_department_name : null}
                                        </Text>
                                    </Col>
                                </Grid>
                                <Grid style={{ marginTop: 10 }}>
                                    <Col>
                                        <Text style={{ color: '#A5B0BE' }}>
                                            Requested On
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ textAlign: 'right' }}>
                                            {acceptance.details.created_at}
                                        </Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                </> : null}
            </Content >
            {allowedBtnAccept ? currentTab === 'acceptance' ? <Footer style={{ height: 73 }}>
                <FooterTab style={{ backgroundColor: '#FFFFFF', paddingLeft: 10, paddingRight: 10, paddingTop: 9, paddingBottom: 9 }}>
                    <Button style={{ backgroundColor: '#41B67F' }} disabled={disabledBtnAccept} onPress={event => acceptButtonSelectedHandler(acceptance.details._id)}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Accept</Text>
                    </Button>
                </FooterTab>
            </Footer> : <Footer style={{ height: 73 }}>
                    <FooterTab style={{ backgroundColor: '#FFFFFF', paddingLeft: 10, paddingRight: 10, paddingTop: 9, paddingBottom: 9 }}>
                        <Button style={{ backgroundColor: '#41B67F' }} disabled={disabledBtnAccept} onPress={event => acceptButtonSelectedHandler(acceptance.details._id)}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Change Status</Text>
                        </Button>
                    </FooterTab>
                </Footer> : null}
        </Container >
    )
}

const styles = StyleSheet.create({
    viewStyleForLine: {
        marginTop: 10,
        borderBottomColor: "#E0E6ED",
        borderBottomWidth: 1,
        alignSelf: 'stretch',
        width: "100%"
    }
})

export default RequestDetails
