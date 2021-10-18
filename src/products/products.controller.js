const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./products.service");

/**
 * Route handlers for all /products routes
 */

async function list(req, res, next){
    res.status(200).json({data: await service.list()});
}

module.exports = {
    list: asyncErrorBoundary(list)
}