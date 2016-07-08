
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('airports', function(table){
      table.increments('UNIQUE ID').primary();
      table.string('AIRPORT ID');
      table.string('AIRPORT NAME');
      table.string('AIRPORT CITY');
      table.string('MAP IMAGE');
      table.string('AIRPORT IMG');
    }),knex.schema.createTable('restaurants', function(table){
      table.increments('UNIQUE ID').primary();
      table.string('TERMINAL');
      table.string('NEAR GATE(S)');
      table.string('NAME');
      table.string('TIMES');
      table.string('OPEN');
      table.string('CLOSE');
      table.string('TYPE');
      table.string('PRICE');
      table.string('SPEED');
      table.string('LOGO');
      table.string("MENU/WEBSITE")
    }),knex.schema.createTable('airportRestaurants', function(table){
      table.integer('airport_id').unsigned().references('airportID').inTable('airports');
      table.integer('restaurant_id').unsigned().references('restaurantID').inTable('restaurants');
    })
  ])
};


exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('airports'),    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('airportRestaurants')
  ])
};