import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {dismissAlert} from '../../actions/alerts';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup';
import Button from 'reactstrap/lib/Button';
import PowerIcon from "../Icons/HeaderIcons/PowerIcon";
import {auth} from '../../firebase/firebase.utils'
import {changeActiveSidebarItem} from '../../actions/navigation';
import {logoutUser} from '../../actions/user';
import HomeIcon from '../Icons/SidebarIcons/HomeIcon';
import TablesIcon from '../Icons/SidebarIcons/TablesIcon';
import ComponentsIcon from '../Icons/SidebarIcons/ComponentsIcon';




class Sidebar extends React.Component {
    static propTypes = {
        sidebarStatic: PropTypes.bool,
        sidebarOpened: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        activeItem: PropTypes.string,
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
    };

    static defaultProps = {
        sidebarStatic: false,
        activeItem: '',
    };

    constructor(props) {
        super(props);

        this.doLogout = this.doLogout.bind(this);
    }

    componentDidMount() {
        this.element.addEventListener('transitionend', () => {
            if (this.props.sidebarOpened) {
                this.element.classList.add(s.sidebarOpen);
            }
        }, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
            if (nextProps.sidebarOpened) {
                this.element.style.height = `${this.element.scrollHeight}px`;
            } else {
                this.element.classList.remove(s.sidebarOpen);
                setTimeout(() => {
                    this.element.style.height = '';
                }, 0);
            }
        }
    }

    dismissAlert(id) {
        this.props.dispatch(dismissAlert(id));
    }

    doLogout() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <nav
                className={cx(s.root)}
                ref={(nav) => {
                    this.element = nav;
                }}
            >
                <header className={s.logo}>
                    <h4>Carbon Footprint</h4>
                </header>
                <ul className={s.nav}>
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="HomePage"
                        isHeader
                        iconName={<HomeIcon className={s.menuIcon} />}
                        link="/carbonfootprint/homepage"
                        index="homepage"
                    />
                    {/* <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Typography"
                        isHeader
                        iconName={<TypographyIcon className={s.menuIcon} />}
                        link="/app/typography"
                        index="core"
                    /> */}
                    {/* <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Calculator"
                        isHeader
                        iconName={<TablesIcon className={s.menuIcon} />}
                        link="/carbonfootprint/calculator"
                        index="calculator"
                    /> */}
                    <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Calculator"
                        isHeader
                        iconName={<TablesIcon className={s.menuIcon} />}
                        link="/carbonfootprint/calculator"
                        index="calculator"
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Suggestions"
                        isHeader
                        iconName={<ComponentsIcon className={s.menuIcon}/>}
                        link="/carbonfootprint/suggestions"
                        index="suggestions"
                    />
                    {/* <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Notifications"
                        isHeader
                        iconName={<NotificationsIcon className={s.menuIcon}/>}
                        link="/app/notifications"
                        index="ui"
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Components"
                        isHeader
                        iconName={<ComponentsIcon className={s.menuIcon}/>}
                        link="/app/components"
                        index="components"
                        childrenLinks={[
                            {
                                header: 'Charts', link: '/app/components/charts',
                            },
                            {
                                header: 'Icons', link: '/app/components/icons',
                            },
                            {
                                header: 'Maps', link: '/app/components/maps',
                            },
                        ]}
                    /> */}
                    <Button  className={s.logbtn} onClick={()=> {
                        auth.signOut();
                        localStorage.removeItem('autheticated');
                        this.doLogout()}}>
                     <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Logout"
                        isHeader
                        iconName={<PowerIcon className={s.menuIcon}/>}
                        link="/login"
                       
                        index="logout"
                    />
                    </Button>
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(store) {
    return {
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
        alertsList: store.alerts.alertsList,
        activeItem: store.navigation.activeItem,
    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));