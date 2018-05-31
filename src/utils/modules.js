import roles from './roles';

export default {
  legajo: {
    name: 'Legajo Docente',
    url: 'https://fisitcsld.herokuapp.com/',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN]
  },

  recaudaciones: {
    name: 'Recaudaciones',
    url: 'http://modulodecarga.herokuapp.com/',
    allowedRoles: [roles.ADMIN]
  },

  disponibilidad: {
    name: 'Preferencia Disponibilidad',
    url: 'http://sistemas.unmsm.edu.pe/',
    allowedRoles: [roles.PROFESSOR, roles.ADMIN]
  },

  estadisticas: {
    name: 'Estadísticas',
    url: 'https://xbaxtian.github.io/front-estadisticas-sigap/',
    allowedRoles: [roles.ADMIN]
  },

  controlTesistas: {
    name: 'Control Tesistas',
    url: 'http://sistemas.unmsm.edu.pe/',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN]
  },

  controlRecibos: {
    name: 'Control Recibos',
    url: 'https://modulo-control-recibos.herokuapp.com',
    allowedRoles: [roles.ADMIN]
  }  
};