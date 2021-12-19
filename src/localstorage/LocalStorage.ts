import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth} from '../reducers/auth'

export type LocalStorageClient = {
    setTokens: (tokens:Auth) => Promise<boolean>
    getTokens: () => Promise<Auth | null>
    deleteTokens: () => Promise<boolean>
}

export const createLocalStorageClient = (): LocalStorageClient => {
    return {
        setTokens: async (tokens) => {
            return AsyncStorage.setItem('tokens',JSON.stringify(tokens)).then(() => {
                return true;
            }).catch((error) => {
                throw new Error(`Failure setting token in local storage error = ${error}`)
            })
        },
        getTokens: async () => {
            return AsyncStorage.getItem('tokens').then((str) => {
                if(str) {
                    let tokens:Auth;
                    tokens = JSON.parse(str)
                    return tokens
                } else {
                    return null
                }
            }).catch((error) => {
                throw new Error(`Failure getting token in local storage error = ${error}`)
            })
        },
        deleteTokens: async () => {
            return AsyncStorage.removeItem('tokens').then(() => {
                return true
            }).catch((error) => {
                throw new Error(`Failure deleting token in local storage error = ${error}`)
            })
        }
    }
}