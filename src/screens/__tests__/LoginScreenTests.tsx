import React from 'react'
import { act, fireEvent, render, waitFor } from "@testing-library/react-native"
import {useNavigation} from '@react-navigation/native'
import LoginScreen, {Props} from '../../screens/LoginScreen'
import store from '../../store/index'
import { Provider } from 'react-redux';
require('isomorphic-fetch')

jest.mock('@react-navigation/native', () => {
    return {
      createNavigatorFactory: jest.fn(),
      useNavigation: jest.fn(),
    }
  })

jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: jest.fn(),
}))

jest.mock('@react-native-async-storage/async-storage', () => ({

}))

beforeEach(() => {
    // @ts-ignore
    useNavigation.mockReset()
})

it('Test ',async () => {
    // @ts-ignore
    const loginScreenProps:Props = jest.fn();

    const component = (
        <Provider store={store}>
          <LoginScreen {...loginScreenProps} />
        </Provider>
      );

    const { getByPlaceholderText, getByText } = render(component);

    const usernameInput = getByPlaceholderText(/Username/i);
    const passwordInput = getByPlaceholderText(/Password/i);
    
    fireEvent.changeText(usernameInput, 'john.doe@nfq.lt');
    fireEvent.changeText(passwordInput, 'johndoe');

    await act(async () => {
        await waitFor(async () => await fireEvent.press(getByText('Submit')))
        await new Promise((r) => setTimeout(r, 2000));
    })
    
    const authState = store.getState().authReducer;
    console.log(authState)
    console.log(authState.auth? true:false)
    expect(authState.auth? true:false).toBe(true)
})


