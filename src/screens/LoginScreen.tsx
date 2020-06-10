import React, { useState, SetStateAction, ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import * as ERROR from '../store/modules/error/action'
import * as AUTH from '../store/modules/auth/action'
import { Feather } from '@expo/vector-icons';
import { RootState } from '../store/modules/combinedReducers'

const loginBackground = require("../../assets/images/bg.png")
const logoImage = require("../../assets/images/logo.png")

const LoginScreen = () => {
    const dispatch = useDispatch()
    const error = useSelector((state: RootState) => state.error)
    const auth = useSelector((state: RootState) => state.auth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notAllowedLogin, setnNotAlowedLogin] = useState(true)
    const [hidePassword, setHidePassword] = useState(true)
    const [errorMessage, setErrorMessage] = useState({
        status: null,
        message: null,
    })

    const usernameHandler = (value: any) => {
        setUsername(value)
    }

    const passwordHandler = (value: any) => {
        setPassword(value)
    }

    const handleLogin = () => {
        const requestLoginBody = {
            username: username,
            password: password,
        }

        dispatch(ERROR.clearErrors())
        dispatch(AUTH.loginUser(requestLoginBody))
        // console.log(requestLoginBody)
    }

    useEffect(() => {

        function allowedButtonLogin() {
            if ((username.length > 0) && (password.length > 0)) setnNotAlowedLogin(false)
            else setnNotAlowedLogin(true)
        }

        allowedButtonLogin()
    }, [username, password])

    return (
        <View style={styles.container}>
            <ImageBackground
                style={[styles.background]}
                source={loginBackground}
            >
                <View style={styles.content}>
                    <Image
                        source={logoImage}
                        style={{ alignSelf: "center", marginBottom: 54 }}
                    />
                    {auth.isLoading ? <View style={[styles.infoMessage, styles.alertMessage]}>
                        <Text style={styles.alertText}>Loading...</Text>
                    </View> : error.status > 0 ?
                            error.msg.length > 0 ? error.msg.map((msg: any, index: any) => (
                                <View key={index} style={[styles.errorMessage, styles.alertMessage]}>
                                    <Text style={styles.alertText}>{msg.errMessage}</Text>
                                </View>
                            )) : null : null}
                    <View>
                        <Text style={[styles.inputTitle, styles.inputTitleBottomMargin]}>Username</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={(event) => usernameHandler(event)}
                            value={username}
                        ></TextInput>
                    </View>
                    <View>
                        <View style={[styles.passwordText, styles.inputTitleBottomMargin]}>
                            <View>
                                <Text style={styles.inputTitle}>Password</Text>
                            </View>
                            <View>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </View>
                        </View>
                        <View style={[styles.passwordInputText, styles.input]}>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.passwordField}
                                onChangeText={(event) => passwordHandler(event)}
                                value={password}
                                secureTextEntry={hidePassword}
                            ></TextInput>
                            {hidePassword ? <Feather name="eye-off" size={24} color="#2F3542" onPress={event => setHidePassword(false)} /> :
                                <AntDesign name="eyeo" size={24} color="#2F3542" onPress={event => setHidePassword(true)} />}
                        </View>
                    </View>
                    <TouchableOpacity style={notAllowedLogin ? styles.disabledButton : styles.button} disabled={notAllowedLogin} onPress={event => handleLogin()}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    content: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    passwordText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontSize: 14,
        marginTop: 19,
    },
    inputTitle: {
        color: '#8A8F9E',
    },
    inputTitleBottomMargin: {
        marginBottom: 2,
    },
    forgotText: {
        color: '#41B67F',
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D",
        borderWidth: 1,
        borderColor: '#A5B0BE',
        borderStyle: 'solid',
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    passwordInputText: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    passwordField: {
        flex: 1,
    },
    button: {
        backgroundColor: "#41B67F",
        borderRadius: 4,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32
    },
    disabledButton: {
        backgroundColor: '#9dd6bd',
        borderRadius: 4,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 32
    },
    alertMessage: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        height: 40,
    },
    errorMessage: {
        borderLeftColor: '#FA5656',
        borderLeftWidth: 4,
        borderStyle: 'solid',
        backgroundColor: 'rgba(250, 86, 86, 0.25)',
        marginBottom: 10
    },
    infoMessage: {
        borderLeftColor: '#2196f3',
        borderLeftWidth: 4,
        borderStyle: 'solid',
        backgroundColor: '#afdbff',
        marginBottom: 10
    },
    alertText: {
        color: "#2F3542",
        fontSize: 14,
        textAlign: "center"
    },
});

export default LoginScreen
