import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import LocationSelector from '../../components/locationSelector';
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, { Marker, Circle } from 'react-native-maps'

const ItemDetailsScreen = () => {
    
    const [selectedLocation, setSelectedLocation] = useState();
    const [location, setLocation] = useState();
    const initialRegion = {
        latitude: -33.2290,
		longitude: -54.3576,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };
    const [ pin, setPin ] = useState({
		latitude: -33.2290,
		longitude: -54.3576,
	})
    const [ region, setRegion ] = useState({
		latitude: -33.2290,
		longitude: -54.3576,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})


    const handleSelectedLocation = event => {
        console.log('on press')
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }
    console.log(selectedLocation)

    return (
        <View style = {styles.buscar}>
            
           <Text>Ingresa lo que deseas buscar:</Text>
           
            <GooglePlacesAutocomplete
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                placeholder = "Buscar"
                onPress =  {(data, details = null) => {
                    console.log(data, details)
                    setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
                }}
                query={{
                    key: 'AIzaSyBqCYbC5APR_-Huz46CShJ8xa2QOEKSFGE',
                    language: 'es',
                    components: 'country:uy',
                    type: "establishment",
                    radius:20000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
            />
            
                <MapView
                    initialRegion={initialRegion}
                    style={styles.container}
                    onPress={handleSelectedLocation}
                    provider="google"
                    >
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				    <Marker
                        coordinate={pin}
                        pinColor="black"
                        draggable={true}
                        onDragStart={(e) => {
                            console.log("Drag start", e.nativeEvent.coordinates)
                        }}
                        onDragEnd={(e) => {
                            setPin({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}
					>
                    </Marker>                     
                    <Circle center={pin} radius={1000} />
                </MapView>
                
            </View>
    );
}

const styles = StyleSheet.create({
    buscar:{
        flex: 0,
        position: 'absolute',
        width: '100%',
        zIndex:1
    },
    container: {
      
        width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
})

export default ItemDetailsScreen;