import React from 'react';
import Logo from '../../assets/logo.png';
import { Link, useHistory } from 'react-router-dom';

export default function Header() {

    const UserEmail = localStorage.getItem('email');

    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <header>
                <img className="logo" src={Logo} alt="Social Distancing"/>                
                <p className="total-cases">Olá, <b>{UserEmail}</b>!</p>
                <Link className="button exit-button" onClick={handleLogout}>Sair</Link>
            </header>
        </>
    )
} 