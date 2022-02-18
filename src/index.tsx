import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import ReduxThunk from 'redux-thunk';
import Cookies from 'js-cookie';
import { setAccessToken, checkMyInfoThunk } from './modules/auth';
import client from './lib/client';
import 'bootstrap/dist/css/bootstrap.css';
import { configureStore } from '@reduxjs/toolkit';

//const sagaMiddleware = createSagaMiddleware();

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(ReduxThunk))
// );
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(), //기본 미들웨어 사용하기
  devTools: process.env.NODE_ENV !== 'production',
});

function loadUser() {
  try {
    const savedToken = Cookies.get('accessToken');

    if (!savedToken) return;

    store.dispatch(setAccessToken(savedToken));

    client.defaults.headers.common.Authorization = `Bearer ${savedToken}`;

    store.dispatch<any>(checkMyInfoThunk());
  } catch (e) {
    console.log(e);
  }
}

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
