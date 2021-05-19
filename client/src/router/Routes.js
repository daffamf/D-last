import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router-dom";

import history from '../history';

import Login from "../views/components/login/LoginBox";
import NavbarAdmin from "../views/components/navbar-admin/NavbarAdmin"
import ProfileEdit from"../views/components/profile/ProfileEdit";
import Admin from "../views/admin/Admin";
import { ProtectedRoute } from "../protected.route";



export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <ProtectedRoute path="/admin/dashboard" component={Admin} />
                    <Route path="/admin/restaurant" component={Admin} />
                    <Route path="/admin/restaurant/add" component={Admin} />
                    <Route path="/admin/bakery" component={Admin} />
                    <Route path="/admin/bakery/add" component={Admin} />
                    <Route path="/admin/member" component={Admin} />
                    <Route path="/admin/invoice" component={Admin} />
                    <Route path="/navbar-admin" component={NavbarAdmin} />
                    <Route path="/admin/profile" component={Admin} />
                </Switch>
            </Router>
        )
    }
}