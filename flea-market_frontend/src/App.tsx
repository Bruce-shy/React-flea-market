import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from './routes/index';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          {/* <IconStyle/> */}
          { renderRoutes(routes) }
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
