import { View, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const GameStartScreen = () => {
    return (
        <View>
            <TextInput />
            <PrimaryButton>Reset</PrimaryButton>
            <PrimaryButton>Confirm</PrimaryButton>
        </View>
    );
};

export default GameStartScreen;