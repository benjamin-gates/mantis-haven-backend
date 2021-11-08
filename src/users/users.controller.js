const service = require("./users.service");
const bcrypt = require("bcrypt");
const asynErrorBoundary = require("../errors/asyncErrorBoundary");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function createUser(req, res, next){
    try {const hashedPassword = await bcrypt.hash(req.body.data.password, 10);
    console.log('hashed', hashedPassword);
    const user = {
        user_name: req.body.data.user_name,
        password: hashedPassword
    }
    res.status(200).json({data: await service.createUser(user)})}
    catch (error){
        res.status(500).send(`Error: ${error}`)
    }
}

async function destroy(req, res, next){
    const {userId} = req.params;
    await service.delete(userId);
    res.sendStatus(204);
}


module.exports = {
    createUser: asynErrorBoundary(createUser),
    delete: asyncErrorBoundary(destroy),

}