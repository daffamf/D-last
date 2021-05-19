import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

import NavbarAdmin from '../components/navbar-admin/NavbarAdmin';
import SidebarAdmin from '../components/sidebar-admin/SidebarAdmin';
import Dashboard from '../components/dashboard/Dashboard';
import Restaurant from '../components/restaurant/Restaurant';
import RestaurantAdd from '../containers/restaurant/RestaurantAdd';
import RestaurantUpdate from '../containers/restaurant/RestaurantUpdate';
import Bakery from '../components/bakery/Bakery';
import BakeryAdd from '../containers/bakery/BakeryAdd';
import BakeryUpdate from '../containers/bakery/BakeryUpdate';
import Member from '../components/member/Member';
import MemberEdit from '../containers/member/MemberEdit';
import Invoice from '../components/invoice/Invoice';
import ProfileEdit from '../components/profile/ProfileEdit';
import InvoiceDetail from '../containers/invoice/InvoiceDetail';

export default class DashboardBox extends Component {
    render() {
        return (
            <div>
                <NavbarAdmin />
                <SidebarAdmin />
                <Switch>
                    <Route exact path="/admin/dashboard">
                        <Dashboard />
                    </Route>
                    <Route exact path="/admin/restaurant">
                        <Restaurant />
                    </Route>
                    <Route path="/admin/restaurant/add">
                        <RestaurantAdd />
                    </Route>
                    <Route path="/admin/restaurant/update">
                        <RestaurantUpdate/>
                    </Route>
                    <Route exact path="/admin/bakery">
                        <Bakery />
                    </Route>
                    <Route path="/admin/bakery/add">
                        <BakeryAdd />
                    </Route>
                    <Route path="/admin/bakery/update">
                        <BakeryUpdate />
                    </Route>
                    <Route exact path="/admin/member">
                        <Member />
                    </Route>
                    <Route path="/admin/member/edit">
                        <MemberEdit />
                    </Route>
                    <Route exact path="/admin/invoice">
                        <Invoice />
                    </Route>
                    <Route path="/admin/invoice/detail">
                        <InvoiceDetail />
                    </Route>
                    <Route path="/admin/profile">
                        <ProfileEdit />
                    </Route>
                </Switch>
            </div>
        )
    }
}