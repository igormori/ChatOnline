var eventLogs = require('../model/eventModel.js')

exports.registerEvents = async function (req, res) {
    try{
        await eventLogs.create({
            user:req.body.user,
            date:req.body.date,
            time: req.body.time,
            event: req.body.event
        })
        res.status(200).send({
            message: req.body.user
        })
    }catch(error){
        res.status(404).send({
            message:"error to create",
            error:"cannot create"
        })
    }

}

exports.getEvents = async function(req,res){
    try{
        let newUser = await eventLogs.find()
        res.status(200).send(newUser)
    }catch(error){
        res.status(400).send({
            message:"no data",
            error:error.message

        })
    }
}