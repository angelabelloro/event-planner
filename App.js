import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigation';
import { Provider } from 'react-redux';
import store from './store';  
import { init } from './db';

export default function App() {

  const [loaded] = useFonts({
    Abel: require('./assets/fonts/Abel-Regular.ttf'),
    
  });

  if (!loaded) return <AppLoading />


init()
  .then(() => { console.log('Database initialized') })
  .catch((err) => {
    console.log('Database failed to connect')
    console.log(err.message)
  })

  return (
    <Provider store={store}>
      <MainNavigator />
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
