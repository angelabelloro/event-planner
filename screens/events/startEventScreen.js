import React, {useState, useEffect} from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ImageBackground,Alert } from "react-native";
import Colors from "../../constants/colors";
import { useSelector, useDispatch } from 'react-redux';
import Events from '../../components/events';
import { getEvents, selectEvent } from '../../store/actions/event.actions';
import {Entypo} from '@expo/vector-icons';
import moment from "moment";

import * as Calendar from 'expo-calendar';
import CalendarStrip from 'react-native-calendar-strip';
  const datesWhitelist = [
      {
        start: moment(),
        end: moment().add(365, 'days') // total 4 days enabled
      }
    ];
    
 const StartEventScreen = ({ navigation }) => {


  const [markedDate, setMarkedDate] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    `${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD'
    )}`
  );

  const dispatch = useDispatch()
  const  events = useSelector(state => state.events.eventList);
  const [eventsByDate, setEventsByDate] = useState([]);
  const todayEvents = useSelector(state => state.events.eventsByDate);
  useEffect(() => {
    dispatch(getEvents())
  }, [])

  //Debo realizar el update de la lista de Eventos***************************

  const updateCurrentEvent = async (currentDate) => {
    try {
      if (events !== [] && events) {
        const eventsByDate= events.filter((item) => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
       if (eventsByDate.lenght !== 0) {
         setEventsByDate(eventsByDate[0].eventsByDate)
         console.log("eventosdel dia: ", eventsByDate)
       } else{
         setEventsByDate([]);
       }
      }
    } catch (error) {
      console.log('updateCurrentEvent', error.message);
    }
  };

  const handleAddEvent = () => {
    navigation.navigate ('Evento', {
      currentDate,
    });
  }

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
      
  return (
  <View style={styles.screen}>
    <ImageBackground
      style={styles.screenImage}
      source={require('../../assets/images/bg_event.png')}
      resizeMode = 'cover'
    >
    <CalendarStrip
      calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 200
        }}
        style={{
          height: 150,
          paddingTop: 20,
          paddingBottom: 20
        }}
        calendarHeaderStyle={{ color: '#000000', fontSize:20 }}
        dateNumberStyle={{ color: '#000000', paddingTop: 10 }}
        dateNameStyle={{ color: Colors.primary, fontSize: 12 }}
        highlightDateNumberStyle={{
          color: '#fff',
          backgroundColor: Colors.body,
          marginTop: 10,
          height: 35,
          width: 35,
          textAlign: 'center',
          borderRadius: 17.5,
          overflow: 'hidden',
          paddingTop: 6,
          fontWeight: '400',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16
        }}
        highlightDateNameStyle={{ color: Colors.primary, fontSize: 14 }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey', paddingTop: 10 }}
        datesWhitelist={datesWhitelist}
        iconLeft={require('../../assets/left-arrow.png')}
        iconRight={require('../../assets/right-arrow.png')}
        iconContainer={{ flex: 0.1 }}
        markedDates={markedDate}
        selectedDate={currentDate}
        onDateSelected={(date) => {
          const selectedDate = `${moment(date).format('YYYY')}-${moment(
            date
            ).format('MM')}-${moment(date).format('DD')}`;
            updateCurrentEvent(selectedDate);
            setCurrentDate(selectedDate);
            }}  
    />
    <View style={{ marginBottom: 20,}}>
      <Text style={styles.subtitle}>TUS EVENTOS</Text>
    </View>
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        horizontal = {true}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator = {false}
      />
    </View>
    <TouchableOpacity style={styles.itemBox} onPress={handleAddEvent}>
      <View>
        <Entypo name="plus" size={30} color={Colors.primary} />
      </View> 
    </TouchableOpacity>
    </ImageBackground>
    </View>
    );
  };
    
  const styles = StyleSheet.create({
    container:{
        
    },
    screen: {
    flex:1,
    padding:10,
    alignItems:'center',
    backgroundColor: Colors.font,
    },
    screenImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    container:{
        height: 275,
        paddingLeft: 32
    },
    subtitle:{
      padding: 16,
      fontSize: 25,
      textAlign: 'justify',
      color: Colors.primary,
      fontFamily: 'Abel',
      fontWeight:'800',
      //backgroundColor: Colors.header,
    },
    image:{
      width:'100%',
      height: '100%',
      position:'absolute'
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
      right: 20,
      bottom: 65,
      position:'absolute',
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 10,
      elevation: 3,
    },
  });
  
 export default StartEventScreen;