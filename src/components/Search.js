import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Search extends Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // LISTEN ESC KEY, CLOSE IF PRESSED
        const listenEscKey = (e) =>{
            e = e || window.event;
            if(e.keyCode === 27){
                this.handleClose();
            }
        }
        document.onkeydown = listenEscKey;
    }

    handleClose(){
        this.handleSearch('');
        document.onkeydown = null;
        this.props.onClose();
    }

    handleChange(e){
        this.handleSearch(e.target.value);
    }

    handleSearch(keyword){
        this.props.onSearch(keyword);
    }

    handleKeyDown(e){
        // IF PRESSED ENTER, TRIGGER TO NAVIGATE TO THE FIRST USER SHOWN
        if(e.keyCode === 13){
            if(this.props.usernames.length > 0){
                this.props.history.push('/wall/'+ this.props.usernames[0].username);
                this.handleClose();
            }
        }
    }

    render() {
        const mapDataToLinks = (data) =>{
            return data.map((user,i)=>{
                return (
                <li key={i}>
                    <Link to={`/wall/${user.username}`} onClick={this.handleClose}>{user.username}</Link>
                </li>
                );
            });
        }
        return (
            <div className="search-screen white-text">
                <div className="right">
                    <a  href="/" 
                        className="waves-effect waves-light btn red lighten-1"
                        onClick={(e)=>{
                                e.preventDefault();
                                this.handleClose();
                            }}>CLOSE</a>
                </div>
                <div className="container">
                    <input placeholder="Search a user"
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}></input>
                    <ul className="search-results">
                        { mapDataToLinks(this.props.usernames) }
                    </ul>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    onClose: PropTypes.func,
    onSearch: PropTypes.func,
    usernames: PropTypes.array
}

Search.defaultProps = {
    onClose: () =>{
        console.error('onClose not defined');
    },
    onSearch: () =>{
        console.error('onSearch not defined');
    },
    usernames: []
}

export default withRouter(Search);