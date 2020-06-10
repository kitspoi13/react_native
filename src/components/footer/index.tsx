import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Footer, FooterTab, Button } from 'native-base'

const FooterComponent = ({ notAllowAccept, acceptButtonSelectedHandler, currentTab }) => {
    return (

        currentTab === "acceptance" ?
            <Footer style={{ height: 73 }}>
                <FooterTab style={{ backgroundColor: '#FFFFFF', paddingLeft: 10, paddingRight: 10, paddingTop: 9, paddingBottom: 9 }}>
                    <Button disabled={notAllowAccept} style={notAllowAccept ? styles.disabledButtonAccept : styles.buttonAccept} onPress={event => acceptButtonSelectedHandler()}>
                        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Accept</Text>
                    </Button>
                </FooterTab>
            </Footer> : null
    )
}

FooterComponent.propTypes = {
    notAllowAccept: PropTypes.any,
    acceptButtonSelectedHandler: PropTypes.any,
    currentTab: PropTypes.any,
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

export default FooterComponent
