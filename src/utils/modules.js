import React from 'react';
import roles from './roles';

export default {
  legajo: {
    name: 'Legajo Docente',
    url: 'https://fisitcsld.herokuapp.com/',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN],
    icon: <span className="glyphicon glyphicon-user"/>
  },

  recaudaciones: {
    name: 'Carga de Recaudaciones',
    url: 'http://modulodecarga.herokuapp.com/',
    allowedRoles: [roles.ADMIN],
    icon: <span className="glyphicon glyphicon-piggy-bank"/>
  },

  disponibilidad: {
    name: 'Disponibilidad Docente',
    url: 'http://disponibdocente.herokuapp.com/',
    allowedRoles: [roles.PROFESSOR, roles.ADMIN],
    icon: <span className="glyphicon glyphicon-calendar"/>
  },

  estadisticas: {
    name: 'Estadísticas',
    url: 'https://xbaxtian.github.io/front-estadisticas-sigap/',
    allowedRoles: [roles.ADMIN],
    icon: <span className="glyphicon glyphicon-stats"/>
  },

  controlTesistas: {
    name: 'Control Tesistas',
    url: 'http://sistemas.unmsm.edu.pe/',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN],
    icon: <span className="glyphicon glyphicon-education"/>
  },

  controlRecibos: {
    name: 'Control de Recibos',
    url: 'https://modulo-control-recibos.herokuapp.com',
    allowedRoles: [roles.ADMIN],
    icon: <span className="glyphicon glyphicon-list-alt"/>
  },

  estadoPagos: {
    name: 'Estado de Pagos',
    url: 'http://modulo-alumno-ui.herokuapp.com',
    allowedRoles: [roles.ADMIN],
    icon: <span className="glyphicon glyphicon-usd"/>
  },  
};