import roles from './roles';

export default {
  legajo: {
    name: 'Legajo Docente',
    url: 'https://www.reddit.com/',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN]
  },

  recaudaciones: {
    name: 'Recaudaciones',
    url: 'https://es.quora.com/',
    allowedRoles: [roles.ADMIN]
  },

  disponibilidad: {
    name: 'Preferencia Disponibilidad',
    url: 'https://www.freecodecamp.org/',
    allowedRoles: [roles.PROFESSOR, roles.ADMIN]
  },

  estadisticas: {
    name: 'Estadísticas',
    url: 'https://github.com/',
    allowedRoles: [roles.ADMIN]
  },

  controlTesistas: {
    name: 'Control Tesistas',
    url: 'https://runahr.com/',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN]
  },

  controlRecibos: {
    name: 'Control Recibos',
    url: 'https://www.codecademy.com/',
    allowedRoles: [roles.ADMIN]
  }  
};