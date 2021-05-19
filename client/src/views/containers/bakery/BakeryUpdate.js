import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMerchantwithId } from '../../../redux/actions';
import { Redirect } from 'react-router-dom'
import BakeryAdd from './BakeryAdd';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class BakeryUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: window.location.pathname.split('/')[4],
            nama: '',
            email: ''
        }
    }
    
    render() {
        if (this.props.bakery.data.length == 0) {
            return <Redirect to="/admin/bakery" />
        } else {
            const dataNode = this.props.bakery.data.map((item, index) => {
                if (item.id == this.state.id) {
                    return <BakeryAdd
                        key={index}
                        id={item.id}
                        nama={item.nama}
                        email={item.email}
                        phone={item.phone}
                        alamat={item.alamat}
                        coordinate={item.coordinate.x + ', ' + item.coordinate.y}
                    />
                }
            })
            return (
                <div>
                    {dataNode}
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => ({
    bakery: state.restaurant
})
const mapDispatchToProps = dispatch => ({
    loadMerchantwithId: (id) => dispatch(loadMerchantwithId(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BakeryUpdate)