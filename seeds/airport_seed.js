var seeder = require('knex-csv-seeder');

exports.seed = seeder({
  table: 'airports',
  file: '/Airports.csv',
});