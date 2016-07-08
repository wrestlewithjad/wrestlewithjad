
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('userID').primary();
      table.string('username');
      table.string('password');
    }),
    knex.schema.createTable('userAirportJoin',function(table){
    	table.integer('user_id').unsigned().references('userID').inTable('users');
    	table.integer('airport_id').unsigned().references('airportID').inTable('airports');
      	table.integer('restaurant_id').unsigned().references('restaurantID').inTable('restaurants');
      	table.integer('userScore');
    }),
    knex.schema.table('airportRestaurants', function(table){
    	table.integer('averageReview')
    })

  ])
};

exports.down = function(knex, Promise) {
  
};
