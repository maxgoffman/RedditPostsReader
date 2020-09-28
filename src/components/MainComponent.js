import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { getTopPosts, selectItem, removingItem, removeItem, removeAllItems } from '../redux/reddit/ActionCreators';
import { Loading } from './controls/loadplaceholder/LoadingComponent';
import RedditPostsListComponent from './RedditPostsListComponent';
import RedditPostDetailsComponent from './RedditPostDetailsComponent';

/** 
  * @desc Main react component:
  * it'll handle initial data fetching
  * Using React.memo to avoid needless re renders
  * Added redux hooks useSelector and useDispatch
  * It allows to avoid mapStateToProps and
  * mapDispatchToProps
  * simplifying the Virtual Dom hierarchy because
  * that way Redux doesn't use the connect 
  * wrapping component.
  * @author Maximiliano Goffman
  * @required react react-router-dom react-redux ...
*/
const Main = React.memo( (props) => {
  const reduxProps = useSelector(state => ({
    nextPage:state.Reddit.after,
    list:state.Reddit.list,
    itemSelected:state.Reddit.selectedItem,
    loading:state.Reddit.isLoading,
    redditErrMess:state.Reddit.errMess,
  }), shallowEqual);
  const dispatch = useDispatch();
  const [didMount, updateDidMount] = useState(false);
  useEffect(() => {
    if (!didMount) {
      updateDidMount(true);
      dispatch(getTopPosts());
    }
    
  }, [didMount, dispatch]);
  
  const toggleRedditPostDetails = (item) => {
    dispatch(selectItem(item));
  };

  const startRemovePost = (item) => {
    dispatch(removingItem(item));
  };
  const removePost = (item) => {
    dispatch(removeItem(item));
  };
  const removeAllPosts = () => {
    dispatch(removeAllItems());
  };
  const nextPosts = () => {
    dispatch(getTopPosts(reduxProps.nextPage));
  };

  const mainScreen = () => {
    if (reduxProps.loading && !reduxProps.list) {
      return(
          <Row>    
              <Loading />
          </Row>
      );
    }
    else {
      return (
        <Row>
          <RedditPostsListComponent 
            postList={reduxProps.list} 
            toggleRedditPostDetails={toggleRedditPostDetails}
            startRemovePost={startRemovePost}
            removePost={removePost} 
            removeAllPosts={removeAllPosts}
            morePosts={nextPosts}
            loading={reduxProps.loading} 
          />
          <RedditPostDetailsComponent itemSelected={reduxProps.itemSelected} />
        </Row>
      );
    }
  }; 

  //render main
  return (
      <React.Fragment>{mainScreen()}</React.Fragment>
    );
  });
  
  export default Main;