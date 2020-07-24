import { MEALS} from '../../data/dummy-data'
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';


const initialState = {
    meals :MEALS ,
    filteredMeals :MEALS ,
    favoriteMeals:[] ,
}

const mealsReducer = (state=initialState , action) =>{
    switch (action.type){
        case TOGGLE_FAVORITE:
            const existingIndex =state.favoriteMeals.findIndex(meal => meal.id===action.mealId);
            if(existingIndex >= 0){
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex,1);
                return {...state,favoriteMeals:updatedFavMeals}
            }else{
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return {...state, favoriteMeals:state.favoriteMeals.concat(meal)}
            }
        case SET_FILTERS:
                const appliedFilters = action.filters;
                const updatedFilteredMeals = state.meals.filter(meals => {
                    if(appliedFilters.glutenFree && !meals.isGlutenFree){
                        return false;
                    }
                    if(appliedFilters.lactoseFree && !meals.isLactoseFree){
                        return false;
                    }
                    if(appliedFilters.vegetarian && !meals.isVegetarian){
                        return false;
                    }
                    if(appliedFilters.vegan && !meals.isVegan){
                       return false; 
                    }
                    return true;
                });
                return{...state,filteredMeals:updatedFilteredMeals};
        default :
        return state;    
    }
    
};

export default mealsReducer;