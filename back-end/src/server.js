const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

var options = {
  url: "http://localhost:50000",
  method: "GET"
}

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
