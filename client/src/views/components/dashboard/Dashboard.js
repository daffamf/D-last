import React, { Component } from 'react';

import '../../admin/Admin.css';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-md-8">
                            <div className="card mb-30">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="increase">
                                            <div className="card-title d-flex align-items-end mb-2">
                                                <h2>4<sup></sup></h2>
                                            </div>
                                            <h3 className="card-subtitle mb-2">Restoran</h3>
                                            <p className="font-14 text-warning">You've finished all of your tasks for this week.</p>
                                        </div>
                                        <div className="congratulation-img">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-8">
                            <div className="card mb-30">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="increase">
                                            <div className="card-title d-flex align-items-end mb-2">
                                                <h2>5<sup></sup></h2>
                                            </div>
                                            <h3 className="card-subtitle mb-2">Bakery</h3>
                                            <p className="font-14 text-warning">You've finished all of your tasks for this week.</p>
                                        </div>
                                        <div className="congratulation-img">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-8">
                            <div className="card mb-30">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="increase">
                                            <div className="card-title d-flex align-items-end mb-2">
                                                <h2>16<sup></sup></h2>
                                            </div>
                                            <h3 className="card-subtitle mb-2">Members</h3>
                                            <p className="font-14 text-success">You've finished all of your tasks for this week.</p>
                                        </div>
                                        <div className="congratulation-img">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-9 col-md-9">
                            <div className="card mb-30">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="increase">
                                            <div className="card-title d-flex align-items-end mb-2">
                                                <h2>93<sup></sup></h2>
                                            </div>
                                            <h3 className="card-subtitle mb-2">Invoices</h3>
                                            <p className="font-14 text-danger">You've finished all of your tasks for this week.</p>
                                        </div>
                                        <div className="congratulation-img">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}