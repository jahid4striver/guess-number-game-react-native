import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import MyTitle from '../components/ui/MyTitle';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem';



const GameScreen = ({ userNumber, onGameOver }) => {
    const [minBoundary, setMinBoundary] = useState(1);
    const [maxBoundary, setMaxBoundary] = useState(100);

    const { width, height } = useWindowDimensions()

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
    const [guessRounds, setGuessRounds] = useState([initialGuess])


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
        setGuessRounds((preGuessRounds) => [newRndNumber, ...preGuessRounds])
        console.log("New Random Number:", newRndNumber);
    }

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds)
            console.log("Game over");
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        setMinBoundary(1)
        setMaxBoundary(100)
    }, [])

    const guessRoundsLength = guessRounds.length;

    let content = <>
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
        </Card></>

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                            <Ionicons name="remove" size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler('greater')}> <Ionicons name="add" size={24} color='white' /></PrimaryButton>
                    </View>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <MyTitle >Opponent Guess</MyTitle>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds?.map((gr) => <Text key={gr}>{gr}</Text>)} */}
                <FlatList data={guessRounds} renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsLength - itemData.index} guess={itemData.item} />}
                    keyExtractor={(item) => item} />
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 36,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    InstructionText: {
        marginBottom: 12
    },
    buttonContainerWide:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})