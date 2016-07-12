

exports.up = function(knex, Promise) {
	
	return Promise.all([knex.schema.table('airportRestaurants', function(table){
    	table.integer('reviewerTotal')
    })])
  
};

exports.down = function(knex, Promise) {
  
};
