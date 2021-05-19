import React, { Component } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import '../../admin/Admin.css';

export default class SidebarAdmin extends Component {
    render() {
        const url = window.location.pathname.split('/')[2];
        return (
            <div className="main-wrapper">
                <nav className="sidebar" data-trigger="scrollbar">
                    <PerfectScrollbar>
                        <div className="sidebar-header d-none d-lg-block">
                            <div className="sidebar-toogle-pin">
                                <i className="fa fa-thumb-tack"></i>
                            </div>
                        </div>

                        <div className="sidebar-body">
                            <ul className="nav">
                                <li className="nav-category">Main</li>
                                <li className={url === 'dashboard' ? 'active':''}>
                                    <a href="/admin/dashboard">
                                        <i className="fa fa-pie-chart"></i>
                                        <span className="link-title">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-category">Merchants</li>
                                <li className={url === 'restaurant' ? 'active':''}>
                                    <a href="/admin/restaurant">
                                        <i className="fa fa-bullseye"></i>
                                        <span className="link-title">Restaurants</span>
                                    </a>
                                </li>
                                <li className={url === 'bakery' ? 'active':''}>
                                    <a href="/admin/bakery">
                                        <i className="fa fa-bullseye"></i>
                                        <span className="link-title">Bakery</span>
                                    </a>
                                </li>
                                <li className="nav-category">Member</li>
                                <li className={url === 'member' ? 'active':''}>
                                    <a href="/admin/member">
                                        <i className="fa fa-bullseye"></i>
                                        <span className="link-title">Members</span>
                                    </a>
                                </li>
                                <li className="nav-category">Transactions</li>
                                <li className={url === 'invoice' ? 'active':''}>
                                    <a href="/admin/invoice">
                                        <i className="fa fa-files-o"></i>
                                        <span className="link-title">Invoices</span>
                                    </a>
                                </li>
                                <li className="nav-category">Support</li>
                            </ul>
                        </div>
                    </PerfectScrollbar>
                </nav>
            </div>
        )
    }
}