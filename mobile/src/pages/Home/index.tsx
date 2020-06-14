import React from 'react';
import { View, ImageBackground, Text, Image, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


const Home = () => {
  const navigation = useNavigation();

  function handleNavigateToLogin() {
    navigation.navigate('Login')
  }
  function handleNavigateToRegister() {
    navigation.navigate('Register')
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} width={240} height={340} />
        <Text style={styles.title}>
          PARADA
        </Text>
        <Text style={styles.subtitle}>
          banho
          <Text style={{ color: "#fff" }}>{`&`}</Text>
          descanso
        </Text>
        <RectButton style={styles.button} onPress={handleNavigateToLogin}>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
        <RectButton style={styles.button2} onPress={handleNavigateToRegister}>
          <Text style={styles.buttonText}>
            Cadastrar
          </Text>
        </RectButton>
        <Image source={require("../../assets/ccr.png")} style={{ marginTop: 80 }} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 60,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 10,
    textAlign: "center",
    color: '#fff'
  },
  subtitle: {
    color: '#55ADFA',
    fontSize: 32,
    fontFamily: 'Ubuntu_300Light',
    maxWidth: 260,
    textAlign: "center",
  },

  description: {
    color: '#6C6C80',
    fontSize: 40,
    marginTop: 16,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    lineHeight: 24,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "#3331dde0",
    width: "100%"
  },

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#E8505B',
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    width: "70%",
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 50,
  },
  button2: {
    width: "70%",
    backgroundColor: '#2D2ABF',
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 18,
  }
});

export default Home;