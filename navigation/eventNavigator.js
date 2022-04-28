import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartEventScreen from '../screens/events/startEventScreen';
import EventScreen from '../screens/events/eventScreen';
import EventItemScreen from '../screens/events/eventItemScreen';
import ItemDetailsScreen from '../screens/eventItems/itemDetailsScreen';
import UbicationListScreen from '../screens/ubication/ubicationListScreen';
import EventUbicationScreen from '../screens/events/eventUbicationScreen';
import MapScreen from '../screens/mapScreen';
import Colors from '../constants/colors';
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator();

const ROUTES = {
    HOME: 'Home',
}
 const EventNavigator = () => {
     return (
        <Stack.Navigator 
            initialRouteName = 'Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
                    
                },
                headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
        <Stack.Screen 
          name={ROUTES.HOME} 
          options={{ title: 'PLANEADOR DE EVENTOS'}} component={StartEventScreen}
        />
        <Stack.Screen 
          name='Evento' 
          component={EventScreen} 
          options={{title: 'Agregar Evento'}} 
            
        />
        <Stack.Screen 
          name='Tarea' 
          component={EventItemScreen} 
          options={({ route }) => ({
            title:route.params.name,
          })}
        />
        <Stack.Screen 
          name='Detalles' 
          component={ItemDetailsScreen} 
          options={({ route }) => ({
            title:route.params.name,
          })}
        />
        <Stack.Screen 
          name='Map' 
          component={MapScreen} 
          options={{title: 'Mapa'}} 
            
        />
         <Stack.Screen name='UbicacionList' 
                component={UbicationListScreen}
                options={({ navigation }) => ({
                    title: 'Direcciones',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Nueva')}>
                            <Ionicons
                                name="md-add"
                                color={Platform.OS === 'android' ? 'white' : Colors.header}
                                size={24}
                            />
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen name="Nueva"
                component={EventUbicationScreen}
                options={{title: 'Nueva direccion'}} 
            />
            
         </Stack.Navigator>
     );
 }

export default EventNavigator;