import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React from 'react';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Incident from './pages/NewIncident/incident';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/"   exact  component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={Incident}></Route>
            </Switch>
        </BrowserRouter>
    )
}