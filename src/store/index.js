import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';


const middleware = [thunk];


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    autoRehydrate(),
    applyMiddleware(...middleware),
  )
);

persistStore(store, {
  keyPrefix: 'ReactTabularApp:'
});

export default store;
