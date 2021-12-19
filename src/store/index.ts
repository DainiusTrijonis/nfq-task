import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {allReducers} from '../reducers/index'
import thunkMiddleware from 'redux-thunk'



const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
)

export default store


