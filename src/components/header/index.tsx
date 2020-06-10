import React, { useState } from 'react'
import { Grid, Col, Item, Button, Input, Header, Title, Body, Right, Left, Thumbnail, Icon } from 'native-base'
import { TouchableHighlight, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const intellicareImg = require('../../images/intellicare.png');

const HeaderComponent = ({ searchBar, searchText, setSearchBar, setSearchText, searchTextHandler, setRefreshList, searchCLoseHandler, closeSearchHandler, logout }) => {
    return (
        <>
            {searchBar ? <TouchableHighlight style={styles.overlay} onPress={() => searchCLoseHandler()}>
                <Grid>
                    <Col>
                        <Item style={{ backgroundColor: '#FFFFFF', paddingLeft: 15, paddingRight: 15, paddingTop: 2, paddingBottom: 2 }}>
                            <Button transparent onPress={() => searchCLoseHandler()}>
                                <MaterialIcons name="arrow-back" size={24} color="black" />
                            </Button>
                            <Input
                                placeholder="Search"
                                value={searchText}
                                onChangeText={(event) => searchTextHandler(event)}
                                onSubmitEditing={() => {
                                    searchCLoseHandler() // called only when multiline is false
                                }}
                            />
                            <Button transparent onPress={() => setSearchText('')}>
                                <MaterialIcons color="black" size={24} name="clear" />
                            </Button>
                        </Item>
                    </Col>
                </Grid>
            </TouchableHighlight> : null}
            {!!searchText ?
                <Header style={{ backgroundColor: '#FFFFFF', height: 80 }}>
                    <Body style={{ paddingLeft: 15 }}>
                        <TouchableHighlight onPress={() => setSearchBar(true)}>
                            <Title style={{ color: '#2F3542' }}>{searchText}</Title>
                        </TouchableHighlight>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => closeSearchHandler()}>
                            <MaterialIcons color="black" size={24} name="clear" />
                        </Button>
                    </Right>
                </Header> :
                <Header style={{ backgroundColor: '#FFFFFF', height: 80 }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableHighlight onPress={() => logout()}>
                            <Thumbnail source={{ uri: 'Image URL' }} style={{ backgroundColor: '#000000', width: 40, height: 40 }} />
                        </TouchableHighlight>
                    </Left>
                    <Body style={{ flex: 1, justifyContent: 'center' }}>
                        <Image source={intellicareImg} style={{ height: 50, resizeMode: "contain" }} />
                    </Body>
                    <Right style={{ flex: 1 }}>
                        <Button transparent onPress={() => setSearchBar(true)}>
                            <Icon style={{ color: '#000000' }} name='search' />
                        </Button>
                        <Button transparent onPress={() => console.log('Notification')}>
                            <MaterialIcons name="notifications-none" size={24} color="black" />
                        </Button>
                    </Right>
                </Header>
            }
        </>
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

HeaderComponent.propTypes = {
    searchBar: PropTypes.any,
    searchText: PropTypes.any,
    setSearchBar: PropTypes.any,
    setSearchText: PropTypes.any,
    searchTextHandler: PropTypes.any,
    setRefreshList: PropTypes.any,
    searchCLoseHandler: PropTypes.any,
    closeSearchHandler: PropTypes.any,
    logout: PropTypes.any,
}

export default HeaderComponent
