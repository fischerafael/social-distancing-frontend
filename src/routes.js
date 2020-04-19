import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import Mapa from './Pages/Mapa';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/mapa" component={Mapa} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={Cadastro} />
            </Switch>
        </BrowserRouter>
    );
}