const service = require("./images.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware functions

function loginRequired(req, res, next) {
    if (!req.user) return res.status(401).json({status: 'Please log in'});
    return next();
  }

function bodyExists(req, res, next){
    if(!req.body.data){
        next({status: 400, message: "The body of the request must have a data property"});
    }
    else {
        next();
    }
}

function fieldsExist(req, res, next){
    const image = req.body.data;
    if(!image.caption){
        next({status: 400, message: "A caption is required"});
    } else if(!image.image_url){
        next({status: 400, message: "An image URL is required"});
    } else {
        next();
    }
}

function correctFormat(req, res, next){
    const image = req.body.data;
    if(image.image_url.substr(0, 18) !== "https://imgur.com/"){
        next({status: 400, message: "The image URL must be in the correct format."})
    } else {
        next();
    }
}

async function imageExists(req, res, next){
    const {imageId} = req.params;
    const image = await service.read(imageId);
    !image ? next({status: 400, message: `The image_id, ${imageId}, does not exist`}) : next();
}

// Services for the /images route
async function list(req, res, next){
    console.log('req cookies', req.cookies);
    // req.session.reload(function(err)  {console.log(err)});
    // console.log('req h._passporteaders', req.headers);
    res.status(200).json({data: await service.list()});
}

async function create(req, res, next){
    const image = req.body.data;
    res.status(200).json({data: await service.create(image)});
}

function authenticateUser(req, res, next) {
    passport.authenticate('local', { failureRedirect: '/login' });
    next();
}

// Services for the /images/:imageId route
async function destroy(req, res, next){
    const {imageId} = req.params;
    await service.delete(imageId);
    res.sendStatus(204);
}
let session;
async function updateImage(req, res, next){
    session = req.session;
    const {imageId} = req.params;
    const image = req.body.data;
    res.status(200).json({data: await service.updateImage(imageId, image)});
}
module.exports = {
    list: [asyncErrorBoundary(list)],
    create: [bodyExists, fieldsExist, correctFormat, asyncErrorBoundary(create)],
    delete: [asyncErrorBoundary(imageExists), asyncErrorBoundary(destroy)],
    edit: [bodyExists, fieldsExist, correctFormat, asyncErrorBoundary(imageExists), asyncErrorBoundary(updateImage)]
}