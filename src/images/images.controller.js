const service = require("./images.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function list(req, res, next){
    res.status(200).json({data: await service.list()});
}

module.exports = {
    list: asyncErrorBoundary(list)
}