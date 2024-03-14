import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import GameStartScreen from './screens/GameStartScreen';
import { useFonts } from 'expo-font';
import SplashScreen from 'expo-splash-screen'
import AppLoading from 'expo-app-loading';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [roundsNumber,setRoundsNumber]=useState(0)

  const userNumberHandler = (num) => {
    setUserNumber(num)
    setGameIsOver(false)
  }

  const gameOverHandler = () => {
    setGameIsOver(true)
    console.log('Game Over Handler Called');
  }

  const startNewGameHanlder=()=>{
    setUserNumber(null)
    setRoundsNumber(0)
  }

  let Screen = <GameStartScreen onPickNumber={userNumberHandler} />

  if (userNumber) {
    Screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  if (gameIsOver && userNumber) {
    Screen = <GameOverScreen userNumber={userNumber} roundsNumber={roundsNumber} onStartNewGame={startNewGameHanlder} />
  }

  console.log("gameIsOver:", gameIsOver);
  console.log("userNumber:", userNumber);

  const [fontLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!fontLoaded) {
    return <AppLoading />
  }

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
