import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import UIIcons from '../../pages/components/icons';
import ErrorPage from '../../pages/error/ErrorPage';
import UINotifications from '../../pages/notifications';
import TablesStatic from '../../pages/tables/static';
import MapsGoogle from '../../pages/components/maps/google';
import CoreTypography from '../../pages/typography';
import Charts from '../../pages/components/charts/Charts';
import Dashboard from '../../pages/dashboard';
import Calculator from '../../pages/calculator/calculator';

import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';
import Suggestions from '../../pages/suggestions/suggestions';

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }


  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          'sidebar-' + this.props.sidebarPosition,
          'sidebar-' + this.props.sidebarVisibility,
        ].join(' ')}
      >
        <div className={s.wrap}>
          
          <Sidebar />
          <div className = {s.visible}><Header /></div>
          <div className = {s.box}>
            <main className={s.content}>
              {/* <BreadcrumbHistory url={this.props.location.pathname} /> */}
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route path="/carbonfootprint" exact render={() => <Redirect to="/carbonfootprint/homepage" />} />
                    <Route path="/carbonfootprint/homepage" exact component={Dashboard} />
                    <Route path="/carbonfootprint/calculator" exact component={Calculator } />
                    <Route path="/carbonfootprint/suggestions" exact component={Suggestions } />
                    <Redirect from="*" to="/carbonfootprint/homepage"/>
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
            </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
