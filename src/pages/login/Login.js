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
            
            <div className='sign-in'>
            <Container>
            </Container>
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
       
            
            // <div className="auth-page">
            //     <Container>
                
            //         <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
            //             <p className="widget-auth-info">
            //                 Use your email to sign in.
            //             </p>
            //             <form onSubmit={this.doLogin}>
            //                 {
            //                     this.props.errorMessage && (
            //                         <Alert className="alert-sm widget-middle-overflow rounded-0" color="danger">
            //                             {this.props.errorMessage}
            //                         </Alert>
            //                     )
            //                 }
            //                 <FormGroup className="mt">
            //                     <Label for="email">Email</Label>
            //                     <InputGroup className="input-group-no-border">
            //                         <InputGroupAddon addonType="prepend">
            //                             <InputGroupText>
            //                                 <i className="la la-user text-white"/>
            //                             </InputGroupText>
            //                         </InputGroupAddon>
            //                         <Input id="email" className="input-transparent pl-3" value={this.state.email} onChange={this.changeEmail} type="email"
            //                                required name="email" placeholder="Email"/>
            //                     </InputGroup>
            //                 </FormGroup>
            //                 <FormGroup>
            //                     <Label for="password">Password</Label>
            //                     <InputGroup className="input-group-no-border">
            //                         <InputGroupAddon addonType="prepend">
            //                             <InputGroupText>
            //                                 <i className="la la-lock text-white"/>
            //                             </InputGroupText>
            //                         </InputGroupAddon>
            //                         <Input id="password" className="input-transparent pl-3" value={this.state.password}
            //                                onChange={this.changePassword} type="password"
            //                                required name="password" placeholder="Password"/>
            //                     </InputGroup>
            //                 </FormGroup>
            //                 <div className="bg-widget auth-widget-footer">
            //                     <Button type="submit" color="danger" className="auth-btn"
            //                             size="sm" style={{color: '#fff'}}>
            //                       <span className="auth-btn-circle" style={{marginRight: 8}}>
            //                         <i className="la la-caret-right"/>
            //                       </span>
            //                       {this.props.isFetching ? 'Loading...' : 'Login'}
            //                     </Button>
            //                     <p className="widget-auth-info mt-4">
            //                         Don't have an account? Sign up now!
            //                     </p>
            //                     <Link className="d-block text-center mb-4" to="register">Create an Account</Link>
            //                     <div className="social-buttons">
            //                         <button onClick={signInWithGoogle} color="primary" className="social-button">
            //                             <i className="social-icon social-google"/>
            //                             <p className="social-text">GOOGLE</p>
            //                         </button>
                                    
            //                     </div>
            //                 </div>
            //             </form>
            //         </Widget>
            //     </Container>
            // </div>
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

