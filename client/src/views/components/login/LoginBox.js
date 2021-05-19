import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LoginBox.css';
import imgHighlight from '../../../assets/images/login.jpg';
import logo from '../../../assets/images/logo-dlast.png';
import { loginUser } from '../../../redux/actions';

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            default: 'active',
            default_content: 'block',
            email: '',
            password: '',
            isTrue: '',
            messageisTrue: '',
            statusUser: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleClick(index) {
        this.setState({
            index
        })
        if (index !== 0) {
            this.setState({
                default: '',
                default_content: 'none'
            })
        } else {
            this.setState({
                default: 'active',
                default_content: 'block'
            })
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }


    async handleSubmitLogin(event) {
        if (this.state.email && this.state.password) {
            this.props.loginUser(this.state.email, this.state.password)
            this.setState({ email: '', password: '' })
        }
        event.preventDefault();

    }
    render() {
        const status = this.props.data.map(item => item.status)
        return (
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="col-md-5">
                                <img src={imgHighlight} alt="login" className="login-card-img" />
                            </div>
                            <div className="col-md-7">
                                <div className="card-body">
                                    <div className="brand-wrapper">
                                        <img src={logo} alt="logo" className="logo" />
                                    </div>
                                    <p className="login-card-description">Sign into your account</p>
                                    <div className={status[0] || status[0] === undefined ? 'd-none' : 'alert alert-danger'} role="alert">
                                        email or Password Wrong!
                                    </div>
                                    <form onSubmit={this.handleSubmitLogin} >
                                        <div className="form-group">
                                            <label className="sr-only">email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="email address"
                                                required=""
                                                value={this.state.email}
                                                onChange={this.handleInputChange} />
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="sr-only">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="password"
                                                value={this.state.password}
                                                onChange={this.handleInputChange} />
                                        </div>
                                        <button type="submit" className="btn btn-block login-btn mb-4" id="login-form-link">Login</button>
                                    </form>
                                    <a href="#!" className="forgot-password-link">Forgot password?</a>
                                    <nav className="login-card-footer-nav">
                                        <a href="#!">Terms of use.</a>
                                        <a href="#!">Privacy policy</a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
const mapStateToProps = (state) => ({
    data: state.login
})

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(loginUser(email, password))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginBox)