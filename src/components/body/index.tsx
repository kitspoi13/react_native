import React from 'react'
import { StyleSheet } from 'react-native'
import { Content, Grid, Col, Button, CheckBox, View, Spinner, Text } from 'native-base'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'

const BodyComponent = ({ tabsCount, acceptance, currentTab, setTabHandler, selectChangeHandler, viewDetailsHandler, viewBundledHandler }) => {
    return (
        <Content padder style={styles.navigationBorder}>
            <Grid style={styles.navigationButton}>
                <Col style={{ backgroundColor: currentTab === 'acceptance' ? '#E0E6ED' : '#FFFFFF', borderTopLeftRadius: currentTab === 'acceptance' ? 5 : 10, borderBottomLeftRadius: currentTab === 'acceptance' ? 5 : 10 }}>
                    <Button full transparent onPress={() => setTabHandler('acceptance')}>
                        <Text style={{ color: currentTab === 'acceptance' ? '#1F236F' : '#2F3542', fontWeight: 'bold', textTransform: "capitalize" }}>For Acceptance ({tabsCount.for_acceptance})</Text>
                    </Button>
                </Col>
                <Col style={{ backgroundColor: currentTab === 'intransit' ? '#E0E6ED' : '#FFFFFF', borderTopRightRadius: currentTab === 'intransit' ? 5 : 10, borderBottomRightRadius: currentTab === 'intransit' ? 5 : 10 }}>
                    <Button full transparent onPress={() => setTabHandler('intransit')}>
                        <Text style={{ color: currentTab === 'intransit' ? '#1F236F' : '#2F3542', fontWeight: 'bold', textTransform: "capitalize" }}>In Transit ({tabsCount.in_transit})</Text>
                    </Button>
                </Col>
            </Grid>
            {currentTab === 'acceptance' ? <>
                <Grid style={styles.selectAll}>
                    <Col style={{ width: 40, justifyContent: 'center' }}>
                        <CheckBox color={acceptance.acceptance.allChecked ? "#41B67F" : "#2F3542"} checked={acceptance.acceptance.allChecked} onPress={event => selectChangeHandler("checkAll", acceptance.acceptance.allChecked)} />
                    </Col>
                    <Col style={{ justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Select All</Text>
                    </Col>
                </Grid>
                <View>
                    {acceptance.isLoading ?
                        <Spinner /> : !!acceptance.acceptance.request && (acceptance.acceptance.request.length > 0) ? acceptance.acceptance.request.map((request, index) => (
                            <Grid style={styles.cardStyle} key={index}>
                                <Grid style={request.isChecked ? styles.cardCheckedStyle : styles.cardUncheckedStyle}>
                                    {request.is_urgent ?
                                        <View style={{ position: 'absolute', height: 20, backgroundColor: '#FA5656', borderTopLeftRadius: 10, borderBottomRightRadius: 10, width: 62, alignItems: 'center' }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Urgent</Text>
                                        </View> : null}
                                    <Col style={{ width: '12%', justifyContent: 'center' }}>
                                        <CheckBox color={request.isChecked ? "#41B67F" : "#2F3542"} onPress={event => selectChangeHandler(request.id, request.isChecked)} checked={request.isChecked} />
                                    </Col>
                                    <Col style={{ width: '40%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12 }}>{request.expected_date}</Text>
                                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>{request.company}</Text>
                                    </Col>
                                    <Col style={{ width: '40%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12, textAlign: 'right' }}>Transmittal No.</Text>
                                        <Text style={{ fontSize: 16, textAlign: 'right' }}>{request.transmittal_no}</Text>
                                    </Col>
                                    <Col style={{ justifyContent: 'center', paddingLeft: 5 }}>
                                        <Button transparent onPress={() => viewDetailsHandler(request.transmittal_no, request.id, currentTab)}>
                                            <AntDesign name='right' style={{ color: '#2F3542' }} size={20} />
                                        </Button>
                                    </Col>
                                </Grid>
                            </Grid>
                        )) :
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginTop: '50%' }}>
                                    No results found
                                </Text>
                            </View>
                    }
                </View>
            </> : <View>
                    {acceptance.isLoading ?
                        <Spinner /> : !!acceptance.acceptance.request && (acceptance.acceptance.request.length > 0) ? acceptance.acceptance.request.map((request, index) => (
                            <Grid style={styles.cardStyle} key={index}>
                                {request.transmital_type === 'SINGLE_ITEM' ? <Grid style={styles.cardUncheckedStyle}>
                                    {request.transmital_preview.is_urgent ?
                                        <View style={{ position: 'absolute', height: 20, backgroundColor: '#FA5656', borderTopLeftRadius: 10, borderBottomRightRadius: 10, width: 62, alignItems: 'center' }}>
                                            <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Urgent</Text>
                                        </View> : null}
                                    <Col style={{ width: '50%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12 }}>{request.transmital_preview.expected_date}</Text>
                                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>{request.transmital_preview.company}</Text>
                                    </Col>
                                    <Col style={{ width: '40%', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 12, textAlign: 'right' }}>Transmittal No.</Text>
                                        <Text style={{ fontSize: 16, textAlign: 'right' }}>{request.transmital_preview.transmittal_no}</Text>
                                    </Col>
                                    <Col style={{ justifyContent: 'center' }}>
                                        <Button style={{ alignSelf: 'center' }} transparent onPress={() => viewDetailsHandler(request.transmital_preview.transmittal_no, request.transmital_preview.id, currentTab)}>
                                            <AntDesign name='right' style={{ color: '#2F3542' }} size={20} />
                                        </Button>
                                    </Col>
                                </Grid> :
                                    <>
                                        <View style={{ width: '100%', height: 10, position: "absolute", paddingLeft: 10, paddingRight: 10 }}>
                                            <View style={{ backgroundColor: '#E0E6ED', width: '100%', height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>

                                            </View>
                                        </View>
                                        <Grid style={styles.cardBundledStyle}>
                                            <Col style={{ width: '50%', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 12 }}>{request.transmital_preview ? request.transmital_preview.expected_date : null}</Text>
                                                <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 16, fontWeight: 'bold' }}>{request.transmital_preview ? request.transmital_preview.company : null}</Text>
                                            </Col>
                                            <Col style={{ width: '40%', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 12, textAlign: 'right' }}>Request</Text>
                                                <Text style={{ fontSize: 16, textAlign: 'right' }}>{request.transmital_count ? request.transmital_count : null}</Text>
                                            </Col>
                                            <Col style={{ justifyContent: 'center' }}>
                                                <Button style={{ alignSelf: 'center' }} transparent onPress={() => viewBundledHandler(request.transmital_preview.company, request.transmital_count, currentTab, index)}>
                                                    <AntDesign name='right' style={{ color: '#2F3542' }} size={20} />
                                                </Button>
                                            </Col>
                                        </Grid>
                                    </>}
                            </Grid>
                        )) :
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ marginTop: '50%' }}>
                                    No results found
                            </Text>
                            </View>
                    }
                </View>}
        </Content>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationBorder: {
        backgroundColor: '#F4F6F9',
    },
    navigationButton: {
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: '#E0E6ED',
    },
    buttonAccept: {
        backgroundColor: '#41B67F'
    },
    disabledButtonAccept: {
        backgroundColor: '#9dd6bd'
    },
    selectAll: {
        height: 36,
        width: 125,
        borderRadius: 10,
        paddingTop: 9,
        paddingRight: 10,
        paddingBottom: 9,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        elevation: 1,
        marginBottom: 8,
        paddingLeft: 10
    },
    cardStyle: {
        marginTop: 8
    },
    cardBundledStyle: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        marginTop: 5,
        borderRadius: 10,
        height: 82,
        paddingRight: 10,
        paddingTop: 16,
        paddingBottom: 16,
        elevation: 1
    },
    cardUncheckedStyle: {
        backgroundColor: '#FFFFFF',
        paddingLeft: 10,
        borderRadius: 10,
        height: 82,
        paddingRight: 10,
        paddingTop: 16,
        paddingBottom: 16,
        elevation: 1
    },
    cardCheckedStyle: {
        backgroundColor: '#D6EFE3',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#41B67F',
        paddingLeft: 10,
        borderRadius: 10,
        height: 82,
        paddingRight: 10,
        paddingTop: 16,
        paddingBottom: 16,
        elevation: 1
    },
    cardBox: {
        borderRadius: 10,
    },
    overlay: {
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        opacity: 0.9,
    },
});


BodyComponent.propTypes = {
    tabsCount: PropTypes.any,
    acceptance: PropTypes.any,
    setTabHandler: PropTypes.any,
    selectChangeHandler: PropTypes.any,
    viewDetailsHandler: PropTypes.any,
    viewBundledHandler: PropTypes.any,
}

export default BodyComponent
