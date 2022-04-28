import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import {Entypo} from '@expo/vector-icons';
import Colors from '../constants/colors';
import moment from "moment";

const Events = ({ name, description, date, onSelect}) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={styles.infocontainer}
            >
            <View style = {{alignItems:'center'}}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                 </View>
                 <View>
                    <Text style={styles.infodescription}>{description}</Text>
                 </View>
                 
         </View>
         <View style={styles.datecontainer}>
             <View style = {styles.datebox}>
                <View style = {styles.infodate}>
                   <Text>{moment(date).format('MMM')}</Text>
                </View>
                <Text>{moment(date).format('DD')}</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    infodescription:{
        fontSize: 16,
        fontWeight: "600",
        paddingBottom: 18,
        color:Colors.font,
    },
    datecontainer:{
        alignItems:'flex-end', 
        right:5,
        bottom: 5,
        marginHorizontal: 15,
        marginVertical:15,
        position: 'absolute'
    },
    datebox:{
        width: 60,
        height: 60,
        borderRadius:10, 
        right: 5,
        backgroundColor: Colors.font,
        justifyContent:'center',
        alignItems:'center',
    },
    infodate:{
        fontSize: 20,
        opacity:0.5,
        color: Colors.primary
    },
    infocontainer:{
        paddingVertical: 32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200,
        backgroundColor:Colors.boxEvent,
        opacity:0.8,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    title:{
        color:Colors.font,
        fontSize:22,
        fontWeight:"600",
        marginBottom:18,
        textTransform: "uppercase",
    },
    address: {
        color:'#777',
        fontSize:16,
    }
});
export default Events;