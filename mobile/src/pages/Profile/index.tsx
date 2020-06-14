import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Linking, Alert, AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'
import * as  MailComposer from 'expo-mail-composer'

function Profile() {
  const [nome, setNome] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    handleGetUserInfo()
  }, [])

  async function handleGetUserInfo() {
    const nome = await AsyncStorage.getItem('nome')
    // const celular = await AsyncStorage.getItem('celular')
    // const idusuario = await AsyncStorage.getItem('idusuario')
    if (nome) {
      setNome(nome)
    } else {
      handleNavigateToHome()
    }
  }

  function handleNavigateBack() {
    navigation.goBack();
  }
  function handleNavigateToHome() {
    navigation.navigate('Home');
  }
  function handleNavigateToCards() {
    navigation.navigate('CreditCard');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNavigateBack} style={{ position: "absolute", left: 20, top: 50 }}>
            <Icon name="arrow-left" size={26} color="#fff" />
          </TouchableOpacity>
          <View
            style={styles.userImg}
          >
            <Image
              source={require("../../assets/user.png")}
            />
          </View>
          <Text style={styles.name}>{nome}</Text>
        </View>
        <View style={styles.boxPoints}>
          <View>
            <Text style={styles.title}> 800 </Text>
            <Text style={styles.subtitle}> PONTOS </Text>
          </View>
          <RectButton style={styles.button} onPress={() => Alert.alert("Atenção", "Funcionalidade em desenvolvimento")}>
            <Text style={styles.buttonText}>Trocar pontos</Text>
          </RectButton>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => { }} style={styles.menu}>
            <FontAwesome name="list-alt" size={19} style={{ width: 30 }} color="#3331DD" />
            <Text style={styles.menuText}> Históricos </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToCards} style={styles.menu}>
            <FontAwesome name="money" size={19} style={{ width: 30 }} color="#3331DD" />
            <Text style={styles.menuText}> Forma de pagamento </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} style={styles.menu}>
            <FontAwesome name="user" size={19} style={{ width: 30 }} color="#3331DD" />
            <Text style={styles.menuText}> Convidar amigos </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }} style={styles.menu}>
            <FontAwesome name="clipboard" size={19} style={{ width: 30 }} color="#3331DD" />
            <Text style={styles.menuText}> Políticas </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigateToHome} style={styles.menu}>
            <FontAwesome name="power-off" size={19} style={{ width: 30 }} color="#3331DD" />
            <Text style={styles.menuText}> Sair </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    height: 300
  },

  boxPoints: {
    justifyContent: "space-around",
    marginHorizontal: 40,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    marginTop: -45,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 20
  },

  userImg: {
    borderRadius: 50,
    marginTop: 32,
    padding: 20,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#FFB92D",
  },

  name: {
    color: '#fff',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
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
    backgroundColor: '#FFB92D',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#3331DD',
    width: 140,
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
  },
});

export default Profile;