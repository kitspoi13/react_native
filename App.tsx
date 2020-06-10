import React, { useState, SetStateAction, useEffect } from 'react';
import { StyleSheet, Image, Text, View, AsyncStorage } from 'react-native';
import { Root } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import { Provider, useDispatch, useSelector } from 'react-redux'
import * as ACTION from './src/store/modules/auth/action'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/'
import { RootState } from './src/store/modules/combinedReducers';

import LoginScreen from './src/screens/LoginScreen';
import Dashboard from './src/page/Dashboard';
import RequestDetails from './src/page/RequestDetails';

function cacheImages(images: any[]) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator();

const HomeStack = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = () => {
      dispatch(ACTION.restoreToken());
    };

    bootstrapAsync();
  }, []);
  return (
    <StackHome.Navigator initialRouteName="Login">
      {auth.token ?
        <>
          <StackHome.Screen name="Dashboard" component={Dashboard} options={navOptionHandler} />
          <StackHome.Screen name="RequestDetails" component={RequestDetails} options={navOptionHandler} />
        </> :
        <StackHome.Screen name="Login" component={LoginScreen} options={navOptionHandler} />}
    </StackHome.Navigator>
  )
}

const App = () => {
  const [isReady, setIsReady] = useState(false)

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([require('./assets/images/bg-login.png')]);
    const fontAssets = Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    await Promise.all([...imageAssets, fontAssets]);
  }

  const isReadyHandler = (toggle: SetStateAction<boolean>) => {
    setIsReady(toggle)
  }

  return (

    <Provider store={store}>
      {!isReady ? (<AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => isReadyHandler(true)}
        onError={console.warn}
      />) : (<Root>
        <NavigationContainer>
          <HomeStack />
        </NavigationContainer>
      </Root>)}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
