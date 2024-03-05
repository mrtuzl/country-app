import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS dosyasını ekleyin
import { FaMapMarkerAlt } from "react-icons/fa";
import { Icon } from 'leaflet';

const Map = (props) => {
  const initialCoordinates = [39.9334, 32.8597]; // Türkiye'nin koordinatları
  const [coordinates, setCoordinates] = useState(initialCoordinates);


  useEffect(() => {
   
    const osmLink = props.map;
    const relationId = osmLink.split('/').pop();
    const apiUrl = `https://api.openstreetmap.org/api/0.6/relation/${relationId}/full`;

    fetch(apiUrl)
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const node = xmlDoc.querySelector('node');
        const lat = parseFloat(node.getAttribute('lat'));
        const lon = parseFloat(node.getAttribute('lon'));
        setCoordinates([lat, lon]);
      })
  }, []);

  const customIcon = new Icon({
    iconUrl: "https://cdn0.iconfinder.com/data/icons/map-location-solid-style/91/Map_-_Location_Solid_Style_01-256.png",
    iconSize:[38,38]
  });

  return (
    <MapContainer center={coordinates} zoom={2} className="map border border-secondary-subtle border-1 shadow-sm ">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} icon={customIcon}/>
    
    </MapContainer>
  );
};

export default Map;