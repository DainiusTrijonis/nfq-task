import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Splash Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        alignItems: "center",
        flex:1,
    },
});

export default SplashScreen