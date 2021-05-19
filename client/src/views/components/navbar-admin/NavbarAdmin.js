
import React, { Component } from 'react';
import '../../admin/Admin.css';
import logo from '../../../assets/images/logo-dlast.png'
import search_icon from '../../../assets/images/svg/search-icon.svg'
import message_icon from '../../../assets/images/svg/message-icon.svg'
import count_bg from '../../../assets/images/count-bg.png'
import user2 from '../../../assets/images/svg/user2.svg'

import history from '../../../history';


function logout(){
    localStorage.clear()
    history.push('/')
}


export default class NavbarAdmin extends Component {
    render() {
        const createdAt = this.props.createdAt;
        const createdAtDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(createdAt);
        const createdAtTime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(createdAt);
        return (
            <div className="wrapper">
                <header className="header white-bg fixed-top d-flex align-content-center flex-wrap">
                    <div className="logo">
                        <a href="/admin/dashboard" className="default-logo"><img src={logo} alt="" /></a>
                        <a href="/admin/dashboard" className="mobile-logo"><img src={logo} alt="" /></a>
                    </div>

                    <div className="main-header">
                        <div className="container-fluid">
                            <div className="row justify-content-between">
                                <div className="col-3 col-lg-1 col-xl-4">
                                </div>
                                <div className="col-9 col-lg-11 col-xl-8">
                                    <div className="main-header-right d-flex justify-content-end">
                                        <ul className="nav">
                                   
                                            <li className="d-none d-lg-flex">
                                                <div className="main-header-date-time text-right">
                                                    <h3>
                                                    <span className="time">{createdAtTime}</span>                                                                                            
                                                    </h3>
                                                    <span className="date">{createdAtDate}</span> 
                                                </div>
                                            </li>
                                            <li className="order-2 order-sm-0">
                                                <div className="main-header-search">
                                                    <form action="#" className="search-form">
                                                        <div className="theme-input-group header-search">
                                                            <input type="text" className="theme-input-style" placeholder="Search Here" />
                                                            <button type="submit"><img src={search_icon} alt=""
                                                                className="svg" /></button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="main-header-message">
                                                    <a href="#" className="header-icon" data-toggle="dropdown">
                                                        <img src={message_icon} alt="" className="svg" />
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-right">
                                                        <div className="dropdown-header d-flex align-items-center justify-content-between">
                                                            <h5>3 Unread messages</h5>
                                                            <a href="#" className="text-mute d-inline-block">Clear all</a>
                                                        </div>
                                                        <div className="dropdown-body">
                                                            <a href="#" className="item-single d-flex media align-items-center">
                                                                <div className="figure">
                                                                    <img src="../../../assets/images/avatar/m1.png" alt="" />
                                                                    <span className="avatar-status bg-teal"></span>
                                                                </div>
                                                                <div className="content media-body">
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <h6 className="name">Sender Name</h6>
                                                                        <p className="time">2 min ago</p>
                                                                    </div>
                                                                    <p className="main-text">Donec dapibus mauris id odio ornare tempus. Duis sit amet accumsan justo.</p>
                                                                </div>
                                                            </a>
                                                            <a href="#" className="item-single d-flex media align-items-center">
                                                                <div className="figure">
                                                                    <img src="../../../assets/images/avatar/m2.png" alt="" />
                                                                    <span className="avatar-status bg-teal"></span>
                                                                </div>
                                                                <div className="content media-body">
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <h6 className="name">Tonya Lee</h6>
                                                                        <p className="time">2 min ago</p>
                                                                    </div>
                                                                    <p className="main-text">Donec dapibus mauris id odio ornare tempus. Duis sit amet accumsan justo.</p>
                                                                </div>
                                                            </a>
                                                            <a href="#" className="item-single d-flex media align-items-center">
                                                                <div className="figure">
                                                                    <img src="assets/img/avatar/m3.png" alt="" />
                                                                    <span className="avatar-status bg-teal"></span>
                                                                </div>
                                                                <div className="content media-body">
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <h6 className="name">Settings</h6>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            <a href="" className="item-single d-flex media align-items-center">
                                                                <div className="figure">
                                                                    <img src="assets/img/avatar/m4.png" alt="" />
                                                                    <span className="avatar-status bg-teal"></span>
                                                                </div>
                                                                <div className="content media-body">
                                                                    <div className="d-flex align-items-center mb-2">
                                                                        <h6 className="name">Hubert Griffith</h6>
                                                                        <p className="time">2 min ago</p>
                                                                    </div>
                                                                    <p className="main-text">Donec dapibus mauris id odio ornare tempus. Duis sit amet accumsan justo.</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="main-header-notification">
                                                    <a href="" className="header-icon notification-icon" data-toggle="dropdown">
                                                        <span className="count" data-bg-img={count_bg}>22</span>
                                                        <img src={user2} alt="" className="svg" />
                                                    </a>
                                                    <div className="dropdown-menu style--two dropdown-menu-right">
                                                        <div className="dropdown-body">                                                          
                                                            <a href="/admin/profile" className="item-single d-flex align-items-center">
                                                                <div className="content">
                                                                    <p className="main-text">My profile</p>
                                                                </div>
                                                            </a>
                                                            <a href="#" className="item-single d-flex align-items-center">
                                                                <div className="content">
                                                                    <p className="main-text">Settings</p>
                                                                </div>
                                                            </a>
                                                            <a  onClick={logout}className="item-single d-flex align-items-center">
                                                                <div className="content">
                                                                    <p className="main-text">logout</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}