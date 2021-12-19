import React, { FC, useEffect,  useState} from 'react';
import {Button, Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../../Main'
import { NativeStackScreenProps} from '@react-navigation/native-stack';
import { allReducersState } from '../reducers/index'
import * as actions from '../actions'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch} from 'redux'

type PropsNav = NativeStackScreenProps<RootStackParamList,'ProfileScreen'>;
type PropsRedux = {
    state: allReducersState,
    dispatchActions:typeof actions
}
type Props = PropsNav & PropsRedux


const ProfileScreen:FC<Props> = (props) => {

    useEffect( () => {
        getUser()
    }, [])


    const getUser = () => {
        if(props.state.authReducer.auth)
            props.dispatchActions.getUser(props.state.authReducer.auth)
    }
    const logout = () => {
        props.dispatchActions.logout()
    }

    const renderProfileInfo = () => {
        const userObj = props.state.userReducer.user
        if(userObj) {
            return (
                <View style={styles.profileContainer}>
                    <Image                  
                        style={{height:'70%', width:'90%'}}
                        source = {{uri: userObj.image}}
                    />
                    <Text style={styles.text}>{userObj.firstName} {userObj.lastName}</Text>
                    <Text style={styles.text}>{userObj.address}</Text>
                    <Text style={styles.text}>{userObj.phone} </Text>
                 </View>
            )
        }
        else if (props.state.userReducer.error != '' && !props.state.userReducer.user) {
            return (
                <View style={styles.profileContainer}>
                    <Text> {props.state.userReducer.error}</Text>
                </View>
            )
        }
        else {
            return (
                <View>

                </View>
            )
        }
    }

    const renderLoading = () => {
        return (
            <View>
                <Text> Loading..</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <View style= {styles.container}>
                <View style={styles.header}>
                    <View style={styles.logoutButton}>
                        <Button
                            title = "Logout"
                            onPress ={ logout }
                        />
                    </View>
                </View>
                { !props.state.userReducer.loading ? renderProfileInfo(): renderLoading() }
            </View>
        </SafeAreaView>
    )
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
export default connect(mapStateToProps,mapDispatchToProps)(ProfileScreen)


const styles = StyleSheet.create({
    container: {
        width: '100%',

    },
    header: {
        borderBottomWidth:1,
    },
    logoutButton: {
        padding: 10,
        width: '30%', 
        alignSelf:'flex-end',
    },
    profileContainer: {
        marginTop:10,
        alignItems: "center",

    },
    picture:{
        flex:1,
    },
    text: {
        color:'#333333',
        padding: 5,
    }

});

