import * as ActionTypes from '../ActionTypes';
import { loadPosts, savePosts } from "../../persistedstate";



//IMPORTANT NOTE:
//I'm only persisting read posts and not dismissed posts.
//There is a very simple reason:
//If we persist dismissed posts and (for example) we dismiss them all
//then after a refresh those posts will still be missing
//which would make the whole test pointless
//At least persisting read/unread post we can check persistance works
const persistedPostIds = loadPosts();

const initialState = { 
  errMess: null, 
  isLoading: true, 
  list: null,
  selectedItem: null,
  selectedPostIds: (persistedPostIds ? persistedPostIds: []),
  after: null
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
        return {...state, isLoading: true, errMess: null, selectedItem: null};
      
      case ActionTypes.REDDIT_FETCHED_DATA:
        const remainingIds = [...state.selectedPostIds];
        let updatedList = action.list.map((item) => {
          if (remainingIds.length <= 0) {
            return item;
          }
          const indexId = remainingIds.findIndex((id) => id === item.data.id);
          if (indexId !== -1) {
            remainingIds.splice(indexId, 1);
            return {...item, read:true};
          }
          return item;
        });
        if (state.list && state.list.length > 0) {
          updatedList = [...state.list, ...updatedList];
        }
        return {
          ...state, 
          isLoading: false, 
          errMess: null, 
          list: updatedList, 
          selectedItem: null,
          after: action.after
        };

      case ActionTypes.REDDIT_ERROR_FETCH:
          return {...state, isLoading: false, errMess: action.error, list: null, selectedItem: null};
      
      case ActionTypes.REDDIT_SELECT_ITEM:
        
        if (action.item.read) {
          return {...state, selectedItem: action.item};
        }  
        const selectedItem = {...action.item, read:true}; 
        
        const updateSelectedPostsIds = [...state.selectedPostIds, action.item.data.id];
        savePosts(updateSelectedPostsIds);
        return {
          ...state, 
          list: state.list.map((item) => {
              if (item === action.item) {
                return selectedItem;
              }
              return item;
            }),
          selectedItem: selectedItem,
          selectedPostIds: updateSelectedPostsIds
        };
      
      case ActionTypes.REDDIT_REMOVING_ITEM:
        
      return {
          ...state, 
          list: state.list.map((item) => {
            if (item === action.item) {
              return {...item, removing: true};
            }
            return item;
          })
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