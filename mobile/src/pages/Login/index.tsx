import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, TextInput, Alert, AsyncStorage, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'

function Login() {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  async function handleSubmit() {
    try {
      const response = await api.post('login', {
        celular: telefone,
        senha
      })
      console.log(response.data)
      const { idusuario, nome, celular } = response.data[0]
      // await AsyncStorage.setItem('idusuario', idusuario)
      await AsyncStorage.setItem('nome', nome)
      await AsyncStorage.setItem('celular', celular)
      navigation.navigate('Points')
    } catch (err) {
      Alert.alert('Atenção', 'Usuário não encontrado')
      console.log(err)
      //
    }
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNavigateBack} style={{ position: "absolute", left: 20, top: 75 }}>
            <Icon name="arrow-left" size={26} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.name}> Acessar o aplicativo </Text>
        </View>
        <SafeAreaView style={styles.box}>
          <View style={{ width: '100%' }}>
          
            <Image source={require("../../assets/logoG.png")} style={{alignSelf:"center", width: 200, height: 200}} />

            <View style={{marginTop:30}} />
            <TextInput
              style={styles.input}
              onChangeText={text => setTelefone(text)}
              placeholder="Digite seu telefone com DDD"
              value={telefone}
            />
            <TextInput
              style={styles.input}
              onChangeText={text => setSenha(text)}
              secureTextEntry={true}
              autoCorrect={false}
              placeholder="Digite sua senha"
              value={senha}
            />
          </View>
          <View style={{ alignItems: "center", paddingTop: 20, justifyContent: "space-between" }}>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Entrar</Text>
            </RectButton>
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  menu: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    marginHorizontal: 35,
    marginTop: 30
  },

  menuText: {
    fontSize: 19,
    color: "#3B3B3B",
    fontFamily: "Ubuntu_400Regular",
  },

  header: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3331DD",
    height: 150
  },

  box: {
    justifyContent: "space-around",
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    marginTop: -30,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 20
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  name: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    textAlign: "center"
  },


  subtitle: {
    fontSize: 18,
    fontFamily: 'Ubuntu_300Light',
  },

  pointsContainer: {
    marginTop: 32,
  },

  menuContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'column',
  },

  button: {
    backgroundColor: '#3331DD',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    backgroundColor: '#E8505B',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 8,
    color: '#fff',
    width: 140,
    textAlign: "center",
    fontSize: 14,
    fontFamily: 'Ubuntu_700Bold',
  },
});

export default Login;