import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addprofile, loadprofile } from '../../../redux/actions';
import angle_left from '../../../assets/images/svg/angle-left.svg';
import invoice_pattern from '../../../assets/images/media/invoice-pattern.png'
import profile_pic from '../../../assets/images/media/profile-pic.jpg'
import {API_URL} from '../../../config/constant'



class ProfileEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id || '1',
            username: localStorage.getItem('nama'),
            email: localStorage.getItem('email'),
            oldpassword: localStorage.getItem('password'),
            password: this.props.password || '',
            file: '',
            imagePreviewUrl: profile_pic
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


    btnAdd = (event) => {
        if (this.state.username && this.state.email && this.state.oldpassword && this.state.password) {
            this.props.addprofile(this.state.id, this.state.username, this.state.email, this.state.oldpassword, this.state.password, this.state.file)
        }
        event.preventDefault();
    }

    btnUpdate = (event) => {
        this.props.addprofile(this.state.id, this.state.username, this.state.email, this.state.oldpassword, this.state.password)
        event.preventDefault();
    }

    photoUpload = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }


    render() {
        return (
            <div className="main-content d-flex flex-column flex-md-row">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-9">
                            <div className="invoice-details-header bg-white d-flex align-items-sm-center flex-column flex-sm-row mb-30 justify-content-sm-between">
                                <div className="d-flex align-items-center">
                                    <a href="/admin/dashboard" className="mr-2"><img src={angle_left} alt="" className="svg" /></a>
                                    <h2 className="regular mr-3 font-30">{this.props.id ? 'Edit' : 'My profile'}</h2>
                                </div>
                                <div className="invoice-header-right d-flex align-items-center justify-content-around justify-content-sm-end mt-3 mt-sm-0">
                                </div>
                            </div>
                            <form onSubmit={this.props.id ? this.btnUpdate : this.btnAdd}>
                                <div className="invoice-pd c2-bg" data-bg-img={invoice_pattern}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="">
                                                <div className="profile-pic">
                                                    <img src={`${API_URL}images/uploads/02_2021_3HgW8M2QEE.jpg`} />
                                                    <div className="upload-button">
                                                        <input className="file-input" type="file" onChange={this.photoUpload} id="fileUpload2" accept="image/*" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="invoice-right mt-5 mt-md-0">
                                                <h3 className="white font-20 mb-3">Edit Profile</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white invoice-pd">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Username</label>
                                                <input type="text" className="theme-input-style" placeholder="Masukkan username anda" name="username" onChange={this.handleInputChange} value={this.state.username} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Email</label>
                                                <input type="email" className="theme-input-style" placeholder="Masukkan alamat email" name="email" onChange={this.handleInputChange} value={this.state.email} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Old Password</label>
                                                <input type="password" className="theme-input-style" placeholder="masukan password lama" name="oldpassword" onChange={this.handleInputChange} value={this.state.oldpasswoard} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">New Password</label>
                                                <input type="password" className="theme-input-style" placeholder="Masukkan password baru" name="password" onChange={this.handleInputChange} value={this.state.password} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white details-list-wrap">
                                    <div className="cart-collaterals style--two pt-4 pt-xl-0">
                                        <div className="cart_totals calculated_shipping">
                                            <div className="proceed-to-checkout invoice-edit d-flex align-items-center justify-content-end mr-20 mt-4">
                                                <a href="/admin/dashboard" className="btn btn-primary">Cancel</a>
                                                <button type="submit" className="btn btn-primary">Save profile</button>
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
const mapDispatchToProps = dispatch => ({
    addprofile: (username, email, oldpasswoard, password, file) => dispatch(addprofile(username, email, oldpasswoard, password, file)),
    loadprofile: (username, email, oldpasswoard, password, file) => dispatch(loadprofile(username, email, oldpasswoard, password, file))
})

export default connect(
    null,
    mapDispatchToProps
)(ProfileEdit)