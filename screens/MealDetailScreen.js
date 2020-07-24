import React,{useEffect, useCallback} from 'react';
import {ScrollView,Text,StyleSheet,Button,Image,View} from 'react-native';
import { MEALS } from '../data/dummy-data';
import {HeaderButtons, Item } from 'react-navigation-header-buttons'
import  HeaderButton  from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {useSelector,useDispatch} from 'react-redux';
import { toggleFavorite } from '../store/actions/meals';


const ListItem = props =>{
    return(
        <View style={styles.listItem}>
            <DefaultText>{props.children}</DefaultText>
        </View>
    )
}

const MealDetailsScreen = props =>{
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state =>
         state.meals.favoriteMeals.some(meal => meal.id === mealId));
   
    const selectedMeal = availableMeals.find(meal=> meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
      }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav:toggleFavoriteHandler});
        
    }, [toggleFavoriteHandler]);

    useEffect(()=>{
        props.navigation.setParams({
            isFav: currentMealIsFavorite
        });
    },[currentMealIsFavorite]);


    // useEffect(()=>{
    //     props.navigation.setParams({mealTitle : selectedMeal.title});
    // },[selectedMeal]) //title will not be displayed during selected category instead we directly pass in to mealList component

   

    //const selectedMeal = MEALS.find(meal=> meal.id === mealId); // before using redux
    return(
        <ScrollView>
        <Image source={{uri : selectedMeal.imageUrl}} style={styles.image}/>
        <View style={styles.details}>
          <DefaultText>  {selectedMeal.duration}min  </DefaultText>
          <DefaultText>{selectedMeal.complexity}</DefaultText>
          <DefaultText>{selectedMeal.affordability}</DefaultText>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => 
        <ListItem key={ingredient}>{ingredient}</ListItem>)}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(a => 
        <ListItem key={a}>{a}</ListItem>)}
       
           
          {/* <Button title='GO to Categories' onPress={()=>{
              props.navigation.popToTop('Categories') //popToTop navigates to first Screen
          }}/> */}
        
        </ScrollView>
    );
};
MealDetailsScreen.navigationOptions = (navigationData) => {
    //const mealId = navigationData.navigation.getParam('mealId');
   // const selectedMeal = MEALS.find(meal=> meal.id === mealId);
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    return{
        headerTitle : mealTitle,
       // headerTitle: selectedMeal.title, before using redux
       // headerRight: <Text>Fav!!</Text> //custom text can also added instead of header button
       headerRight: ()=>(  <HeaderButtons HeaderButtonComponent={HeaderButton}>
           <Item title ="Favorite" 
           iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
            onPress={toggleFavorite}
           
           />
           </HeaderButtons>
           
       
       )
    };
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:200
    },
    details:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-around',
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
        textAlign:'center'

    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:'#ccc',
        borderWidth:1,
        padding:10
    }
});

export default MealDetailsScreen;