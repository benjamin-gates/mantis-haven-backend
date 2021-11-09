const knex = require("../db/connection");

function readUser(userName){
    return knex("users").select("user_name", "password").where({user_name: userName}).first();
}

module.exports = {
    readUser
}