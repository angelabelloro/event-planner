import React, { useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/colors';
import LocationSelector from '../../components/locationSelector';
import { addPlace, loadPlaces } from '../../store/actions/ubication.actions'
import PlaceItem from '../../components/placeItem';

const EventUbicationScreen = ({ navigation}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState();
    const [location, setLocation] = useState();
    
    const places = useSelector(state => state.ubication.places);

    const handleSave = () => {
        dispatch(addPlace(title, location))
        navigation.navigate('UbicacionList')
    }
   
    return (        
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Inserte nombre de la nueva ubicación</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                />

                <LocationSelector onLocationSelected={setLocation} />
                
                <Button
                    title="GUARDAR"
                    color={Colors.body}
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
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

export default EventUbicationScreen;