import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
//import {auth1} from '../reducers/auth';

/* eslint-disable */
import ErrorPage from '../pages/error/ErrorPage';
/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
import Login from '../pages/login';
import Register from '../pages/register';
import { logoutUser } from '../actions/user';
import {auth, createUser} from '../firebase/firebase.utils';
import {setCurrentUser} from '../reducers/user/user.actions';



const PrivateRoute = ({dispatch, component, ...rest }) => {
   
    if (!Login.isAuthenticated(JSON.parse(localStorage.getItem('authenticated')))) {
        dispatch(logoutUser());
        return (<Redirect to="/login"/>)
    } else {
        return ( // eslint-disable-line
            <Route {...rest} render={props => (React.createElement(component, props))}/>
        );
    }
};

const CloseButton = ({closeToast}) => <i onClick={closeToast} className="la la-close notifications-close"/>

 
class App extends React.PureComponent {
    
    unsubscribeFromAuth=null;
    componentDidMount(){
        //const { dispatch } = this.props
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
            const userRef = await createUser(userAuth);

            userRef.onSnapshot(snapShot => {
            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
            });
            });
        }

        setCurrentUser(userAuth);
        });
       }
    componentWillUnmount(){
        this.unsubscribeFromAuth();
    }
  render() {
      
    return (
        <div>
            <ToastContainer
                autoClose={3000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
            <HashRouter>
                <Switch>
                    <Route path="/" exact render={() => <Redirect to="/carbonfootprint/homepage"/>}/>
                    <Route path="/carbonfootprint" exact render={() => <Redirect to="/carbonfootprint"/>}/>
                    <PrivateRoute path="/carbonfootprint" dispatch={this.props.dispatch} component={LayoutComponent}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/error" exact component={ErrorPage}/>
                    <Route component={ErrorPage}/>
                    <Redirect from="*" to="/carbonfootprint/homepage"/>
                </Switch>
            </HashRouter>
        </div>

    );
  }
}



const mapStateToProps = (state, user) => {
    return { 
  isAuthenticated: state.isAuthenticated,
  currentUser: user.currentUser
}};

function mapDispatchToProps (dispatch) {
    return{
  setCurrentUser: user => dispatch(setCurrentUser(user)), dispatch
}};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
