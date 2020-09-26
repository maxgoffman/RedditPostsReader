import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Row } from 'reactstrap';
import { getTopPosts } from '../redux/reddit/ActionCreators';
import { Loading } from './controls/loadplaceholder/LoadingComponent';

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
    list:state.Reddit.list,
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
  
  const mainScreen = () => {
    if (reduxProps.loading) {
      return(
          <Row>    
              <Loading />
          </Row>
      );
    }
    else {
      return (
        <Row>
          {
            //Print Reddit list data to check it's working
            JSON.stringify(reduxProps.list)
          }
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