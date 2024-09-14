module.exports =  [
    {
      id: 1,
      username: 'Veronica',
      password: 'Perez',
      name: 'Veronica Isabel'
    },
    {
      id: 2,
      username: 'user2',
      password: 'password456',
      name: 'Jane Smith'
    },
    {
      id: 3,
      username: 'user3',
      password: 'password789',
      name: 'Michael Johnson'
    },
    {
      id: 4,
      username: 'user4',
      password: 'password101',
      name: 'Emily Brown'
    },
    {
      id: 5,
      username: 'user5',
      password: 'password202',
      name: 'David Williams'
    }
];


/*--->
  Data de suarios simulados; que pueden reemplazados con una conexión a una base de datos en el futuro.
  
const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'admin',
    password: bcrypt.hashSync('password', 10) // Contraseña 'password' hasheada
  }
];

module.exports = users;

<---*/