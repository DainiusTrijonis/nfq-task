import React, { FC, useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen'
import ProfileScreen from './src/screens/ProfileScreen'

import * as actions from './src/actions'

import { connect } from 'react-redux';
import {Dispatch,bindActionCreators} from 'redux'
import { allReducersState } from './src/reducers';
import SplashScreen from './src/screens/SplashScreen';


export type RootStackParamList = {
  LoginScreen: {
    state: allReducersState
    dispatchActions: typeof actions
  };
  ProfileScreen: {
    state: allReducersState
    dispatchActions: typeof actions
  };
};


const RootStack = createNativeStackNavigator<RootStackParamList>();

interface Props {
    state:allReducersState;
    dispatchActions: typeof actions
}
  
const Main:FC<Props> = (props) => {

    useEffect( () => {
        props.dispatchActions.getAuth()
    }, [])

    if(props.state.authReducer.loading) {
        return <SplashScreen/>;
    }
    else {
        
        return (
            <NavigationContainer>
                {props.state.authReducer.auth == null ? (
                    <RootStack.Navigator initialRouteName="LoginScreen" screenOptions = {{headerShown: false}}>
                        <RootStack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{
                          title: 'Login'
                        }}
                        />
                    </RootStack.Navigator>
                ) : (
                    <RootStack.Navigator initialRouteName="LoginScreen" screenOptions = {{headerShown: false}}>
                        <RootStack.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                            options={{title: 'Profile'}}
                        />
                    </RootStack.Navigator>
                )}
            </NavigationContainer>
      );
    }

};


const mapStateToProps = (state:allReducersState) => {
  return {
    state:state
  }
}
export const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    dispatchActions: bindActionCreators(actions,dispatch)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)



//export default Main