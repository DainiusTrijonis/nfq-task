import {SET_USER, GET_USER_FAILURE} from '../actions/actionTypes'


export interface User {
    uuid: string,
    image: string,
    firstName: string,
    lastName: string,
    address: string,
    phone: string
}
export interface UserState {
    user:User | null,
    loading:boolean,
    error: string | null
}

const INITIALSTATE:UserState = {
    user: null,
    loading: true,
    error: null,
}

export const userReducer = (state = INITIALSTATE, action: { type: string, payload: UserState}) => {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user,
                loading: false,
            }
        case GET_USER_FAILURE:
            return {
                ...state,
                loading:false,
                user:null,
                error:action.payload.error
            }
        default:
            return state
    }
}

export type userReducerType = ReturnType<typeof userReducer>