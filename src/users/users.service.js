const knex = require("../db/connection");

function read(userName, hash){
    return knex("users").select("*").where({user_name: userName, password: hash}).first();
}

function createUser(user){
    return knex("users").insert(user).returning("*").then((createdRecords) => createdRecords[0]);
}

function destroy(userId){
    return knex("users").where({user_id: userId}).del();
}

module.exports = {
    read,
    createUser,
    delete: destroy
}