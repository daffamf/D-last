import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import BakeryItem from '../../containers/bakery/BakeryItem';
import { connect } from 'react-redux';
import { loadBakery } from '../../../redux/actions';
import '../../admin/Admin.css';
import search_icon from '../../../assets/images/svg/search-icon.svg'

class Bakery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            search: '',
            kategori: 2
        }
    }

    componentDidMount() {
        this.props.loadBakery(this.state.kategori);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    handleBtnAdd() {
        window.location = "/admin/bakery/add"
    }

    handleBtnSearch = (event) => {
        if (this.state.search) {
            this.props.loadBakery(this.state.kategori, this.state.page, this.state.search)
        }else{
            this.props.loadBakery(this.state.kategori, this.state.page)
        }
        event.preventDefault()
    }

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        })
        if(this.state.search === ''){
            this.props.loadBakery(this.state.kategori, value);
        }else{
            this.props.loadBakery(this.state.kategori, value, this.state.search);
        }
        event.preventDefault();
    }

    render() {
        const bakeryNode = this.props.data.data.map((item, index) =>
            <BakeryItem
                key={index}
                id={item.id}
                no={(this.state.page - 1) * 10 + (index+1)}
                nama={item.nama}
                email={item.email}
                phone={item.phone}
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
                                        <h4 className="font-20">Bakery</h4>
                                    </div>
                                    <div className="contact-header d-flex align-items-sm-center media flex-column flex-sm-row bg-white mb-30">
                                        <div className="contact-header-left media-body d-flex align-items-center mr-4">
                                            <div className="add-new-contact mr-20">
                                                <button onClick={this.handleBtnAdd} className="btn-circle">
                                                    <i className="fa fa-plus" style={{ zIndex: 100, color: "white" }}></i>
                                                </button>
                                            </div>
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
                                                    <th>Nama</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bakeryNode}
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
    data: state.restaurant
})

const mapDispatchToProps = (dispatch) => ({
    loadBakery: (kategori,current_page, search) => dispatch(loadBakery(kategori,current_page, search))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bakery)