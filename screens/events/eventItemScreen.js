import React, {useState} from "react";
import { 
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import Colors from '../../constants/colors';
import AddItem from '../../components/addItem';
import EventItem from "../../components/eventItem";
import { useSelector, useDispatch } from 'react-redux';
import {addItem, removeItem} from '../../store/actions/item.actions'
import { selectEvent} from '../../store/actions/event.actions';
import UbicacionEvento from "../../components/eventUbication";

const EventItemScreen = ({ navigation, route}) => {

  const dispatch = useDispatch();
 
  const [textInput, setTextInput] = useState('');
  const itemList = useSelector(state => state.items.itemList);

  const handleChangeText = (text) => {
    setTextInput(text)
  }

  const handleOnPress = () => {
    if(textInput.length>2){
    setTextInput('')
    dispatch(addItem(
      {
        value: textInput, 
        id: Math.random().toString(),
      }
    ));
  } else{
      Alert.alert('Ops,', 'debes ingresar una tarea minimo de 3 letras',[
      {text: 'Ok', onPress: () => console.log('cerro alerta de item')}
    ]);
  }
}
  
  const handleItemDelete = (item) =>{
    dispatch(removeItem(item));
    console.log('borrado')
  }
  const handleItemSelected = (item) => {
    dispatch(selectEvent(item.id, item.description));
    navigation.navigate('Detalles', {
      name:item.name,
    });
  }

  const handleUbication = (item) => {
    dispatch(selectEvent(item.id, item.description));
    navigation.navigate('UbicacionList', {
      name:item.name,
    });
  }
  return (
      <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss()
      }}>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={30}
          style={styles.screen}
    >
      <React.Fragment>
        <View style ={styles.top}>
        <UbicacionEvento  item  pressHandler={handleUbication}/>
        </View>
    <View style={styles.container}>
      <View>
        <Text style= {styles.subtitle}>Descripcion: {}</Text>
      </View>
     <View>
       <Text style={styles.subtitle}>Por favor ingresa la actividad o el objeto que hace parte de tu evento</Text>
    </View>
    <AddItem
      textInput={textInput}
      handleOnPress={handleOnPress}
      handleChangeText={handleChangeText}
      />
      <FlatList
        data={itemList}
        renderItem={({ item }) => (
          <EventItem item={item} pressHandler={handleItemSelected} pressDelete={handleItemDelete} />

        )
        }
        numColumns={2}
        keyExtractor={item => item.id}
      /> 

  </View>
  </React.Fragment>
 
       </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    width:'100%',
    flex:1,
    padding:10,
    alignItems:'center',
    backgroundColor: Colors.header,
  },
  top:{ 
    padding:10,
    flexDirection: 'row',
  },
  container:{
    flex:2,
      flexDirection:'column',
  },
  subtitle:{
    padding: 10,
    fontSize: 18,
    textAlign: 'justify',
    color: Colors.font,
    fontFamily:'Abel',
  },
  title:{
    padding: 10,
    fontSize: 30,
    textAlign:'center',
    color:Colors.primary,
  }
});

export default EventItemScreen;
