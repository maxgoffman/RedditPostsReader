import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Reddit } from './reddit/reducers/Reddit';

import thunk from 'redux-thunk';

/**
 * Create Redux Store
 */
export const ConfigureStore = () => {
    const store = createStore(
        //I've been researching Reddit Api for this, and I plan
        //to expand the features beyond this simple test protoype
        //adding a backend that interacts with a reddit app
        //So, I'm going to use combineReducers, because I plan
        //to add more reducers in the near future even though it's
        //not necessary for this simple test
        combineReducers({
            Reddit
        }),
        applyMiddleware(thunk)
    );
    
    return store;
}