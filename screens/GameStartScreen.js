import { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import MyTitle from '../components/ui/MyTitle';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

const GameStartScreen = ({ onPickNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState('');

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText)
    }

    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredNumber);

        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            //alert
            Alert.alert(
                'Invalid Number!',
                'Number has to be number between 1 anb 99',
                [{ text: 'Okay', style: 'destructive', onPress: () => setEnteredNumber('') }]
            )
            return
        }
        onPickNumber(choosenNumber)
    }
    return (
        <View style={styles.rootContainer}>
            <MyTitle>Guess My Number</MyTitle>
            <Card>
                <InstructionText >Enter a Number</InstructionText>
                <TextInput style={styles.numberInput} maxLength={2} keyboardType='number-pad'
                    autoCapitalize='none' autoCorrect={false} value={enteredNumber} onChangeText={numberInputHandler} />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => setEnteredNumber('')}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default GameStartScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center'
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})