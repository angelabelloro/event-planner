import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, FlatList} from "react-native";
import Colors from '../constants/colors'
import {Entypo} from '@expo/vector-icons';


export default function eventUbication({ pressHandler, item}) {
  return (
    <TouchableOpacity style={styles.itemBox} onPress={() => pressHandler(item)}>
      <Text style={styles.fontItem}>UBICACION</Text>

      <View>
       <Entypo name="dots-three-vertical" size={24} color={Colors.primary} />
      </View> 
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
  itemBox: {
    flex: 1,
    height:50,
    marginHorizontal:5,
    marginVertical:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor: Colors.body,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  fontItem:{
    padding:5,
    fontSize: 20,
    color: Colors.primary,
    fontFamily: 'Abel',
  }
});