import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';// used redux instead of it...
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton'
import {useSelector} from 'react-redux';
import DefaultText from '../components/DefaultText';




const FavoritesScreen = props =>{
    const favMeals = useSelector(state => state.meals.favoriteMeals);
    if(favMeals.length === 0 || !favMeals){
        return (
            <View style={styles.content}>
                <DefaultText>No favorite Meals found . Select something as Favorites!!</DefaultText>
            </View>
        );
    }

   // const favMeals = MEALS.filter(meal => meal.id === 'm1' || meal.id === 'm2')
    return(
       <MealList listData = {favMeals} navigation={props.navigation}/>
    );
};

FavoritesScreen.navigationOptions = navData => {
    return{
    headerTitle :'Favorites Screen',
    headerLeft : () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title = 'Menu' iconName='ios-menu' onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/>
        </HeaderButtons>
    )
            };
};

const styles=StyleSheet.create({
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});


export default FavoritesScreen;