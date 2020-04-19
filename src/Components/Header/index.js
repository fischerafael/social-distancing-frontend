import React from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
            <header>
                <img className="logo" src={Logo} alt="Social Distancing"/>
                <Link className="button exit-button" to="/">Início</Link>
            </header>
        </>
    )
} 