import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CreditCardInput } from "react-native-credit-card-input";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

const CreditCard = () => {
  const [card, setCard] = useState({});
  const [valid, setValid] = useState(false);

  const navigation = useNavigation();

  function handleNavigateBack() {
    navigation.goBack();
  }

  const handleOnChange = (formData) => {
    setCard(formData.values);
    setValid(formData.valid);
  };

  async function handleSubmit() {
    if (valid === true) {
      console.log(card)
      setTimeout(() => {
        Alert.alert("Sucesso", "Seu cartão foi salvo");
      }, 2000);
    } else {
      Alert.alert(
        "Atenção",
        "Cartão inválido, verifique as informações digitadas e tente novamente"
      );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleNavigateBack}
            style={{ position: "absolute", left: 20, top: 75 }}
          >
            <Icon name="arrow-left" size={26} color={"#fff"} />
          </TouchableOpacity>
          <Text style={styles.name}> Incluir novo cartão </Text>
        </View>
        <SafeAreaView style={styles.box}>
          <View style={{ width: "100%" }}>
            <Text
             style={{textAlign:"center", fontFamily: "Ubuntu_300Light", padding: 5}}>
                Você ainda não possui nenhum cartão cadastrado
            </Text>
            <CreditCardInput
              autoFocus
              labels={{
                number: "Número Cartão",
                expiry: "Validade",
                cvc: "CVC",
              }}
              placeholders={{
                number: "1234 5678 1234 5678",
                expiry: "MM/AA",
                cvc: "CVC",
              }}
              allowScroll
              cardScale={1.0}
              inputStyle={{width:150}}
              labelStyle={{
                color: "black",
                fontSize: 12,
              }}
              inputStyle={{
                fontSize: 16,
                color: "black",
              }}
              validColor={"green"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              // onFocus={handleOnFocus}
              onChange={handleOnChange}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              justifyContent: "space-between",
            }}
          >
            <RectButton
              style={styles.buttonCancel}
              onPress={handleNavigateBack}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </RectButton>
            <RectButton style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </RectButton>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  menu: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 35,
    marginTop: 30,
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
    height: 150,
  },

  box: {
    justifyContent: "space-around",
    marginHorizontal: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 14,
    marginTop: -30,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 20,
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    fontFamily: "Ubuntu_300Light",
  },

  pointsContainer: {
    marginTop: 32,
  },

  menuContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "column",
  },

  button: {
    backgroundColor: "#3331DD",
    borderRadius: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#E8505B",
    borderRadius: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#fff",
    width: 140,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Ubuntu_700Bold",
  },
});

export default CreditCard;
