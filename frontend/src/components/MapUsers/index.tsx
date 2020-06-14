import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { LeafletMouseEvent } from 'leaflet'
import { Map, TileLayer, Marker } from 'react-leaflet'
import api from '../../services/api';


const MapUsers: React.FC = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude])
    })
  }, [])

  return (
    <Map center={initialPosition} zoom={3} style={{width: '70%', alignSelf: "center", height: 400}}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={initialPosition} />
    </Map>
  )
}

export default MapUsers;