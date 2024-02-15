import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import MyTitle from '../components/ui/MyTitle';
import PrimaryButton from '../components/ui/PrimaryButton';



const GameScreen = ({ userNumber }) => {
    const [minBoundary, setMinBoundary] = useState(1);
    const [maxBoundary, setMaxBoundary] = useState(100);

    function generateRandomBetween(min, max, exclude) {
        const rndNum = Math.floor(Math.random() * (max - min)) + min;

        if (rndNum === exclude) {
            return generateRandomBetween(min, max, exclude);
        } else {
            return rndNum;
        }
    }

    // let minBoundary = 1;
    // let maxBoundary = 100;

    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const nextGuessHandler = (direction) => {

        console.log("Direction:", direction);
        console.log("Current Guess:", currentGuess);
        console.log("User Number:", userNumber);
        console.log("Min Boundary:", minBoundary);
        console.log("Max Boundary:", maxBoundary);

        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't lie", "you know this is wrong", [{ text: 'Sorry!', style: 'cancel' }]);
            return
        }

        if (direction === 'lower') {
            setMaxBoundary(currentGuess);
        } else {
            setMinBoundary(currentGuess + 1);
        }

        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        console.log("New Random Number:", newRndNumber);
    }

    return (
        <View style={styles.screen}>
            <MyTitle >Opponent Guess</MyTitle>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or Lower?</Text>
                <View>
                    <PrimaryButton onPress={() => nextGuessHandler('lower')}>-</PrimaryButton>
                    <PrimaryButton onPress={() => nextGuessHandler('greater')}>+</PrimaryButton>
                </View>
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