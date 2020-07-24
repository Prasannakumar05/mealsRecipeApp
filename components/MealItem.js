import React from 'react';
import {View,Text,StyleSheet,TouchableNativeFeedback,ImageBackground} from 'react-native';
import { color } from 'react-native-reanimated';
import DefaultText from './DefaultText';


const MealItem = props =>{
    return( 
        <View style={styles.mealItem}>
        <TouchableNativeFeedback onPress={props.onSelectMeal}> 
      <View>
    <View style = {{...styles.mealRow,...styles.mealHeader}}>
    <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
    <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
        </View>
        </ImageBackground>      
       </View>
        <View style={{...styles.mealRow, ...styles.mealDetails}}>
          <DefaultText>  {props.duration}min  </DefaultText>
          <DefaultText>{props.complexity}</DefaultText>
          <DefaultText>{props.affordability}</DefaultText>
        </View>
        </View>
    </TouchableNativeFeedback>
    </View>
    );
};

const styles = StyleSheet.create({
    mealRow:{
        flexDirection:'row'
    },
    mealItem:{
        height:200,
        width:'100%',
        backgroundColor:'#f5f5',
        borderRadius:20,
        overflow:'hidden',
        marginVertical:10
        
    },
    mealHeader:{
        height:'85%',
    },
    mealDetails:{
        paddingHorizontal:10,
        justifyContent: 'space-between',
        alignItems:'center',
        height:'15%'
    },
    bgImage:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'

    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
        color:'white',
        textAlign:'center'
        
    },
    titleContainer:{
        backgroundColor:'rgba(0,0,0,0.1)',
        paddingVertical:5,
        paddingHorizontal:12,
        
    }

});

export default MealItem;