import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './tabNavigator';
import AuthNavigator from './authNavigator';


const MainNavigator = () => {

  const isAuthenticated = useSelector(state => state.auth.token);
  return (
    <NavigationContainer>
      {isAuthenticated
        ? <TabNavigator />
        : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;