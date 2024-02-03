import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import MyTitle from '../components/MyTitle';

const GameScreen = () => {
    return (
        <View style={styles.screen}>
            <MyTitle >Opponent Guess</MyTitle>
            {/* GUESS */}
            <View>
                <Text>Higher or Lower?</Text>
                {/* + - */}
            </View>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 36,
    }
})