import * as actionTypes from './actionTypes'
import {Dispatch} from 'redux'
import {Auth, AuthState} from '../reducers/auth'
import {User, UserState} from '../reducers/user'
import {createApiClient} from '../api/API'
import { createLocalStorageClient } from '../localstorage/LocalStorage'

const api = createApiClient()
const storage = createLocalStorageClient();

export function postAuth(username:string, password:string) {
    return async function(dispatch:Dispatch) {
        try {
            const tokens = await api.postAuth(username,password)
            dispatch(setAuth({auth:tokens,loading:false,error:null}))
            await storage.setTokens(tokens)
        } catch(error) {
            const strError = `${error}`
            dispatch(postAuthFailure({auth:null,loading:false,error:strError}))
        }
    }
}

export function getAuth() {
    return async function(dispatch:Dispatch) {
        try {
            const tokens = await storage.getTokens()
            dispatch(setAuth({auth:tokens,loading:false,error:null})) 
        } catch(error) {
            const strError = `Error recieving from local storage auth tokens ${error}`
            dispatch(setAuth({auth:null,loading:false,error:strError}))
        }
    }
}

export function logout() {
    return async function(dispatch:Dispatch) {
        logoutFunction(dispatch)
    }
}


async function logoutFunction(dispatch:Dispatch) {
    try {
        if(await storage.deleteTokens())
        dispatch(setAuth({auth:null,error:null,loading:false}))
    } catch(error) {
        const strError = `Couldn't logout succesfully =  ${error}`
        dispatch(setAuth({auth:null,error:strError,loading:false}))
    }

}

export function getUser(auth:Auth) {
    return async function(dispatch:Dispatch) {
        try {
            const user = await api.getUser(auth)
            dispatch(setUser({user:user,loading:false, error:null}))
        } catch(error) {
            console.log(`${error}`)
            if(`Error: Invalid token - Unauthorised` == `${error}`) {
                logoutFunction(dispatch)
            }
            else {
                const strError = `${error}`
                dispatch(getUserFailure({user:null,loading:false,error:strError}))
            }
        }
    }
}

function setAuth(data:AuthState) {
    return {
        type: actionTypes.SET_AUTH,
        payload: data,
    }
}
function postAuthFailure(data:AuthState) {
    return {
        type: actionTypes.POST_AUTH_FAILURE,
        payload: data,
    }
}

function setUser(data:UserState) {
    return {
        type: actionTypes.SET_USER,
        payload: data,
    }
}
function getUserFailure(data:UserState) {
    return {
        type: actionTypes.GET_USER_FAILURE,
        payload: data,
    }
}

