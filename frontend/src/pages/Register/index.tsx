import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { LeafletMouseEvent } from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';

interface Item {
  idservico: number;
  titulo: string;
  icone: string;
}

interface IBGECITYResponse {
  nome: string;
}

interface IBGEUFResponse {
  sigla: string;
}

const Register: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedUf, setSelectedUf] = useState<string>('')
  const [items, setItems] = useState<Item[]>([])
  const [ufs, setUfs] = useState<string[]>([])
  const [cityes, setCityes] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [formData, setFormData] = useState({
    titulo: '',
    email: '',
    telefone: '',
    cnpj: '',
    responsavel: '',
    tamanho: ''
  })
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [celMask, setCelMask] = useState('')

  const history = useHistory();

  useEffect(() => {
    handleGetItems()
    handleGetUf();
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude])
    })
  }, [])


  async function handleGetItems() {
    try {
      const response = await api.get('https://backend-trecho.herokuapp.com/servico');
      setItems(response.data);
    } catch (err) {
      console.log(err)
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

  async function handleGetCityes(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setSelectedUf(uf)
    try {
      const response = await axios.get<IBGECITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
      const list = response.data.map(city => city.nome);
      setCityes(list);
    } catch (err) {
      console.log(err)
    }
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name !== "telefone") { 
      setFormData({
        ...formData,
        [name]: value
      })
    } else {
      const maskedCel = phoneMask(value)
      setCelMask(maskedCel)
    }
  }


  function phoneMask(phone: string) {
    let length = phone.length;   

    phone = phone.replace(/(\D)/g, '');

    if (length >= 11) phone = phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
    if (length >= 8) phone = phone.replace(/^(\d{2})(\d{1})(\d{4})/, '($1) $2 $3-');
    if (length >= 4) phone = phone.replace(/^(\d{2})(\d{1})/, '($1) $2 ');
    if (length >= 3) phone = phone.replace(/^(\d{2})/, '($1) ');

    return phone;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { 
      titulo, 
      email, 
      telefone, 
      cnpj, 
      tamanho,
      responsavel
    } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;
    const data = {
      titulo,
      email,
      telefone,
      uf,
      city,
      latitude,
      longitude,
      items,
    }
    console.log(data);
    try {
      const response = await api.post('points', data)
      alert('Ponto de Coleta criado com sucesso')
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city)
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logoImg} width={100} alt="Logo" />

        <Link to="/">
          <FiArrowLeft color="#fff" size={18} />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastre seu estabelecimento </h1>
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="name">Nome do local</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="cnpj">Tamanho máximo veículo</label>
              <input
                type="number"
                name="tamanho"
                id="tamanho"
                onChange={handleInputChange}
                placeholder="Em metros"
              />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="telefone">Celular/Whatsapp</label>
              <input
                type="text"
                name="telefone"
                id="telefone"
                value={celMask}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="responsavel">Responsável</label>
              <input
                type="text"
                name="responsavel"
                id="responsavel"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                type="number"
                name="cnpj"
                id="cnpj"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleGetCityes}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleSelectCity}>
                <option value="0">Selecione uma Cidade</option>
                {cityes.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Serviços disponiveis</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items && items.map(item => (
              <li
                key={item.idservico}
                onClick={() => handleSelectItem(item.idservico)}
                className={selectedItems.includes(item.idservico) ? 'selected' : ''}
              >
                <img src={item.icone} alt={item.titulo} width={40} />
                <span>{item.titulo}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">
          Cadastrar ponto
        </button>
      </form>
    </div>
  )
}

export default Register;