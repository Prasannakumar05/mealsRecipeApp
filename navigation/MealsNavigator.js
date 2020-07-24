import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform,Text} from 'react-native';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailsScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import FavoritesScreen from '../screens/FavoritesScreen'
import {Ionicons} from '@expo/vector-icons'
import React from 'react'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator } from 'react-navigation-drawer'
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    
        //mode:'modal', works only for ios
        // initialRouteName : 'Categories', 
     
        headerStyle:{
            backgroundColor:Platform.OS === 'android'? Colors.primaryColor:''
        },
        headerTitleStyle:{fontFamily:'open-sans-bold'},
        headerBackTitleStyle:{fontFamily:'open-sans'},//works only for ios
        headerTintColor:Platform.OS === 'android' ? '#000':Colors.primaryColor,
        headerTitle:' a Screen'
            
       
    
} 

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        // navigationOptions:{
        //     headerTitle:'Meal Categories'
        // } // has more adv over the default and Categories Screen in the header part 
     },
    CategoryMeals :{
        screen:CategoryMealScreen,
    },
    MealDetails:MealDetailsScreen,
},{
    defaultNavigationOptions:defaultStackNavOptions
}
);

 const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetails : MealDetailsScreen
},
{
    defaultNavigationOptions:defaultStackNavOptions
}
);
const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator , navigationOptions:{
    tabBarIcon:(tabInfo) =>{
        return( <Ionicons name='ios-restaurant' size={24} 
        color={tabInfo.tintColor}/>
        );
        },
        tabBarColor :Colors.primaryColor,
       // tabBarLabel:'meals!!'
       tabBarLabel:Platform.OS?<Text style={{fontFamily:'open-sans-bold'}}>Meals</Text>: 'Meals'
}},
Favorites: {
    screen : FavNavigator ,
     navigationOptions:{
         tabBarLabel:"Favorites!!",
    tabBarIcon:(tabInfo) =>{
        return (
        <Ionicons name='ios-star' size={24} 
        color={tabInfo.tintColor}/>
        );
    },
    tabBarColor:Colors.secondaryColor,
    tabBarLabel:Platform.OS?<Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text>: 'Favorites'
    
}}}



const MealsFavTabNavigator = Platform.OS === 'android'? 
createMaterialBottomTabNavigator(tabScreenConfig,{
    activeColor:'#fff',
    inactiveColor:"#000",
    shifting:true, //works only when its true otherWise tabBarColor doesn't work..
    barStyle:{
        backgroundColor:Colors.primaryColor // shifting will not same color will work
    }

}) 
:createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions:{
        labelStyle:{fontFamily:'open-sans'},
        activeTintColor:Colors.secondaryColor,
        activeBackgroundColor:'#34ede3'
    }
});

const FiltersNavigator = createStackNavigator({
    Filters : FiltersScreen,
    },
    
    {
        //navigationOptions:{drawerLabel : 'filters!!!'},
       
        defaultNavigationOptions:defaultStackNavOptions
    }
    );

const MainNavigator = createDrawerNavigator ({
    MealsFavs:{
    screen:MealsFavTabNavigator, navigationOptions:{
        drawerLabel:'Meals'
    }},
    Filters : FiltersNavigator
},{
    contentOptions:{
       // activeTintColor:Colors.secondaryColor,
        labelStyle:{
            fontFamily:'open-sans'
        }
    }
});

export default createAppContainer(MainNavigator);