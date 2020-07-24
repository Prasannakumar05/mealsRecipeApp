import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens } from 'react-native-screens';
import {createStore , combineReducers} from 'redux';
import mealsReducer from './store/reducers/meals';
import {Provider} from 'react-redux'



enableScreens(); //useScreen();

const rootReducer = combineReducers({
  meals : mealsReducer
})
const store = createStore(rootReducer);

const fetchFonts = () =>{
  return Font.loadAsync({
    'open-sans' : require('./assets/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  if(!fontLoaded){
    return(
      <AppLoading startAsync={fetchFonts} 
      onFinish={()=> setFontLoaded(true)}/>
    );
  }

  return (
   
   <Provider store={store}> 
     
   <MealsNavigator/>
   </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
