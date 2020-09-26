import * as ActionTypes from '../ActionTypes';


const initialState = { 
  errMess: null, 
  isLoading: true, 
  list: null,
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
        return {...state, isLoading: true, errMess: null, list: null};
      
      case ActionTypes.REDDIT_FETCHED_DATA:
        return {...state, isLoading: false, errMess: null, list: action.list};

      case ActionTypes.REDDIT_ERROR_FETCH:
          return {...state, isLoading: false, errMess: action.error, list: null};

      default:
        return state;
    }
};