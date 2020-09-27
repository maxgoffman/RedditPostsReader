import * as ActionTypes from '../ActionTypes';


const initialState = { 
  errMess: null, 
  isLoading: true, 
  list: null,
  selectedItem: null
};

/** 
  * @desc Reddit Reducer:
  * Handles all about Reddit model. 
  * @author Maximiliano Goffman
  * @required redux
*/
export const Reddit = (state = initialState, action) => {
    switch (action.type) {
      case ActionTypes.REDDIT_BEGIN_FETCH:
        return {...state, isLoading: true, errMess: null, list: null, selectedItem: null};
      
      case ActionTypes.REDDIT_FETCHED_DATA:
        return {...state, isLoading: false, errMess: null, list: action.list, selectedItem: null};

      case ActionTypes.REDDIT_ERROR_FETCH:
          return {...state, isLoading: false, errMess: action.error, list: null, selectedItem: null};
      
      case ActionTypes.REDDIT_SELECT_ITEM:
        
        if (action.item.read) {
          return {...state, selectedItem: action.item};
        }  
        const selectedItem = {...action.item, read:true}; 
        return {
          ...state, 
          list: state.list.map((item) => {
              if (item === action.item) {
                return selectedItem;
              }
              return item;
            }),
          selectedItem: selectedItem
        };
      
      case ActionTypes.REDDIT_REMOVE_ITEM:
          return {
            ...state, 
            list: state.list.filter((item) => item !== action.item) 
          };

      case ActionTypes.REDDIT_REMOVE_ALL_ITEMS:
        return {
          ...state, 
          list: null 
        };
      

      default:
        return state;
    }
};