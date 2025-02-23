import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer';
import { thunk } from 'redux-thunk';
import { DEVELOPMENT } from '../../misc';
import { environment } from '../../../environment';

var store = {};
const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSIONS_COMPOSE || compose;

if (environment === DEVELOPMENT) {
    store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else {
    store = createStore(
        rootReducer,
        composeEnhancer(applyMiddleware(thunk))
    );
};

export default store;