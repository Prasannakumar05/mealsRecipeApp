import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import { CATEGORIES,MEALS } from '../data/dummy-data';// used redux instead of it...
import Colors from '../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';

import{useSelector} from 'react-redux';
import DefaultText from '../components/DefaultText';





const CategoryMealScreen = props =>{
  
   
  const catId = props.navigation.getParam('categoryId');

  const availableMeals = useSelector(state => state.meals.filteredMeals);

   const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >=0
);

if(displayedMeals.length === 0){
  return <View style={styles.content}>
    <DefaultText>
      no meals found , maybe check your filters!!
    </DefaultText>
  </View>
}
   
    return(
      <MealList listData = {displayedMeals} navigation={props.navigation}/>
    );
};

// styling the navigation header part
CategoryMealScreen.navigationOptions = navigationData =>{
   const catId =  navigationData.navigation.getParam('categoryId');
   const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  
   return {
    
      headerTitle:selectedCategory.title,
    //    headerStyle:{
    //     backgroundColor:Platform.OS === 'android'? Colors.primaryColor:''
    // },
    // headerTintColor:Platform.OS === 'android' ? '#000':Colors.primaryColor,
    
   };
};

const styles = StyleSheet.create({
  content:{
    flex:1,
   
    alignItems:'center',
    justifyContent:'center',
    
  }
});

export default CategoryMealScreen;