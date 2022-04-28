import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import colors from "../constants/colors";
import {Entypo} from '@expo/vector-icons';
import Colors from '../constants/colors'

const PlaceItem = ({ title, address, onSelect}) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={styles.placeItem}
            >
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.address}>{address}</Text>
                </View>
                
      <View>
       <Entypo name="dots-three-vertical" size={24} color={Colors.primary} />
      </View> 
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    placeItem:{
        flex:1,
        justifyContent: 'space-between',
        borderRadius: 1,
        borderRadius: 10,
        backgroundColor: colors.boxItem,
        paddingVertical:16,
        paddingHorizontal: 30,
        flexDirection:'row',
        alignItems:'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
    info:{
        marginLeft: 25,
        flex: 1,
        justifyContent:'center',
        alignItems: 'flex-start',
        color:colors.font
    },
    title:{
        color:colors.font,
        fontSize:18,
        marginBottom:6,
    },
    address: {
        color:'#777',
        fontSize:16,
    }
});
export default PlaceItem;