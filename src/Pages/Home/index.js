import React from 'react';
import { Link } from 'react-router-dom';
import HeroImg from '../../assets/coronamap.png'

import Header from '../../Components/Header'

export default function Home() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="container-content">
                    <div className="content-img">
                        <img className="hero-img" src={HeroImg} alt=""/>
                    </div>
                    <div className="content-text">
                        <h1>SAIBA ONDE O CORONAVIRUS ESTÁ</h1>
                        <p>Social Distancing permite que pessoas reportem e vejam casos de Covid-19.</p>
                        <p>Um erro de precisão de 200m é adicionado à sua localização para garantir sua privacidade.</p>
                        <p>Além disso, nenhum dado pessoal (além de seu email de login) seu fica registrado no nosso banco de dados.</p>
                        <div className="content-buttons">
                            <Link className="button" to="/login">Entrar</Link>
                            <Link className="button" to="/cadastro">Cadastrar-se</Link>
                        </div>                        
                    </div>
                </div>
            </div>
            
        </>
    )
}