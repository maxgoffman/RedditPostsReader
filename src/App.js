/** 
  * @desc Application component: starts react, redux store and react router
  * @author Maximiliano Goffman maxgoffman@gmail.com
  * @required react react-router-dom react-redux ...
*/
import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
import Main from './components/MainComponent';
import './App.scss';

//starts redux store
const store = ConfigureStore();

//Wraps main component with redux and react router
function App() {
  return (
    <Provider store={store}>
      <div className="App container-fluid px-0">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
