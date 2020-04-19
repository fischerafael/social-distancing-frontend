import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import HeroImg from '../../assets/coronamap.png'
import Header from '../../Components/Header'

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('saudável');
    const [symp, setSymp] = useState('Nenhum');
    const [places, setPlaces] = useState('Nenhum');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            navigator.geolocation.getCurrentPosition(
                (position) => {          
                  const { latitude, longitude } = position.coords;
        
                  setLatitude(latitude);
                  setLongitude(longitude);
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

    const history = useHistory();
    
    async function handleAddUser(e) {
        e.preventDefault();

        try {
            const response = await api.post('/users', {
                email,
                password,
                status,
                symp,
                places,
                latitude,
                longitude,
            })
    
            localStorage.setItem('email', email)
    
            history.push('/mapa')
    
            alert(`Conta ${response.data.email} criada com sucesso. Você será encaminhado para o mapa!`);
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="container-content">
                    <div className="content-img">
                        <img className="hero-img" src={HeroImg} alt=""/>
                    </div>
                    <div className="content-form"> 
                        <h2>Cadastre-se</h2>                       
                        <form>
                            <input 
                                className="input"
                                type="email"
                                placeholder="Digite um email"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />    
                            <input 
                                className="input"
                                type="password"
                                placeholder="Defina uma senha"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />                           
                            <select 
                                className="input"
                                required
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            >
                                <option value="saudável" selected>Saudável</option>
                                <option value="suspeito">Suspeito</option>
                                <option value="confirmado">Confirmado</option>                                
                            </select>
                            <div className="current-position">                                
                                <input 
                                    className="input"    
                                    type="number"                                
                                    placeholder="Latitude"
                                    required
                                    value={latitude}
                                    onChange={e => setLatitude(e.target.value)}
                                />
                                <input 
                                    className="input"   
                                    type="number"                                  
                                    placeholder="Longitude"
                                    required
                                    value={longitude}
                                    onChange={e => setLongitude(e.target.value)}                                    
                                />
                            </div>  
                            <textarea 
                                className="input"
                                placeholder="Sintomas"
                                defaultValue=""
                                value={symp}
                                onChange={e => setSymp(e.target.value)} 
                                required                               
                            />
                            <textarea 
                                className="input"
                                placeholder="Lugares visitados recentemente"
                                defaultValue=""
                                value={places}
                                onChange={e => setPlaces(e.target.value)}
                                required
                            />                                                    
                            <div className="content-buttons">                            
                                <Link className="button" type="submit" onClick={handleAddUser}>Cadastrar-se</Link>
                                <Link className="button" to="/">Voltar</Link>                            
                            </div>
                        </form>                                               
                    </div>
                </div>
            </div>
            
        </>
    )
}