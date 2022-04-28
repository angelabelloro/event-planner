import React, { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaces } from '../../store/actions/ubication.actions';
import PlaceItem from '../../components/placeItem';


const UbicationListScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const places = useSelector(state => state.ubication.places);
    console.log(places)

    useEffect(() => {
        dispatch(loadPlaces())
    }, [])

    const renderItem = (data) => (
        <PlaceItem
            title={data.item.title}
            address={data.item.address}
            onSelect={() => navigation.navigate('UbicacionDetails')}
        />
    )

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default UbicationListScreen;