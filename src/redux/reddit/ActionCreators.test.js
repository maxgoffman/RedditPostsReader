import * as actions from './ActionCreators';
import * as types from './ActionTypes';
import {readFileSync} from 'fs';
import {resolve} from 'path';

/** 
  * @desc Unit Test reddit actions
  * @author Maximiliano Goffman
*/
describe('actions', () => {
  
  it('should return a function with get Top Posts', () => {
    expect(actions.getTopPosts()).toBeDefined()
  })
  it('should return a fetched data action', () => {
    const topJsonString = readFileSync(resolve('./src/top.json')).toString();
    const topReddit = JSON.parse(topJsonString);
    const expectedAction = {
      type: types.REDDIT_FETCHED_DATA,
      list: topReddit.data.list,
      after: topReddit.data.after,
    }
    expect(actions.fetchSuccess(topReddit.data.list, topReddit.data.after)).toEqual(expectedAction)
  })
  it('should return a begin fetch action', () => {
    const expectedAction = {
      type: types.REDDIT_BEGIN_FETCH,
    }
    expect(actions.initFetch()).toEqual(expectedAction)
  })
  it('should return an error fetch action', () => {
    const errMess = "Lorem Ipsum Dolorem...";
    const expectedAction = {
      type: types.REDDIT_ERROR_FETCH,
      error: errMess
    }
    expect(actions.fetchFailed(errMess)).toEqual(expectedAction)
  })
  it('shouldnt be the same item', () => {
    const topJsonString = readFileSync(resolve('./src/top.json')).toString();
    const topReddit = JSON.parse(topJsonString);
    const expectedAction = {
      type: types.REDDIT_SELECT_ITEM,
      item: topReddit.data.children[0]
    }
    expect(actions.selectItem(topReddit.data.children[1])).not.toEqual(expectedAction)
  })
  it('should return select action', () => {
    const topJsonString = readFileSync(resolve('./src/top.json')).toString();
    const topReddit = JSON.parse(topJsonString);
    const expectedAction = {
      type: types.REDDIT_SELECT_ITEM,
      item: topReddit.data.children[0]
    }
    expect(actions.selectItem(topReddit.data.children[0])).toEqual(expectedAction)
  })
  it('should return removing action', () => {
    const topJsonString = readFileSync(resolve('./src/top.json')).toString();
    const topReddit = JSON.parse(topJsonString);
    const expectedAction = {
      type: types.REDDIT_REMOVING_ITEM,
      item: topReddit.data.children[0]
    }
    expect(actions.removingItem(topReddit.data.children[0])).toEqual(expectedAction)
  })
  it('shouldnt return removing action', () => {
    const topJsonString = readFileSync(resolve('./src/top.json')).toString();
    const topReddit = JSON.parse(topJsonString);
    const expectedAction = {
      type: types.REDDIT_REMOVING_ITEM,
      item: topReddit.data.children[0]
    }
    expect(actions.removeItem(topReddit.data.children[0])).not.toEqual(expectedAction)
  })
  it('should return remove action', () => {
    const topJsonString = readFileSync(resolve('./src/top.json')).toString();
    const topReddit = JSON.parse(topJsonString);
    const expectedAction = {
      type: types.REDDIT_REMOVE_ITEM,
      item: topReddit.data.children[0]
    }
    expect(actions.removeItem(topReddit.data.children[0])).toEqual(expectedAction)
  })
  it('should return remove all action', () => {
    const expectedAction = {
      type: types.REDDIT_REMOVE_ALL_ITEMS,
    }
    expect(actions.removeAllItems()).toEqual(expectedAction)
  })
})
