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

/*   login = ({email, password, role}) => new Promise((resolve, reject) => setTimeout(() => {
    let profile;
    let newState;
    if(email === 'alumno@unmsm.edu.pe' && password === 'alumno'){
      profile = {
        name: 'Alumno Perez',
        role: roles.STUDENT,
        email: 'alumno@unmsm.edu.pe'
      };
      newState = { isAuth: true, currentUser: profile };
      this.setState(newState);
      saveState('session', newState);
      resolve(profile);
    }else if(email === 'admin@unmsm.edu.pe' && password === 'admin'){
      profile = {
        name: 'Admin Lopez',
        role: roles.ADMIN,
        email: 'admin@unmsm.edu.pe'
      };
      newState = { isAuth: true, currentUser: profile };
      this.setState(newState);
      saveState('session', newState);
      resolve(profile);
    }else{
      this.setState({ isAuth: false, currentUser: {} });
      reject({_error: 'Correo y/o contraseña incorrectos.'});
    }
  }, 1000)) */
  
  login = ({email, password, rol}) => 
    fetch('http://back-estadisticas.herokuapp.com/LoginController', {
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