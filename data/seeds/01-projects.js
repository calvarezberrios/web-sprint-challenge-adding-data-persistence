
exports.seed = function(knex) {
    return knex('projects').insert([
      {name: "Sprint DB Challenge", description: "The Sprint challenge creating a database server with NodeJS, KNEX, and SQLite3"},
      {name: "Todo App"}
    ]);
};
