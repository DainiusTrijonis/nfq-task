import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { userReducer } from './user'
export const allReducers = combineReducers({
    authReducer: authReducer,
    userReducer: userReducer
})

export type allReducersState = ReturnType<typeof allReducers>