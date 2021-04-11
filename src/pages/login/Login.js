import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';
import Widget from '../../components/Widget';
import { loginUser } from '../../actions/user';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import FormInput from './component/formInput';
import CustomButton from '../../components/customButton/button.component.jsx'
import './login.scss'

class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    static isAuthenticated(token) {
        if (token) return true;
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.doLogin = this.doLogin.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    changeEmail(event) {
        this.setState({ email: event.target.value });
    }

    changePassword(event) {
        this.setState({ password: event.target.value });
    }

    doLogin= async e => {
        e.preventDefault();
        

        const {email,password}=this.state;
        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.props.dispatch(loginUser({ email: this.state.email, password: this.state.password }));
            this.setState({
                email:'',
                password:''
            })
        }
        catch(error){
            console.log(error);
        }
        

    }

    signUp() {
        this.props.history.push('/register');
    }
   

    

    render() {

        console.log('inside login');
        const { from } = this.props.location.state || { from: { pathname: '/carbonfootprint/homepage' } }; // eslint-disable-line

        //cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            console.log(Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated'))));
            return (
                <Redirect to={from} />
            );
        }
        

        return (
            <div class="parent">
            <div class="div1"> </div>
            <div class="div2"></div>
            <div class="div3" style = {{backgroundColor: "#E2E2E4"}}>
                <img src= {require("./img.png")} width="100%"></img>
            </div>
            <div class="div4" >
            <div className='sign-in'>
                <h2>LOGIN TO CFTRACKER</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.doLogin}>
                {
                    this.props.errorMessage && (
                    <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
                        {this.props.errorMessage}
                    </Alert>
                    ) 
                }
                <FormInput
                    name='email'
                    type='email'
                    handleChange={this.changeEmail}
                    value={this.state.email}
                    label='Email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={this.state.password}
                    handleChange={this.changePassword}
                    label='Password'
                    required
                />
                <span>Please Register if you do not have an account.</span>
                
                <div className='buttons'>
                    <CustomButton type='submit'> Login </CustomButton>
                    <CustomButton onClick={this.signUp}>
                    Register
                    </CustomButton>
                </div>
                </form>
            </div>
            </div>
            </div>
            
            
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth1.isFetching,
        isAuthenticated: state.auth1.isAuthenticated,
        errorMessage: state.auth1.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

