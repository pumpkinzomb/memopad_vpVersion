import React, { Component } from 'react';
import {
  Header
} from './components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from './actions/authentication';
import { searchRequest } from './actions/search';
import { Switch, Route } from 'react-router-dom';
import { Home, Register, Login, Wall } from './containers';

class App extends Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleLogout(){
    const Materialize = window.Materialize;
    this.props.logoutRequest().then(()=>{
      Materialize.toast('Good Bye!', 2000);
      // EMPTIES THE SESSION
      let loginData = {
        isLoggedIn: false,
        username: ''
      }
      document.cookie = 'key=' + btoa(JSON.stringify(loginData))
    });
  }
  handleSearch(username){
    this.props.searchRequest(username);
  }
  componentWillMount(){
      function getCookie(name) {
          var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
          return value ? value[2] : null;
      }

      // get loginData from cookie
      let loginData = getCookie('key');

      // if loginData is undefined, do nothing
      if(typeof loginData === 'undefined' || loginData === null) return;
      
      // decode base64 & parse json
      loginData = JSON.parse(atob(loginData));
      console.log('cookieData',loginData);

      // if not logged in, do nothing
      if(!loginData.isLoggedIn) return;

      // page refreshed & has a session in cookie,
      // check whether this cookie is valid or not
      this.props.getStatusRequest().then(()=>{
        // if session is not valid
        if(!this.props.status.valid){
          // logout the session
          loginData = {
            isLoggedIn: false,
            username: ''
          }
          document.cookie='key=' + btoa(JSON.stringify(loginData));
          // and notify
          let $toastContent = window.$('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
          window.Materialize.toast($toastContent, 4000);
        }
      })
  }
  render() {
    /* Check whether current route is login or register using regex */
    let re= /(login|register)/;
    let isAuth = re.test(this.props.location.pathname);
    return (
      <div className="App">
        { isAuth ? undefined : 
          <Header 
            isLoggedIn={this.props.status.isLoggedIn} 
            onLogout={this.handleLogout}
            onSearch={this.handleSearch}
            usernames={this.props.usernames} /> }
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/wall/:username" component={Wall} />
            <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.status,
    usernames: state.search.usernames
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getStatusRequest: () =>{
      return dispatch(getStatusRequest());
    },
    logoutRequest: () =>{
      return dispatch(logoutRequest());
    },
    searchRequest: (username) =>{
      return dispatch(searchRequest(username))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
