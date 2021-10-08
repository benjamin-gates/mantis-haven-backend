const service = require("./updates.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next){
    res.status(200).json({data: await service.list()});
}


module.exports = {
    list: asyncErrorBoundary(list)
}