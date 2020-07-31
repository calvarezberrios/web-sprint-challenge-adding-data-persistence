
exports.seed = function(knex) {
  return knex('tasks').insert([
    {description: "Clone Project", project_id: 1},
    {description: "Install Dependencies", notes: "npm i <dependencies>", project_id: 1},
    {description: "Set up server router", project_id: 2}
  ]);
};
