import React, { useState, useEffect, ChangeEvent } from 'react'
import Constants from 'expo-constants'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Animated, Picker, AsyncStorage } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import * as Location from 'expo-location'
import { RectButton } from 'react-native-gesture-handler'
import axios from 'axios'



interface IBGECITYResponse {
  nome: string;
}

interface IBGEUFResponse {
  sigla: string;
}


const types = [
  {
    id: 1,
    name: "Descanso",
    image: "descanso.png"
  },
  {
    id: 2,
    name: "Banho",
    image: "banho.png"
  },
]

function Points() {
  const [nome, setNome] = useState('')
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [selectedCity, setSelectedCity] = useState("");
  const [cityes, setCityes] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState("");
  const [ufs, setUfs] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<number[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 90 }));
  const [opacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 2,
        bounciness: 15,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      }),
    ]).start();

    handleGetUf();
    handleLoadPosition();
  }, []) 
  
  const handleShowFilters = () => setFiltersVisible(!filtersVisible)

  async function handleChangeUf(uf: string) {
    setSelectedUf(uf)
    try {
      const response = await axios.get<IBGECITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      // console.log(response.data)
      const list = response.data.map(city => city.nome);
      setCityes(list);
    } catch (err) {
      // console.log(err)
    }
  }

  async function handleGetUf() {
    try {
      const response = await axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    } catch (err) {
      console.log(err)
    }
  }

  const handleShowOptions = () => setOptionsVisible(!optionsVisible)

  function handleSelectType(id: number) {
    const alreadySelected = selectedTypes.findIndex(type => type === id)

    if (alreadySelected >= 0) {
      const filteredTypes = selectedTypes.filter(item => item !== id);
      setSelectedTypes(filteredTypes)
    } else {
      setSelectedTypes([...selectedTypes, id])
    }
  }


  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }


  function handleNavigateToProfile() {
    navigation.navigate('Profile');
  }

  async function handleLoadPosition() {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ooops..', 'Precisamos de sua permissão para obter sua localização')
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;

    console.log(location)
    setInitialPosition([
      latitude,
      longitude
    ])
  }


  function handleNavigateBack() {
    navigation.goBack();
  }


  return (

    <>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (<MapView
            style={styles.map}
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <Marker
              onPress={() => { }}
              coordinate={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
              }}
            >
              <Image
                source={require("../../assets/marker.png")}
              />
            </Marker>
            <Marker
              onPress={() => { }}
              coordinate={{
                latitude: Number(initialPosition[0]?.toFixed(2)),
                longitude: Number(initialPosition[1]?.toFixed(2)),
              }}
            >
              <Image
                source={require("../../assets/markerRed.png")}
              />
            </Marker>

            <Marker
              onPress={() => { }}
              coordinate={{
                latitude: Number(initialPosition[0]?.toFixed(7)),
                longitude: Number(initialPosition[1]?.toFixed(7)),
              }}
            >
              <Image
                source={require("../../assets/markerRed.png")}
              />
            </Marker>
          </MapView>)}
        </View>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleNavigateToProfile} style={styles.headerIcon}>
          <Image source={require("../../assets/user.png")} style={{ width: 30 }} />
        </TouchableOpacity>
      </View>

      {filtersVisible ? (<Animated.View
        style={[
          styles.itemsContainer,
          {
            opacity: opacity,
            transform: [{ translateY: offset.y }],
          },
        ]}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleShowOptions}
            style={{
              marginTop: 10,
              width: 45,
              height: 5,
              backgroundColor: "#2D2ABF",
            }}
          />
        </View>
        <Text style={styles.titleItems}>Pesquisar por:</Text>
        <View style={styles.itemsSubContainer}>
          <TouchableOpacity
            style={[
              styles.itemG,
              selectedTypes.includes(1) ? styles.selectedItem : {}
            ]}
            activeOpacity={0.6}
            onPress={() => handleSelectType(1)}
          >
            <View style={styles.itemContent}>
              <Image source={require("../../assets/descanso.png")} width={50} height={46} />
              <Text style={styles.itemSubtitle}>Descanso</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.itemG,
              selectedTypes.includes(2) ? styles.selectedItem : {}
            ]}
            onPress={() => handleSelectType(2)}
            activeOpacity={0.6}
          >
            <View style={styles.itemContent}>
              <Image source={require("../../assets/banho.png")} width={50} height={46} />
              <Text style={styles.itemSubtitle}>Banho</Text>
            </View>
          </TouchableOpacity>
        </View>


        <View style={styles.itemsSubContainer}>
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(20) ? styles.selectedItem : {}
            ]}
            onPress={() => handleSelectItem(20)}
            activeOpacity={0.6}
          >
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>20</Text>
              <Text style={styles.itemSubtitle}>km</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(50) ? styles.selectedItem : {}
            ]}
            onPress={() => handleSelectItem(50)}
            activeOpacity={0.6}
          >
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>50</Text>
              <Text style={styles.itemSubtitle}>km</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.item,
              selectedItems.includes(100) ? styles.selectedItem : {}
            ]}
            onPress={() => handleSelectItem(100)}
            activeOpacity={0.6}
          >
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>100</Text>
              <Text style={styles.itemSubtitle}>km</Text>
            </View>
          </TouchableOpacity>
        </View>


        {optionsVisible ? (
          <>
            <View style={styles.itemsSubContainer}>
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.includes(200) ? styles.selectedItem : {}
                ]}
                onPress={() => handleSelectItem(200)}
                activeOpacity={0.6}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>200</Text>
                  <Text style={styles.itemSubtitle}>km</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.includes(250) ? styles.selectedItem : {}
                ]}
                onPress={() => handleSelectItem(250)}
                activeOpacity={0.6}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>250</Text>
                  <Text style={styles.itemSubtitle}>km</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.item,
                  selectedItems.includes(500) ? styles.selectedItem : {}
                ]}
                onPress={() => handleSelectItem(500)}
                activeOpacity={0.6}
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>500</Text>
                  <Text style={styles.itemSubtitle}>km</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.titleItems}>Pesquisar no trajeto:</Text>
            <View style={styles.trajetoContent}>
              <View style={styles.trajetoItem}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFB92D' }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.trajetoTxt}>Origem</Text>
                  <Text style={styles.city}>Localização atual</Text>
                </View>
              </View>
              <View style={styles.trajetoItem}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#2D2ABF' }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.trajetoTxt}>Destino</Text>
                  <View style={{ flexDirection: "row", marginTop: -10 }}>
                    <Picker
                      selectedValue={selectedUf}
                      style={{ width: 100 }}
                      onValueChange={(itemValue, itemIndex) => handleChangeUf(itemValue)}
                      itemStyle={{ fontFamily: "Ubuntu_700Bold" }}
                    >
                      <Picker.Item label="UF" value="" />
                      {ufs.map(uf => (
                        <Picker.Item key={uf} label={uf} value={uf} />
                      ))}
                    </Picker>
                    <Picker
                      selectedValue={selectedCity}
                      style={{ width: 150 }}
                      itemStyle={{ fontFamily: "Ubuntu_700Bold" }}
                      onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                    >
                      <Picker.Item label="Cidade destino" value="" />
                      {cityes.map(city => (
                        <Picker.Item key={city} label={city} value={city} />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
            <RectButton style={styles.buttonFilter} onPress={handleShowFilters}>
              <Text style={styles.buttonTextFilter}>Aplicar filtros</Text>
            </RectButton>
          </>
        ) : null}
        <TouchableOpacity onPress={handleShowOptions}>
          <Text style={styles.showOptionsText}>
            {optionsVisible ? "Ocultar opções" : "Ver mais opções"}
          </Text>
        </TouchableOpacity>
      </Animated.View>) : (
          <View style={styles.itemsContainer}>
            <View style={styles.headerList}>
              <Text style={styles.titleItems}>Resultados:</Text>
              <TouchableOpacity
                onPress={() => {
                  handleShowFilters();
                }}
              >
                <Text style={styles.titleItems2}>Limpar filtros</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{ height: 400 }}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Image
                    source={{ uri: "https://i.ibb.co/JHkS1fw/avatar.png" }}
                    style={{ width: 48, height: 48 }}
                  />
                  <View>
                    <Text style={styles.cardTitle}>Posto do Gil</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image source={require("../../assets/star.png")} />
                      <Image source={require("../../assets/star.png")} />
                      <Image source={require("../../assets/star.png")} />
                    </View>
                  </View>
                  <View style={styles.cardPriceBox}>
                    <Image source={require("../../assets/chuveiro.png")} />
                    <Text style={styles.cardPrice}> R$ 6</Text>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardDescription}>Banho: 10 minutos</Text>
                    <Text style={styles.cardDescription}>Caminhão: até 6 metros</Text>
                  </View>
                  <View style={styles.cardIcons}>
                    <Image source={{ uri: "https://i.ibb.co/nQVTCw5/improvement.png" }} style={{ width: 20, height: 20 }} />
                    <Image source={{ uri: "https://i.ibb.co/gPVvfbz/865779.png" }} style={{ width: 20, height: 20, marginLeft: 10 }} />
                    <Image source={{ uri: "https://i.ibb.co/RjBQ093/1760137.png" }} style={{ width: 20, height: 20, marginLeft: 10 }} />
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )
      }
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  containerTrajeto: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  trajetoContent: {
    padding: 5,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 120,
  },
  trajetoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  trajetoTxt: {
    fontSize: 14,
    color: "#959DAD",
  },
  city: {
    fontSize: 19,
    color: "#454F63",
    fontFamily: "Ubuntu_700Bold",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: 50,
    height: 50,
    top: 20 + Constants.statusBarHeight,
    position: "absolute",
    right: 20,
    borderRadius: 25,
    backgroundColor: "#ffb92d",
    shadowColor: '#000',
    borderWidth: 4,
    borderColor: "#fff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 50
  },
  headerIcon: {
    flexDirection: "column-reverse",
    borderRadius: 50,
    padding: 3,
  },
  headerText: {
    alignContent: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: 'Ubuntu_700Bold',
  },

  description: {
    color: '#3331DD',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  itemsSubContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  itemsContainer: {
    backgroundColor: "#3331DD",
    padding: 5,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },

  item: {
    backgroundColor: '#2D2ABF',
    height: 80,
    width: 100,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  itemG: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: '#2D2ABF',
    height: 100,
    width: 160,
    borderRadius: 8,
  },

  selectedItem: {
    backgroundColor: '#dd6163',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    fontSize: 28,
    color: "#fff",
  },
  titleItems: {
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: "#fff",
  },
  titleItems2: {
    fontFamily: 'Ubuntu_700Bold',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: "#55ADFA",
  },
  itemSubtitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 15,
    color: "#fff",
    marginTop: 5,
  },
  showOptionsText: {
    padding: 15,
    textAlign: 'center',
    color: '#55ADFA',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 18,
  },
  buttonFilter: {
    backgroundColor: '#FFB92D',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 15,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonTextFilter: {
    marginLeft: 8,
    color: '#3331DD',
    width: 140,
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'Ubuntu_700Bold',
  },
  headerList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },

  card: {
    backgroundColor: "#fff",
    height: 130,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    marginTop: 10
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardTitle: {
    fontFamily: "Ubuntu_700Bold",
    fontSize: 20,
  },
  cardPriceBox: {
    flexDirection: "row",
  },
  cardPrice: {
    fontFamily: "Ubuntu_700Bold",
    fontSize: 20,
    color: "#3331DD"
  },
  cardFooter: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDescription: {
    fontFamily: "Ubuntu_300Light",
    color: "#909090",
    fontSize: 14
  }
});

export default Points;