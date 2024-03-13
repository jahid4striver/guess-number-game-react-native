import { View,StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

const Card = ({ children }) => {
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        marginHorizontal: 24,
        marginTop: 36,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        // shadow
        elevation: 4,
        // shadow for ios
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    }
})