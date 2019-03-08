var users = require('../model/users')

exports.registerUsers = async function (req, res) {
    try{
        await users.create({
            user:req.body.user,
            date:req.body.date,
            time: req.body.time,
            room: req.body.room,
            connected: req.body.connected
        })
        res.status(200).send({
            message: "Done!"
        })}
        catch(error){
            res.status(404).send({
                message: req.body.user,
                error:error.message
            })
        }
        
    }



exports.editOne = async function (req, res) {
    try {
        await users.updateOne({email:req.params.email}, {
            connected: req.body.connected
        })
        res.status(200).send({
            message: "Done!"
        })
    } catch (error) {
        res.status(404).send({
            message: "Error to edit",
            error: error.message
        })
    }
}

exports.editRoom = async function (req, res) {
    try {
        await users.updateOne({email:req.params.email}, {
            room: req.body.room
        })
        res.status(200).send({
            message: "Done!"
        })
    } catch (error) {
        res.status(404).send({
            message: "Error to edit",
            error: error.message
        })
    }
}


exports.getOneUser = async function(req,res){
    try{
        let getUsers = await users.find({email:req.params.email})
        res.status(200).send(getUsers)
    }catch(error){
        res.status(400).send({
            message:"no data",
            error:error.message

        })
    }
}

exports.getusers = async function(req,res){
    try{
        let getUsers = await users.find()
        res.status(200).send(getUsers)
    }catch(error){
        res.status(400).send({
            message:"no data",
            error:error.message

        })
    }
}