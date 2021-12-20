import React, {FC, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View, SafeAreaView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import {RootStackParamList} from '../../Main'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import * as actions from '../actions'
import { bindActionCreators, Dispatch} from 'redux'
import { connect } from 'react-redux';
import { allReducersState } from '../reducers';

type PropsNav = NativeStackScreenProps<RootStackParamList,'LoginScreen'>;
type PropsRedux = {
    state: allReducersState,
    dispatchActions:typeof actions
}
type Props = PropsNav & PropsRedux

const LoginScreen:FC<Props> = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let _usernameInput:TextInput|null;
    let _passwordInput:TextInput|null;

    const authenticate = async () => {
        props.dispatchActions.postAuth(username,password)
    }

    const next = () => {
        _passwordInput && _passwordInput.focus();
    };


    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Image
                            style={{width:'100%',height:'40%'}}
                            source = {{uri: "https://placeimg.com/80/80/tech"}}
                        />
                        <View style={styles.errorContainer}>
                            <Text numberOfLines={3}>{ props.state.authReducer.error}</Text>
                        </View>
                        <View>
                            <TextInput placeholder="Username" autoCapitalize="none" style={styles.textInput} 
                                onChangeText = {username => setUsername(username)}
                                value = {username}
                                ref={ref => {_usernameInput = ref}}
                                onSubmitEditing={next}
                            />
                            <TextInput secureTextEntry autoCapitalize="none" placeholder="Password" style={styles.textInput} 
                                onChangeText = {password => setPassword(password)}
                                value = {password}
                                ref={ref => {_passwordInput = ref}}
                                onSubmitEditing = {authenticate}
                            />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button 
                                title = "Submit"
                                onPress ={ () => authenticate()}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state:allReducersState) => {
    return {
        state: state
    }
}

export const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        dispatchActions:bindActionCreators(actions,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    errorContainer: {
        padding:6,
        height:'10%',
        alignItems: "center",
    },
    inner: {
      padding: 12,
      flex: 1,
      justifyContent: "space-around"
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 4
    }
  });
