import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = () => {
    const [selectedLocation, setSelectedLocation] = useState();
    const initialRegion = {
        latitude: 37.4219023,
        longitude: -122.0839984,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const handleSelectedLocation = event => {
        console.log('on press')
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    console.log(selectedLocation)

    return (
        <MapView
            initialRegion={initialRegion}
            style={styles.container}
            onPress={handleSelectedLocation}
            showsUserLocation
        >
            {selectedLocation && (
                <Marker title="P" coordinate={{
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lng,
                }} />
            )}
        </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapScreen
