import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Search } from '../components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            searchStatus:false
        }
        this.handleToggleSearch = this.handleToggleSearch.bind(this);
    }

    handleToggleSearch(){
        this.setState({
            searchStatus: !this.state.searchStatus
        });
    }

    render() {
        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        )
        const logoutButton = (
            <li>
                <a href="/" onClick={(e)=>{
                    e.preventDefault();
                    this.props.onLogout();
                }}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        )

        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue darken-1">
                        <Link to="/" className="brand-logo center" >MEMOPAD</Link>
                        <ul>
                            <li><a href="/" onClick={(e)=>{
                                    e.preventDefault();
                                    this.handleToggleSearch();
                                }}><i className="material-icons">search</i></a></li>
                        </ul>
                        <div className="right">
                            <ul>
                                {
                                    this.props.isLoggedIn ? logoutButton : loginButton
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    { this.state.searchStatus ? <Search onClose={this.handleToggleSearch} onSearch={this.props.onSearch} usernames={this.props.usernames} /> : undefined }
                </ReactCSSTransitionGroup>
            </div>
            
        );
    }
}   

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogOut: PropTypes.func
}
Header.defaultProps = {
    isLoggedIn: false,
    onLogOut: () => {
        console.error('onLogout function not defined')
    }
}



export default Header;