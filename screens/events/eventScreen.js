import React, {useState} from "react";
import { 
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    Keyboard,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    ImageBackground,
    TextInput,
    TouchableOpacity
 } from "react-native";
import Colors from "../../constants/colors";
import LocationSelector from '../../components/locationSelector';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, updateEvent} from '../../store/actions/event.actions';
import moment from "moment";
import { CalendarList } from 'react-native-calendars';
import { ScrollView } from "react-native";
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';


 const EventScreen = ({ navigation, route }) => {
  
  const [nameText, setNameText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [currentDay, setCurrentDay] = useState(moment().format());

  const [alarmTime, setAlarmTime] = useState(moment().format());

  const createNewCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === 'ios'
        ? await Calendar.getDefaultCalendarAsync(Calendar.EntityTypes.EVENT)
        : { isLocalAccount: true, name: 'Google Calendar' };

    const newCalendar = {
      title: 'Personal',
      entityType: Calendar.EntityTypes.EVENT,
      color: Colors.header,
      sourceId: defaultCalendarSource?.sourceId || undefined,
      source: defaultCalendarSource,
      name: 'internal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: 'personal'
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

const verifyPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync()

    if (status == 'granted') {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      )} else(
      Alert.alert(
        'Permisos insuficientes',
        'Necesita dar permisos de la localización para usar la aplicación',
        [{ text: 'Ok' }],
      ))
  }

  const dispatch = useDispatch();
  const [location, setLocation] = useState();
  const userId = useSelector(state => state.auth.userId);

  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
      'DD'
      )}`]: {
       selected: true,
       selectedColor: '#2E66E7'
      }
    });
      
  const synchronizeCalendar = async () => {
    const calendarId = await createNewCalendar();
    try {
      const createEventId = await addEventsToCalendar(calendarId);

    } catch (e) {
      Alert.alert(e.message);
    }
  };
  const addEventsToCalendar = async (calendarId) => {
    const event = {
      title: nameText,
      notes: descriptionText,
      startDate: moment(alarmTime).add(0, 'm').toDate(),
      endDate: moment(alarmTime).add(5, 'm').toDate(),
      timeZone: Localization.timezone
    };
    
    try {
      const createEventAsyncResNew = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );
      return createEventAsyncResNew;
    } catch (error) {
      console.log(error);
    }
  };

   const onSubmit =() =>{
     if(verifyPermissions()){
       if(nameText.length>2){
         synchronizeCalendar()
         dispatch(addEvent({
           userId,
           name:nameText,
           description: descriptionText,
           date:currentDay,
           location,
         }));
         
      Alert.alert('Has agregado un nuevo evento')
      console.log("Nombre", nameText, "Descrpcion: ", descriptionText, "Fecha: ", currentDay, location )
      navigation.navigate('Home',{
        userId,
        nameText,
        descriptionText,
        currentDay,
        location,
      })
       }else{
        Alert.alert('Ops,', 'debes ingresar un nombre con un minimo de 3 letras',[
          {text: 'Ok', onPress: () => console.log('cerro alerta de evento')}
        ]);
       
     }
    }
   }
   
   /* const onPressEvent = (item) => () => {
      setEventSelected(item)
    }*/
        
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={30}
            style={styles.screen}
      >
        <ScrollView
         contentContainerStyle={{
            paddingBottom: 150
          }}>
            <View style={styles.container}>
             <Text style={styles.subtitle}>Seleccione por favor la fecha de cuando se va a realizar</Text>
            <View style={styles.calenderContainer}>
                <CalendarList
                    style={{
                    width: 350,
                    height: 350
                    }}
                    current={currentDay}
                    minDate={moment().format()}
                    horizontal
                    pastScrollRange={0}
                    pagingEnabled
                    calendarWidth={350}
                    onDayPress={(day) => {
                    setSelectedDay({
                        [day.dateString]: {
                        selected: true,
                        selectedColor: Colors.header
                        }
                    });
                    setCurrentDay(day.dateString);
                    }}
                    monthFormat="yyyy MMMM"
                    hideArrows
                    markingType="custom"
                    theme={{
                    selectedDayBackgroundColor: Colors.header,
                    selectedDayTextColor: Colors.font,
                    todayTextColor: Colors.boxEvent,
                    backgroundColor: '#eaeef7',
                    calendarBackground: '#eaeef7',
                    textDisabledColor: '#d9dbe0'
                    }}
                    markedDates={selectedDay}
                />
                </View>
        
        <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Nombre:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Evento"
                placeholderTextColor="#00000030"
                value={nameText}
                onChangeText={setNameText} 
            /> 
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Descripción: </Text>
            <TextInput
                style={styles.textInput}
                placeholder="Descripcion"
                placeholderTextColor="#00000030"
                value={descriptionText}
                onChangeText={setDescriptionText}
            /> 
        </View>
        <LocationSelector onLocationSelected={setLocation} />     
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
            <Text style={{color: 'white'}}>Agregar</Text>
        </TouchableOpacity>
        
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    screen: {
      
      alignItems:'center',
    
    },
    container:{
        flex:1,
        padding:20,
        flexDirection:'column',
        backgroundColor: '#ffff',
        justifyContent:'center',
        marginRight: 30,
    },
    list:{
      padding:10,

    },
    subtitle:{
      padding: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'justify',
      color: Colors.primary,
      fontFamily: 'Abel',
      fontWeight:'600',
      //backgroundColor: Colors.header,
    },
    image:{
      width:'100%',
      height: '100%',
      resizeMode:'cover',
      position:'absolute'
    },
    title: {
        fontSize: 20,
        marginBottom: 35,
        marginTop: 10,
        fontFamily:'Abel',
        color:Colors.primary,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },

    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
        color: Colors.primary,
        fontFamily:'Abel'
    },
    inputContainer: {
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.button,
        height: 46,
        borderRadius: 11,
    },
    calenderContainer: {
        width: 350,
        height: 350,
        alignSelf: 'center',
        shadowColor:'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        marginBottom: 20,
        marginTop:0,
      },
  });
 
 export default EventScreen;