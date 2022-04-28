import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,} from 'react-native';
import { ImageBackground } from 'react-native';
import { FlatList } from 'react-native';
import Colors from '../constants/colors';
import Events from '../components/events';
import { getEvents, selectEvent } from '../store/actions/event.actions';
import { useSelector, useDispatch } from 'react-redux';

function MainScreen ({ navigation }) {
  const dispatch = useDispatch()
  const  events = useSelector(state => state.events.eventList);  
  
  const userId = useSelector(state => state.auth.userId);
  const today = new Date();

  let greeting = "";
  if (today.getHours() < 12) {
    greeting = "¡Buenos dias!";
  } else if (today.getHours() < 18) {
    greeting = "¡Buenas tardes!";
  } else {
    greeting = "¡Buenas noches!";
  }
  useEffect(() => {
    dispatch(getEvents())
  }, [])

  const handleEventSelected = (item) => {
    dispatch(selectEvent(item.id));
    navigation.navigate ('Tarea', {
      name:item.name});
  }
  const renderItem = (data) => (
    <Events
        name={data.item.name}
        description={data.item.description}
        date={data.item.date}
        onSelect={handleEventSelected}
    />
)
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={30}
            style={styles.screen}
      >
      <View style={styles.screen}>
        <ImageBackground
          style={styles.imageTop}
          source={require('../assets/images/bg_main.png')}
          resizeMode = 'cover'
        >
          
      <View style={styles.container}>
        <View style = {styles.eventList}>
          <Text style={styles.subtitle}> {greeting} </Text>

          <Text style={styles.subtitle}>Usuario</Text>
      <FlatList
        data={events}
        renderItem={renderItem}
        horizontal = {true}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator = {false}
      />
      </View>  
       </View>
       </ImageBackground>
      </View>
         </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    screen: {
      width:'100%',
      flex:1,
      alignItems:'center',
      
    },
    container:{
      flex:1,
      justifyContent: 'flex-end',
    },
    imageTop:{
      position: 'absolute',
      width: '100%',
      height: '100%'
 
    },
    subtitle:{
      fontSize: 40,
      fontWeight: '600',
      textAlign: 'center',
      color: Colors.primary,
      fontFamily:'Abel',
    },
    title:{
      padding: 10,
      fontSize: 30,
      textAlign:'center',
      color:Colors.primary,
    },
    eventList: {
      marginTop: 30,
      marginBottom: 80,
    }
  });
  
export default MainScreen;