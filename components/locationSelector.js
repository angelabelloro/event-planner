import React, { useState } from "react";
import {View, Button, Text, StyleSheet, Alert} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import MapPreview from './mapPreview';
import Colors from '../constants/colors';

function LocationSelector ({ onLocationSelected }) {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState();
  
  const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          Alert.alert(
            'Permisos insuficientes',
            'Necesita dar permisos de la localización para usar la aplicación',
            [{ text: 'Ok' }],
          )
    
          return false;
        }
    
        return true;
    }


  const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissions();
        if (!isLocationOk) return;
    
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000,
        })
    
        setPickedLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
        onLocationSelected({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
    }


    return (
      <View style={styles.container}>
        <MapPreview location={pickedLocation} style={styles.preview}>
          <Text>Location en proceso...</Text>
        </MapPreview>
        <Button
          title="Obtener Location"
          color={Colors.button}
          onPress={handleGetLocation}
        />
        <Button
          title="Elegir en el mapa"
          color={Colors.primary}
          onPress={() => navigation.navigate('Map')}
        />
      </View>
    )
  }

const styles = StyleSheet.create({
    container:{
        marginBottom: 10,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:Colors.primary,
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default LocationSelector;