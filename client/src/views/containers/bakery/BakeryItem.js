import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import c_edit from '../../../assets/images/svg/c-edit.svg';
import delete_icon from '../../../assets/images/svg/delete.svg';

class BakeryItem extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>{this.props.nama}</td>
                <td>{this.props.email}</td>
                <td>{this.props.phone}</td>
                <td><button type="button" className={this.props.status === true ? 'status-btn completed' : 'status-btn un_paid'}>{this.props.status === true ? 'Active' : 'Non-Active'}</button></td>
                <td className="actions">
                <Link to={{
                        pathname: `/admin/bakery/update/${this.props.id}`,
                        id: this.props.id
                    }} className="mr-3"><img src={c_edit} alt="" className="svg" /></Link>
                    <a href="#"><img src={delete_icon} alt="" className="svg" /></a>
                </td>
            </tr>
        )
    }
}

export default BakeryItem