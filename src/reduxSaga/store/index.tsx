import {createStore, applyMiddleware} from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from '../reducers/Customer/reducers';
import rootsaga from '../saga/Auth';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

//@ts-ignore
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

export const persistor = persistStore(store);

sagaMiddleware.run(rootsaga);
