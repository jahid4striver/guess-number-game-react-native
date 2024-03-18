import { View, Image, StyleSheet, Text, Dimensions, useWindowDimensions } from 'react-native';
import MyTitle from '../components/ui/MyTitle';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';

const GameOverScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
    const { width, height } = useWindowDimensions()

    let imageSize = 300

    if (width < 380) {
        imageSize = 150
    }
    if (height < 400) {
        imageSize = 100
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    return (
        <View style={styles.rootContainer}>
            <MyTitle>GAME OVER!</MyTitle>
            <View style={[styles.imageContainer, imageStyle]}>
                <Image style={styles.image} source={require('../assets/images/success.png')} />
            </View>
            <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the <Text style={styles.highlight}>{userNumber}</Text> number</Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    );
};

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})