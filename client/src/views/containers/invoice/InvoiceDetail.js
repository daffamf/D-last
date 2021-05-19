import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDetailInvoice } from '../../../redux/actions';
import angle_left from '../../../assets/images/svg/angle-left.svg';
import left_angle from '../../../assets/images/svg/left-angle.svg';
import right_angle from '../../../assets/images/svg/right-angle.svg';
import star from '../../../assets/images/svg/star.svg'
import delete_icon from '../../../assets/images/svg/delete.svg'
import invoice_pattern from '../../../assets/images/media/invoice-pattern.png'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class InvoiceDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_invoice: window.location.pathname.split('/')[4] || '',
            id_member: this.props.invoice.data[0].id_member || '',
            id_merchant: this.props.invoice.data[0].id_merchant || '',
            id_iklan: this.props.invoice.data[0].id_iklan || '',
            jlh_item: this.props.invoice.data[0].jlh_item || '',
            deskripsi: this.props.invoice.data[0].deskripsi || '',
            created_at: this.props.invoice.data[0].created_at || '',


        }
        this.input = React.createRef();
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }
    componentDidMount() {
        this.props.loadDetailInvoice(this.state.id_invoice)
    }
    btnDetail = (event) => {
        if (this.state.id_member && this.state.deskripsi && this.state.id_invoice && this.state.id_iklan && this.state.jlh_item && this.state.id_merchant && this.state.created_at) {
            this.props.loadDetailInvoice(this.state.id_member && this.state.deskripsi && this.state.id_invoice && this.state.id_iklan && this.state.jlh_item && this.state.id_merchant && this.state.created_at)
        }
        event.preventDefault();
    }
    static defaultProps = {
        center: {
            lat: -6.923735,
            lng: 107.688739
        },
        zoom: 11
    };
    
    render() {
        return (
            <div className="main-content d-flex flex-column flex-md-row">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div className="invoice-details-header bg-white d-flex align-items-sm-center flex-column flex-sm-row mb-30 justify-content-sm-between">
                                <div className="d-flex align-items-center">
                                    <a href="/admin/invoice" className="mr-2"><img src={angle_left} alt="" className="svg" /></a>
                                    <h2 className="regular mr-3 font-30">Detail</h2>
                                </div>
                            </div>
                            <form onSubmit={this.btnDetail}>
                                <div className="invoice-pd c2-bg" data-bg-img={invoice_pattern}>
                                    <div className="row">
                                        <div className="col-md-8"></div>
                                    </div>
                                </div>
                                <div className="bg-white invoice-pd">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">ID Invoices</label>
                                                <input type="text" className="theme-input-style" name="id_invoice" onChange={this.handleInputChange} value={this.state.id_invoice} disabled />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">ID Members</label>
                                                <input type="text" className="theme-input-style" name="id_member" onChange={this.handleInputChange} value={this.props.invoice.data[0].id_member} disabled />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">ID Merchants</label>
                                                <input type="text" className="theme-input-style" name="id_merchant" onChange={this.handleInputChange} value={this.props.invoice.data[0].id_merchant} disabled />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">ID iklan</label>
                                                <input type="text" className="theme-input-style" name="id_iklan" onChange={this.handleInputChange} value={this.props.invoice.data[0].id_iklan} disabled />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Jumlah Item</label>
                                                <input type="text" className="theme-input-style" name="jlh_item" onChange={this.handleInputChange} value={this.props.invoice.data[0].jlh_item} disabled />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Description</label>
                                                <input type="text" className="theme-input-style" name="deskripsi" onChange={this.handleInputChange} value={this.props.invoice.data[0].deskripsi} disabled />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">CreatedAt</label>
                                                <input type="text" className="theme-input-style" name="created_at" onChange={this.handleInputChange} value={this.props.invoice.data[0].created_at} disabled />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white details-list-wrap">
                                    <div className="cart-collaterals style--two pt-4 pt-xl-0">
                                        <div className="cart_totals calculated_shipping">
                                            <div className="proceed-to-checkout invoice-edit d-flex align-items-center justify-content-end mr-20 mt-4">
                                                <a href="/admin/invoice" type="button" className="btn btn-primary">Back</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    invoice: state.invoice
})

const mapDispatchToProps = dispatch => ({
    loadDetailInvoice: (id_invoice) => dispatch(loadDetailInvoice(id_invoice)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceDetail)