import roles from './roles';

export default {
  7: {
    name: 'Legajo Docente',
    url: 'https://fisitcsld.herokuapp.com',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN],
    icon: "user"
  },

  1: {
    name: 'Carga de Recaudaciones',
    url: 'http://modulodecarga.herokuapp.com',
    allowedRoles: [roles.ADMIN],
    icon: "piggy-bank"
  },

  5: {
    name: 'Disponibilidad Docente',
    url: 'http://disponibdocente.herokuapp.com',
    allowedRoles: [roles.PROFESSOR, roles.ADMIN],
    icon: "calendar"
  },

  3: {
    name: 'Estadísticas',
    url: 'https://xbaxtian.github.io/front-estadisticas-sigap',
    allowedRoles: [roles.ADMIN],
    icon: "stats"
  },

  6: {
    name: 'Control Tesistas',
    url: 'https://control-tesis-app.herokuapp.com',
    allowedRoles: [roles.STUDENT, roles.PROFESSOR, roles.ADMIN],
    icon: "education"
  },

  2: {
    name: 'Control de Recibos',
    url: 'https://modulo-control-recibos.herokuapp.com',
    allowedRoles: [roles.ADMIN],
    icon: "list-alt"
  },

  4: {
    name: 'Estado de Pagos',
    url: 'http://modulo-alumno-ui.herokuapp.com',
    allowedRoles: [roles.ADMIN],
    icon: "usd"
  },
};