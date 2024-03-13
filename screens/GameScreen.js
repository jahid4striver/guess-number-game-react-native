import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import MyTitle from '../components/ui/MyTitle';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Ionicons } from '@expo/vector-icons'



const GameScreen = ({ userNumber, onGameOver }) => {
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



    const initialGuess = generateRandomBetween(1, 100, userNumber)
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

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
            console.log("Game over");
        }
    }, [currentGuess, userNumber, onGameOver])

    return (
        <View style={styles.screen}>
            <MyTitle >Opponent Guess</MyTitle>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.InstructionText}>Higher or Lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name="remove" size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('greater')}> <Ionicons name="add" size={24} color='white' /></PrimaryButton>
                    </View>

                </View>
            </Card>
            {/* <View>LOG ROUNDS</View> */}
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 36,
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    InstructionText: {
        marginBottom: 12
    }
})