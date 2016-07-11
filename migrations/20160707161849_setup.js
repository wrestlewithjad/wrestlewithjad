
exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.createTable('airports', function(table){
      table.increments('UNIQUE_ID').primary();
      table.string('AIRPORT_ID');
      table.string('AIRPORT_NAME');
      table.string('AIRPORT_CITY');
      table.string('MAP_IMAGE');
      table.string('AIRPORT_IMG');
    }),knex.schema.createTable('restaurants', function(table){
      table.increments('UNIQUE_ID').primary();
      table.string('TERMINAL');
      table.string('NEAR_GATE');
      table.string('NAME');
      table.string('TIMES');
      table.string('OPEN');
      table.string('CLOSE');
      table.string('TYPE');
      table.string('PRICE');
      table.string('Alcohol');
      table.string('Vegetarian');
      table.string('GF');
      table.string('SPEED');
      table.string('LOGO');
      table.string("MENU_WEBSITE")
    }),knex.schema.createTable('airportRestaurants', function(table){
      table.integer('airport_id').unsigned().references('UNIQUE_ID').inTable('airports');
      table.integer('restaurant_id').unsigned().references('UNIQUE_ID').inTable('restaurants');
    })
  ])
};


exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTable('airports'),    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('airportRestaurants')
  ])
};