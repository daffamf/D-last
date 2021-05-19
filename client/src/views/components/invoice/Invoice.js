import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import InvoiceItem from '../../containers/invoice/InvoiceItem';
import { connect } from 'react-redux';
import { loadInvoice } from '../../../redux/actions';

import '../../admin/Admin.css';
import search_icon from '../../../assets/images/svg/search-icon.svg'

class Invoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            search: ''
        }
    }

    componentDidMount() {
        this.props.loadInvoice();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }
    handleBtnSearch = (event) => {
        if (this.state.search) {
            this.props.loadInvoice(this.state.page, this.state.search)
        } else {
            this.props.loadInvoice(this.state.page)
        }
        event.preventDefault()
    }

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        })
        if (this.state.search === '') {
            this.props.loadInvoice(value);
        } else {
            this.props.loadInvoice(value, this.state.search);
        }
        event.preventDefault();
    }

    render() {
        const invoiceNode = this.props.data.data.map((item, index) =>
            <InvoiceItem
                key={index}
                no={(this.state.page - 1) * 10 + (index + 1)}
                id_member={item.id_member}
                deskripsi={item.deskripsi}
                id_invoice={item.id_invoice}
                id_iklan={item.id_iklan}
                jlh_item={item.jlh_item}
                id_merchant={item.id_merchant}
                created_at={item.created_at}
                status={item.status}
                sent={item.sent}
            />
        )
        const classes = makeStyles((theme) => ({
            root: {
                '& > *': {
                    marginTop: theme.spacing(2),
                },
            },
        }));
        
        return (
            <div>
                <div className="main-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <div className="card bg-transparent">
                                    <div className="contact-header bg-white">
                                        <h4 className="font-20">Invoices</h4>
                                    </div>
                                    <div className="contact-header d-flex align-items-sm-center media flex-column flex-sm-row bg-white mb-30">
                                        <div className="contact-header-left media-body d-flex align-items-center mr-4">
                                            <form onSubmit={this.handleBtnSearch} className="search-form flex-grow">
                                                <div className="theme-input-group style--two">
                                                    <input type="text" className="theme-input-style" placeholder="Search Here" name="search" onChange={this.handleInputChange} />
                                                    <button type="submit"><img src={search_icon} alt="" className="svg" /></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="text-nowrap bg-white dh-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>id_invoices</th>
                                                    <th>id_members</th>
                                                    <th>CreatedAt</th>
                                                    <th>Description</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoiceNode}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="contact-header bg-white">
                                        <div className={classes.root}>
                                            <Pagination count={this.props.data.pages} page={this.state.page} onChange={this.handlePageChange} color="primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    RUBICAMP24 © 2021
                </footer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.invoice
})

const mapDispatchToProps = (dispatch) => ({
    loadInvoice: (current_page, search) => dispatch(loadInvoice(current_page, search))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoice)