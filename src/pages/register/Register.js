import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label } from 'reactstrap';
import Widget from '../../components/Widget';
import { registerUser, registerError } from '../../actions/register';
import FormInput from '../login/component/formInput.jsx';
import CustomButton from '../../components/customButton/button.component.jsx'
import Login from '../login';
import { auth, createUser, signInWithGoogle } from '../../firebase/firebase.utils';

class Register extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            
            email: '',
            password: '',
            confirmPassword: ''
        };

        this.doRegister = this.doRegister.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
    }

    changeEmail(event) {
        this.setState({email: event.target.value});
    }

    changePassword(event) {
        this.setState({password: event.target.value});
    }

    changeConfirmPassword(event) {
        this.setState({confirmPassword: event.target.value});
    }

    checkPassword() {
        if (!this.isPasswordValid()) {
            if (!this.state.password) {
                this.props.dispatch(registerError("Password field is empty"));
            } else {
                this.props.dispatch(registerError("Passwords are not equal"));
            }
            setTimeout(() => {
                this.props.dispatch(registerError());
            }, 3 * 1000)
        }
    }

    isPasswordValid() {
       return this.state.password && this.state.password === this.state.confirmPassword;
    }

    doRegister= async e => {
        e.preventDefault();

        const {email, password} = this.state;

        if (!this.isPasswordValid()) {
            this.checkPassword();
            return;
        } 
        try {
            this.props.dispatch(registerUser({
                creds: {
                    email: this.state.email,
                    password: this.state.password
                },
                 history: this.props.history
             }));

            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password);

                console.log(user);
                createUser(user);
                
             this.setState({
                email: '',
                password: '',
                confirmPassword: ''
            });
        }
        catch(error){
            console.error(error);
        }

    
    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/app'}}; // eslint-disable-line

        // cant access login page while logged in
        if (Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
            return (
                <Redirect to={from}/>
            );
        }
        const {email, password, confirmPassword} = this.state;
        return (
            <div class="parent">
                <div class="div1"> </div>
                <div class="div2"></div>
                <div class="div4"  style = {{backgroundColor: "#E2E2E4"}}>
                    <img src= {require("./img.png")} width="100%"></img></div>
                <div class="div3">
                <div className='sign-in'>
                        <h2>REGISTER ON CFTRACKER</h2>
                        <span>Sign up with your email and password</span>
                        
                        <form onSubmit={this.doRegister}>
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
                            value={email}
                            label='Email'
                            required
                        />
                        <FormInput
                            name='password'
                            type='password'
                            value={password}
                            handleChange={this.changePassword}
                            label='Password'
                            required
                        />
                        <FormInput
                            name='confirmPassword'
                            type='password'
                            value={confirmPassword}
                            handleChange={this.changeConfirmPassword}
                            label='Confirm Password'
                            required
                        />
                        <span>Already have an account?<a style={{color:"red"}} href="login"> Please Login </a></span>
                        
                        <div className='buttons'>
                            <CustomButton type='submit'> Register </CustomButton>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            
       
            // <div className="auth-page">
            //     <Container>
            //         <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Login to your Web App</h3>}>
            //             <p className="widget-auth-info">
            //                 Please fill all fields below.
            //             </p>
            //             <form onSubmit={this.doRegister}>
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
            //                         <Input id="email" className="input-transparent pl-3" value={email}
            //                                onChange={this.changeEmail} type="email"
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
            //                         <Input id="password" className="input-transparent pl-3" value={password}
            //                                onChange={this.changePassword} type="password"
            //                                required name="password" placeholder="Password"/>
            //                     </InputGroup>
            //                 </FormGroup>
            //                 <FormGroup>
            //                     <Label for="confirmPassword">Confirm</Label>
            //                     <InputGroup className="input-group-no-border">
            //                         <InputGroupAddon addonType="prepend">
            //                             <InputGroupText>
            //                                 <i className="la la-lock text-white"/>
            //                             </InputGroupText>
            //                         </InputGroupAddon>
            //                         <Input id="confirmPassword" className="input-transparent pl-3" value={confirmPassword}
            //                                onChange={this.changeConfirmPassword} onBlur={this.checkPassword} type="password"
            //                                required name="confirmPassword" placeholder="Confirm"/>
            //                     </InputGroup>
            //                 </FormGroup>
            //                 <div className="bg-widget-transparent auth-widget-footer">
            //                     <Button type="submit" color="danger" className="auth-btn"
            //                             size="sm" style={{color: '#fff'}}>{this.props.isFetching ? 'Loading...' : 'Register'}</Button>
            //                     <p className="widget-auth-info mt-4">
            //                         Already have the account? Login now!
            //                     </p>
            //                     <Link className="d-block text-center mb-4" to="login">Enter the account</Link>
            //                     <div className="social-buttons">
            //                         <button onClick={signInWithGoogle} color="primary" className="social-button">
            //                             <i className="social-icon social-google"/>
            //                             <p className="social-text">GOOGLE</p>
            //                         </button>
                                   
            //                     </div>
            //                 </div>
            //             </form>
            //         </Widget>
                //    /*<Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Create an account</h3>}>*/}
                //         {/*<p className="widget-auth-info">*/}
                //             {/*Please fill all fields below*/}
                //         {/*</p>*/}
                //         {/*<form className="mt" onSubmit={this.doRegister}>*/}
                //             {/*{*/}
                //                 {/*this.props.errorMessage && (*/}
                //                     {/*<Alert className="alert-sm" color="danger">*/}
                //                         {/*{this.props.errorMessage}*/}
                //                     {/*</Alert>*/}
                //                 {/*)*/}
                //             {/*}*/}
                //             {/*<div className="form-group">*/}
                //                 {/*<input className="form-control no-border" value={this.state.email}*/}
                //                        {/*onChange={this.changeEmail} type="text" required name="email"*/}
                //                        {/*placeholder="Email"/>*/}
                //             {/*</div>*/}
                //             {/*<div className="form-group">*/}
                //                 {/*<input className="form-control no-border" value={this.state.password}*/}
                //                        {/*onChange={this.changePassword} type="password" required name="password"*/}
                //                        {/*placeholder="Password"/>*/}
                //             {/*</div>*/}
                //             {/*<div className="form-group">*/}
                //                 {/*<input className="form-control no-border" value={this.state.confirmPassword}*/}
                //                        {/*onChange={this.changeConfirmPassword} onBlur={this.checkPassword} type="password" required name="confirmPassword"*/}
                //                        {/*placeholder="Confirm"/>*/}
                //             {/*</div>*/}
                //             {/*<Button type="submit" color="inverse" className="auth-btn mb-3" size="sm">{this.props.isFetching ? 'Loading...' : 'Register'}</Button>*/}
                //             {/*<p className="widget-auth-info">or sign up with</p>*/}
                //             {/*<div className="social-buttons">*/}
                //                 {/*<Button onClick={this.googleLogin} color="primary" className="social-button mb-2">*/}
                //                     {/*<i className="social-icon social-google"/>*/}
                //                     {/*<p className="social-text">GOOGLE</p>*/}
                //                 {/*</Button>*/}
                //                 {/*<Button onClick={this.microsoftLogin} color="success" className="social-button">*/}
                //                     {/*<i className="social-icon social-microsoft"*/}
                //                        {/*style={{backgroundImage: `url(${microsoft})`}}/>*/}
                //                     {/*<p className="social-text">MICROSOFT</p>*/}
                //                 {/*</Button>*/}
                //             {/*</div>*/}
                //         {/*</form>*/}
                //         {/*<p className="widget-auth-info">*/}
                //             {/*Already have the account? Login now!*/}
                //         {/*</p>*/}
                //         {/*<Link className="d-block text-center" to="login">Enter the account</Link>*/}
                //     {/*</Widget>*/}
               
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.register.isFetching,
        errorMessage: state.register.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Register));

