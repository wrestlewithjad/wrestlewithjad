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
    client: 'pg',
    connection: {
    host     : process.env.PG_HOST || 'localhost',
    user     : process.env.PG_USER || 'testUser',
    password : process.env.PG_PASSWORD || 'test123',
    database : process.env.PG_DB || 'TerminalHunger',
    charset  : 'utf8'
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
