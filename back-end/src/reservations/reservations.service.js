const knex = requre("../db/connection");

//insert new reservation row
function create (reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*");
}

//reads reservation using reservation id
function read (reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservation_id })
        .first();
}

//function updates reservation using reservation id
function update (reservation_id, status) {
    return knex("reservations")
        .where({ reservation_id: reservation_id })
        .update({ status: status });
}

//edit reservation using reservation id
function edit (reservation_id, reservation) {
    return knex ("reservations")
        .where ({ reservation_id: reservation_id })
        .update({ ...reservation })
        .returning("*");
}

//
function list (date, mobile_number) {
    if (date) {
        return knex("reservations")
            .select("*")
            .where ({ reservation_date: date })
            .orderBy("reservation_time", "asc");
    }

if (mobile_number) {
    return knex("reservations")
        .select("*")
        .where("mobile_number", "like", `${mobile_number}%`);
    }

    return knex("reservations")
        .select("*");
}

module.exports = {
    list,
    create,
    read,
    update,
    edit,
};