
exports.seed = function(knex) {
  return knex('resources').insert([
    {name: "Computer"},
    {name: "IDE", description: "Software to write the code such as VSCode"},
    {name: "Database Schema", description: "Design the database schema in any tool like dbdesigner.net"}
  ]);
};
