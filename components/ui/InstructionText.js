import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const InstructionText = ({ children, style }) => {
    return (
        <Text style={[styles.inputInstruction, style]}>
            {children}
        </Text>
    );
};

export default InstructionText;

const styles = StyleSheet.create({
    inputInstruction: {
        color: Colors.accent500,
        fontSize: 24,
        fontFamily:'open-sans',
    },
})