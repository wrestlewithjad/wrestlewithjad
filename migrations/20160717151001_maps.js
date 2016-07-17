
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('maps', function(table){
    	table.integer('airport_id').unsigned().references('UNIQUE_ID').inTable('airports');
    	table.string('terminal')
    	table.string('map')
    })])
};

exports.down = function(knex, Promise) {
  
};