import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import c_edit from '../../../assets/images/svg/c-edit.svg';
import delete_icon from '../../../assets/images/svg/delete.svg';

class InvoiceItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>{this.props.id_invoice}</td>
                <td>{this.props.id_member}</td>
                <td>{this.props.created_at}</td>
                <td>{this.props.deskripsi}</td>
                <td><button type="button" className={this.props.status === true ? 'status-btn completed' : 'status-btn un_paid'}>{this.props.status === true ? 'Active' : 'Non-Active'}</button></td>
                <td className="actions">
                <Link to={{
                        pathname: `/admin/invoice/detail/${this.props.id_invoice}`,
                        id_member: this.props.id_invoice
                    }} className="mr-3"><img src={c_edit} alt="" className="svg" /></Link>
                    <a href="#"><img src={delete_icon} alt="" className="svg" /></a>
                </td>
            </tr>
        )
    }
}

export default InvoiceItem