import React from 'react';
import {StyleSheet,TouchableOpacity,Text,View,Platform,TouchableNativeFeedback} from 'react-native';

const CategoryGridTile = props =>{
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version>=21){
        TouchableCmp = TouchableNativeFeedback;
    }
    return(
        <View style={styles.gridItem}>
        <TouchableCmp  style={styles.cmp} onPress={props.onSelect}>
        <View style={{...styles.container,...{backgroundColor:props.color}}}>
            <Text style={styles.title} numberOfLines={2}>
                {props.title}
            </Text>
        </View>
        </TouchableCmp>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem:{
        flex:1,
        margin:15,
        height:150,
        borderRadius:20,
        overflow:Platform.OS === 'android' && Platform.Version>=21 ? 'hidden':'visible',
        elevation:5
    },
    container:{
        flex:1,
        borderRadius:20,
        shadowColor:'#000',
        shadowOpacity:0.26,
        shadowOffset:{width:0 , height:2},
        shadowRadius:10,
        elevation:3,//shadow property affects the ios alone and elevation :android
        padding:20,
        justifyContent:'flex-end',
        alignItems:'flex-end'
        
    },
    title:{
        fontFamily:'open-sans',
        fontSize:20,
        textAlign:'right'
    },
    cmp:{
        flex:1
    }
    
});

export default CategoryGridTile;