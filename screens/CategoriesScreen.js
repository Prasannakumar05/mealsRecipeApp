import React from 'react';
import {View,Text,StyleSheet,Button,FlatList,TouchableOpacity} from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import CategoryGridTile from '../components/CategoryGridTile';
import {HeaderButtons , Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';



const CategoriesScreen = props =>{

  const renderGridItem = itemData => {
    return(
       <CategoryGridTile title={itemData.item.title} 
       color={itemData.item.color}
       onSelect={()=> {
        props.navigation.navigate({
            routeName:'CategoryMeals',
            params:{
                categoryId:itemData.item.id
        }});
    }}/>
    );
  };

   // console.log(props)
    return(
        <FlatList
        keyExtractor={(item,index)=>item.id}
         data={CATEGORIES} renderItem={renderGridItem} numColumns={2}/>//key Extractor is used in older version if RN
    );
};

CategoriesScreen.navigationOptions =navData=>{
    return{
    headerTitle : 'Meals Categories',
    headerLeft :()=>(
         <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title = 'Menu' iconName='ios-menu' onPress={()=>{
            navData.navigation.toggleDrawer();
        }}/>
    </HeaderButtons>
    )
};
};

// access the header part
// CategoriesScreen.navigationOptions = {
//     headerTitle: 'Meal Categories',
    // headerStyle:{
    //     backgroundColor:Platform.OS === 'android'? Colors.primaryColor:''
    // },
    // headerTintColor:Platform.OS === 'android' ? '#000':Colors.primaryColor
//};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
   
});

export default CategoriesScreen;

{/* <View style={styles.screen}>
            <Text>The CategoriesScreen!</Text>
            <Button title = 'Go to Meals!' onPress={()=>{
              props.navigation.navigate({routeName:'CategoryMeals'})
               // props.navigation.replace('CategoryMeals'); //replace : navigates to screen but does not back navigation in default
                
            }}/>
        </View> */}