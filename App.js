import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import GameStartScreen from './screens/GameStartScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  const userNumberHandler = (num) => {
    setUserNumber(num)
    setGameIsOver(false)
  }

  const gameOverHandler = () => {
    setGameIsOver(true)
    console.log('Game Over Handler Called');
  }

  let Screen = <GameStartScreen onPickNumber={userNumberHandler} />

  if (userNumber) {
    Screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    Screen = <GameOverScreen />
  }

  console.log("gameIsOver:", gameIsOver);
  console.log("userNumber:", userNumber);


  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootContainer}>
      <ImageBackground source={require('./assets/images/background.png')}
        style={styles.rootContainer}
        resizeMode='cover' imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootContainer}>
          {Screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  }
});
