import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBakery } from '../../../redux/actions';
import GoogleMapReact from 'google-map-react';
import angle_left from '../../../assets/images/svg/angle-left.svg';
import invoice_pattern from '../../../assets/images/media/invoice-pattern.png'
import profile_pic from '../../../assets/images/media/profile-pic.jpg'
import gallery from '../../../assets/images/svg/gallery.svg';


const AnyReactComponent = ({ text }) => <div>{text}</div>;


class MemberEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            alamat: '',
            nama: '',
            email: '',
            phone: '',
            coordinate: '',
            kategori: 1,
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
        if (this.state.alamat && this.state.nama && this.state.email && this.state.phone && this.state.coordinate) {
            this.props.addBakery(this.state.kategori, this.state.alamat, this.state.nama, this.state.email, this.state.phone, this.state.coordinate, this.state.file)
        }
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
                                    <a href="/admin/restaurant" className="mr-2"><img src={angle_left} alt="" className="svg" /></a>
                                    <h2 className="regular mr-3 font-30">Edit</h2>
                                </div>
                            </div>
                            <form onSubmit={this.btnAdd}>
                                <div className="invoice-pd c2-bg" data-bg-img={invoice_pattern}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="">
                                                <div className="profile-pic">
                                                    <img src={this.state.imagePreviewUrl} alt="" />
                                                    <div className="upload-button">
                                                        <img src={gallery} alt="" className="svg" />
                                                        <input className="file-input" type="file" onChange={this.photoUpload} id="fileUpload2" accept="image/*" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="invoice-right mt-5 mt-md-0">
                                                <h3 className="white font-20 mb-3">Member</h3>
                                                <ul className="status-list">
                                                    <li>
                                                        <span className="key font-14">Kategori:</span>
                                                        <div className="custom-selectbox">
                                                            <select className="custom-select">
                                                                <option value="1">Member</option>
                                                            </select>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white invoice-pd">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Nama Usaha</label>
                                                <input type="text" className="theme-input-style" placeholder="Masukkan nama usaha" name="nama" onChange={this.handleInputChange} required />
                                            </div>

                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Email</label>
                                                <input type="email" className="theme-input-style" placeholder="Masukkan alamat email" name="email" onChange={this.handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">No Handphone</label>
                                                <input type="text" className="theme-input-style" placeholder="08xxxx" name="phone" onChange={this.handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Alamat</label>
                                                <input type="text" className="theme-input-style" placeholder="Masukkan alamat" name="alamat" onChange={this.handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-14 bold mb-2">Coordinate</label>
                                                <input type="text" className="theme-input-style" placeholder="Masukkan coordinate" name="coordinate" onChange={this.handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-6">
                                            <div className="form-group">
                                                <div style={{ height: '40vh', width: '100%' }}>
                                                    <GoogleMapReact
                                                        bootstrapURLKeys={{ key: 'AIzaSyA_-3tuAmYaX0s3fOtVFK9kRxk9DNeO88Q' }}
                                                        defaultCenter={this.props.center}
                                                        defaultZoom={this.props.zoom}
                                                    >
                                                        <AnyReactComponent
                                                            lat={59.955413}
                                                            lng={30.337844}
                                                            text="My Marker"
                                                        />
                                                    </GoogleMapReact>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white details-list-wrap">
                                    <div className="cart-collaterals style--two pt-4 pt-xl-0">
                                        <div className="cart_totals calculated_shipping">
                                            <div className="proceed-to-checkout invoice-edit d-flex align-items-center justify-content-end mr-20 mt-4">
                                                <button type="button" className="btn preview">Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save Now</button>
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
    addBakery: (kategori, alamat, nama, email, phone, coordinate, file) => dispatch(addBakery(kategori, alamat, nama, email, phone, coordinate, file)),
})

export default connect(
    null,
    mapDispatchToProps
)(MemberEdit)