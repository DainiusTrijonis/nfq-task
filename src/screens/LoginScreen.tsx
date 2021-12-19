import React, {FC, useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
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
    const [username, setUsername] = useState('john.doe@nfq.lt');
    const [password, setPassword] = useState('johndoe');


    const authenticate = async () => {
        props.dispatchActions.postAuth(username,password)
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image
                    style={{width:'50%',height:'30%'}}
                    source = {{uri: "https://placeimg.com/80/80/tech"}}
                />
                <View style = {styles.errorContainer}>
                    <Text>{ props.state.authReducer.error}</Text>

                </View>
                <View style = {styles.form}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} autoCapitalize="none" placeholder="Username"
                            onChangeText = {username => setUsername(username)}
                            value = {username}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none" placeholder="Password"
                            onChangeText = {password => setPassword(password)}
                            value = {password}
                        />
                    </View>
                    <Button 
                        title = "Submit"
                        onPress ={ () => authenticate()}
                    />
                </View>
            </View>
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
        marginTop:30,
        alignItems: "center",
    },
    errorContainer: {
        alignItems: "center",
        marginTop:30,
    },
    form: {
        width:'80%',
        marginVertical: '20%',
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        borderRadius: 1,
        height: 45,
        borderWidth: 1,
    },
    input: {
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
});