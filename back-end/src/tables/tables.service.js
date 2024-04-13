const knex = require("../db/connection");

function list () {
    return knex("tables")
        //.select("*")
        .orderBy("table_name");
}

function read (table_id) {
    return knex("tables")
        //.select("*")
        .where({ table_id })
        .first();
}

function create(table) {
    return knex("tables")
        .insert(table)
        .returning("*")
        .then((data) => data[0]);
}

function update(table) {
    return knex(tableName)
    .update(table, "*")
    .where({ table_id: table.table_id });
    
  }

// function updateReservation(reservation_id, status) {
//     return knex("reservations")
//         .where ({ reservation_id: reservation_id })
//         .update ({ status: status });
// }

// function readReservation (reservation_id) {
//     return knex("reservations")
//         .select("*")
//         .where({ reservation_id: reservation_id })
//         .first();
// }

// function occupy(table_id, reservation_id) {
//     return knex("tables")
//         .where({ table_id: table_id})
//         .update({ reservation_id: reservation_id, status: "occupied" });
// }

// function free (table_id) {
//     return knex("tables")
//         .where({ table_id: table_id })
//         .update({ reservation_id: null, status: "free" });
// }

module.exports = {
    list,
    create,
    read,
    update,
    // occupy,
    // free,
    // readReservation,
    // updateReservation,
};