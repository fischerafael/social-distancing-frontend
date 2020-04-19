import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import HeroImg from '../../assets/coronamap.png'
import api from '../../services/api';

import Header from '../../Components/Header'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { email, password })
            
            localStorage.setItem('email', email);

            history.push('/mapa');
            
        } catch (err) {
            alert('Falha no login, tente novamente.')
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
                        <h2>Login</h2>                     
                        <form>
                            <input 
                                className="input"
                                type="email"
                                placeholder="Digite seu ID"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />    
                            <input 
                                className="input"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />                            
                            <div className="content-buttons">                            
                                <Link className="button" type="submit" onClick={handleLogin} to="/mapa">Entrar</Link>
                                <Link className="button" to="/cadastro">Cadastrar-se</Link>                            
                            </div>
                        </form>                                               
                    </div>
                </div>
            </div>
            
        </>
    )
}