// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './airports.sqlite3'
    }
  },
  // development: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'TerminalHunger'
  //   }
  // },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'TerminalHunger',
      user:     'testUser',
      password: 'test123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
