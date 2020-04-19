import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import api from '../../services/api';

import Header from '../../Components/HeaderSystem'

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVzaWduZmlzY2hlciIsImEiOiJjazhuZWk4Z28wdDc1M21wczExbzRkaGZkIn0.JrFY7DZmu_I2AdAd2OqNXw'; 

export default function Mapa() {  

    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 10,
        bearing: 0,
        pitch: 0
    });  
    
    const [usersSaudavel, setUsersSaudavel] = useState([]);
    const [usersSuspeito, setUsersSuspeito] = useState([]);
    const [usersConfirmado, setUsersConfirmado] = useState([]);

    const [userDetail, setUserDetail] = useState(null);
    
    //Colocar o mapa na posição atual
    useEffect(() => {
        async function loadInitialPosition() {
          navigator.geolocation.getCurrentPosition(
            (position) => {          
              const { latitude, longitude } = position.coords;
    
              setViewport({
                latitude,
                longitude,
                zoom: 15,
              })
            },
            (err) => {
              console.log(err);
            },
            {
              timeout: 10000,
            }
          )
        }
    
        loadInitialPosition();
    }, []);
    
    async function loadUsers() {
        const { latitude, longitude } = viewport;
    
        const responseSaudavel = await api.get('/search', {
          params: {
            latitude,
            longitude,
            status: "saudável",
          }
        })    
    
        const responseSuspeito = await api.get('/search', {
          params: {
            latitude,
            longitude,
            status: "suspeito",
          }
        })
    
        const responseConfirmado = await api.get('/search', {
          params: {
            latitude,
            longitude,
            status: "confirmado",
          }
        })
        
    setUsersSaudavel(responseSaudavel.data.users);
    setUsersSuspeito(responseSuspeito.data.users);
    setUsersConfirmado(responseConfirmado.data.users);
    }
    
    loadUsers();

    return (
        <>  
        <Header />      
        <Map
        {...viewport}
        width="100vw"
        height="90vh"      
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        >
        {usersSaudavel.map(user => (
            <Marker key={user._id} latitude={user.location.coordinates[1]} longitude={user.location.coordinates[0]}>
            <button className="marcador-saudavel" onClick={(e) => {
              e.preventDefault();
              setUserDetail(user)
            }}
            />               
            </ Marker>
        ))}
        {usersSuspeito.map(user => (
            <Marker key={user._id} latitude={user.location.coordinates[1]} longitude={user.location.coordinates[0]}>
            <button className="marcador-suspeito" onClick={(e) => {
              e.preventDefault();
              setUserDetail(user)
            }}
            />               
            </ Marker>
        ))}
        {usersConfirmado.map(user => (
            <Marker key={user._id} latitude={user.location.coordinates[1]} longitude={user.location.coordinates[0]}>
            <button className="marcador-confirmado" onClick={(e) => {
              e.preventDefault();
              setUserDetail(user)
            }}
            />               
            </ Marker>
        ))}

        {userDetail ? (
          <Popup latitude={userDetail.location.coordinates[1]} longitude={userDetail.location.coordinates[0]} onClose=
          {
            () => {
              setUserDetail(null);
            }
          }>
            <div className="popup">
              <h2>CASO: {userDetail.status}</h2>
              <p><b>Sintomas</b> {userDetail.symp}</p>
              <p><b>Locais Visitados</b> {userDetail.places}</p>
              <p><b>Reportado em</b> {userDetail.createdAt.substring(0, 10)}</p>
            </div>
          </Popup>
        ) : null}
        </ Map>
        </>
    );
}
