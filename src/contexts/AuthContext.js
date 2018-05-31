import React from 'react';

import { loadState, saveState, removeState } from '../utils/localStorage';
import roles from '../utils/roles';

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    currentUser: {},
    ...loadState('session')
  }

  login = ({email, password}) => new Promise((resolve, reject) => setTimeout(() => {
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
  }, 1000)) 

  logout = () => setTimeout(() => {
    this.setState({isAuth: false, currentUser: {}});
    removeState('session');
  }, 1000)

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