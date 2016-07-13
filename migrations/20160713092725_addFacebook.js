
exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.table('users', function(table){
    	table.string('facebookID')
    	table.string('facebookToken')
    	table.string('facebookEmail')
    	table.string('facebookName')
    })])
};

exports.down = function(knex, Promise) {
  
};
