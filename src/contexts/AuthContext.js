import React from 'react';
import _ from 'lodash';

import { loadState, saveState, removeState } from '../utils/localStorage';
import modules from '../utils/modules';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    currentUser: {},
    ...loadState('session')
  }
  
  login = ({email, password, rol}) => 
    fetch(`${process.env.REACT_APP_API_ROOT}/LoginController`, {
      method: 'POST',
      body: JSON.stringify({
        user: email,
        pass: password,
        tipo: rol
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.ok ? response.json() : Promise.reject({_error: 'Hubo un error'}))
    .then(response => {
      if(response.return === 'failure' || response.result === 'error'){
        return Promise.reject({_error: 'Datos incorrectos'});
      }else{
        const newState = {
          isAuth: true,
          currentUser: {
            id: response.id,
            user: response.user,
            tipo: rol,
            modules: _.compact(response.modulos.map(m => modules[parseInt(m.modulos, 10)]))
          }
        };
        this.setState(newState);
        saveState('session', newState);
        return newState.currentUser;
      }
    })

  logout = () => setTimeout(() => {
    this.setState({isAuth: false, currentUser: {}});
    removeState('session');
  }, 300)

  render() {
    const value = {
      isAuth: this.state.isAuth,
      currentUser: this.state.currentUser,
      login: this.login,
      logout: this.logout
    };
    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };

//probando acceso al repositorio