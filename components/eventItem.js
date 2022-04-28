import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Button } from "react-native";
import Colors from '../constants/colors'
import {Entypo} from '@expo/vector-icons';

export default function EventItem({ pressHandler, item, pressDelete }) {
  return (
    <TouchableOpacity style={styles.itemBox} onPress={() => pressHandler(item)}>
      <Button title = "x"  onPress={() => pressDelete(item.id)} color={Colors.button}/>
      <Text style={styles.fontItem}>{item.value}</Text>
      <View>
       <Entypo name="chevron-thin-right" size={24} color={Colors.primary} />
      </View> 
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
  itemBox: {
    padding: 20,
    flex:1,
    marginHorizontal:5,
    marginVertical:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderRadius: 1,
    borderRadius: 10,
    backgroundColor: Colors.boxItem,
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