import {Auth} from '../reducers/auth'
import {User} from '../reducers/user'


async function request<TResponse>(
    url: string,
    config: RequestInit
): Promise<TResponse> {
    const response = await fetch(url, config);
    if(response.ok) {
        return await response.json();
    } else {
        throw new Error(`${response.status}`)
    }
}

export type ApiClient = {
    postAuth: (username:string, password:string) => Promise<Auth>
    getUser: (authTokens:Auth) => Promise<User>
}

export const createApiClient = (): ApiClient => {
    return {
        postAuth: async (username, password) => {
            try {
                return await request<Auth>('https://vidqjclbhmef.herokuapp.com/credentials', {
                method: 'Post',
                credentials:'include',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${username}&password=${password}`
                });
            } catch (error) {
                if("Error: 401" === `${error}` ) {
                    throw new Error('Failure. Incorrect credentials provided or missing form field.')
                } else {
                    throw new Error(`${error}`)
                }
            }
        },
        getUser: async (authTokens) => {
            try {
                return await request<User>('https://vidqjclbhmef.herokuapp.com/user', {
                    method: 'Get',
                    headers: {
                        Accept: '*/*',
                        authorization: authTokens.token,
                   },
                })
            } catch (error) {
                if("Error: 401" === `${error}` ) {
                    throw new Error(`Invalid token - Unauthorised`)
                } else {
                    throw new Error(`${error}`)
                }
            }
        },
    }
}