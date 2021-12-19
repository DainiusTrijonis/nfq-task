import { SET_AUTH, POST_AUTH_FAILURE, LOGOUT_DISPATCH } from '../actions/actionTypes'
export interface Auth {
    token:string,
    refreshToken:string,
}
export interface AuthState {
    auth:Auth | null,
    loading:boolean,
    error: string | null
}

const INITIALSTATE:AuthState = {
    auth: null,
    loading: true,
    error: null,
}

export const authReducer = (state = INITIALSTATE, action: { type: string, payload: AuthState}) => {
    switch(action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: action.payload.auth,
                loading: false,
                error: null,
            }
        case POST_AUTH_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}

export type authReducerType = ReturnType<typeof authReducer>