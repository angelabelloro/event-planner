import React from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Colors from '../constants/colors';
import {Entypo} from '@expo/vector-icons';

function AddEvent({ textInput, handleChangeText, handleOnPress}){
  return (
      <View style={styles.container}>
        <TextInput
        blurOnSubmit={true}
        style={styles.input}
        value={textInput.title}
        onChangeText= {handleChangeText}
        placeholder='Evento'
    />  
    <TextInput
        blurOnSubmit={true}
        style={styles.input}
        value={textInput.description}
        onChangeText= {handleChangeText}
        placeholder='Descripcion'
    />

      <TouchableOpacity style={styles.itemBox} onPress={handleOnPress}>
        <View>
          <Entypo name="plus" size={30} color={Colors.primary} />
        </View> 
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'center'
  },
  input: {
    margin:4,
    height: 50,
    width: '85%',
    backgroundColor:Colors.tab,
    borderRadius: 15,
    padding:10,
    marginVertical: 10,
  },
  itemBox: {
    height:50,
    width: 50,
    marginHorizontal:5,
    marginVertical:5,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 50,
    backgroundColor: Colors.button,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  fontItem:{
    padding:5,
    fontSize: 16,
    color: Colors.primary,
    fontFamily: 'Abel',
  }
});

export default AddEvent;