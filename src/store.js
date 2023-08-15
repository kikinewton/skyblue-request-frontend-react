import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootReducer from './services/redux/root-reducer';
import rootSaga from './services/sagas';

// logger middleware 
const logger = createLogger();

function isDev() {
  return process.env.NODE_ENV === 'development';
}
// saga middleware
const sagaMiddleware = createSagaMiddleware()

//only apply logger middleware on development mode 
const middlewares = [sagaMiddleware, isDev() && logger].filter(Boolean);

// mount it on the Store
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

sagaMiddleware.run(rootSaga);

export default store;