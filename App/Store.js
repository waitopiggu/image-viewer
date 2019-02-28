import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createElectronStorage from 'redux-persist-electron-storage';
import ElectronStore from 'electron-store';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

const electronStore = new ElectronStore();

const persistConfig = {
  key: 'root',
  storage: createElectronStorage({ electronStore }),
  blacklist: ['file', 'files'],
};

const sagaMiddleware = createSagaMiddleware();

const enhancers = [
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

const store = createStore(
  persistReducer(persistConfig, reducer),
  compose(...enhancers),
);

const persistor = persistStore(store);

sagaMiddleware.run(saga);

/**
 * Store Component
 * @param {any} props
 */
export default ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
