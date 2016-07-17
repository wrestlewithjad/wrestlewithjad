
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('userID').primary();
      table.string('username');
      table.string('password');
    }),
    knex.schema.createTable('userAirportJoin',function(table){
    	table.integer('user_id').unsigned().references('userID').inTable('users');
    	table.integer('airport_id').unsigned().references('UNIQUE_ID').inTable('airports');
      	table.integer('restaurant_id').unsigned().references('UNIQUE_ID').inTable('restaurants');
      	table.integer('userScore');
    }),
    knex.schema.table('airportRestaurants', function(table){
    	table.decimal('averageReview')
    })

  ])
};

exports.down = function(knex, Promise) {
  
};
