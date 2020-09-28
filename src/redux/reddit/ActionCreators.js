import * as ActionTypes from './ActionTypes';


/** 
  * @desc Get Top Posts from reddit:
  * Fetch data from reddit and then send response to Redux Store.
  * @author Maximiliano Goffman
  * @required redux redux-thunk
*/
export const getTopPosts = (after = null, limit = 50) => async (dispatch) => {
  dispatch(initFetch());

  const redditUrl = `https://www.reddit.com/top.json?limit=${limit}${after ? `&after=${after}` : ''}`;
  try {
    const response = await fetch(redditUrl);
    if (!response.ok) {
      let error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
    const reddit = await response.json();
    if (reddit.data && reddit.data.children) {
      dispatch(fetchSuccess(reddit.data.children, reddit.data.after));
    }
    else {
      dispatch(fetchSuccess([], null));
    }
  } catch(error) {
    dispatch(fetchFailed(error.message));
  }
};


export const initFetch = () => ({
  type: ActionTypes.REDDIT_BEGIN_FETCH
});

export const fetchSuccess = (list, after) => ({
  type: ActionTypes.REDDIT_FETCHED_DATA,
  list: list,
  after: after
});

export const fetchFailed = (errmess) => ({
  type: ActionTypes.REDDIT_ERROR_FETCH,
  error: errmess
});

export const selectItem = (item) => ({
  type: ActionTypes.REDDIT_SELECT_ITEM,
  item: item
});

export const removingItem = (item) => ({
  type: ActionTypes.REDDIT_REMOVING_ITEM,
  item: item
});

export const removeItem = (item) => ({
  type: ActionTypes.REDDIT_REMOVE_ITEM,
  item: item
});

export const removeAllItems = () => ({
  type: ActionTypes.REDDIT_REMOVE_ALL_ITEMS
});
