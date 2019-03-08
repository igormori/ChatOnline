var history = require('../model/historyModel')

exports.registerHistory = async function (req, res) {
    try{
        await history.create({
            sender:req.body.sender,
            reciever:req.body.reciever,
            message:req.body.message,
            date:req.body.date,
            time: req.body.time,
            room: req.body.room
        })
        res.status(200).send({
            message: req.body.user
        })}
        catch(error){
            res.status(404).send({
                message: req.body.user,
                error:error.message
            })
        }
    }



    exports.getHistory = async function(req,res){
        try{
            let getHistory = await history.find()
            res.status(200).send(getHistory)
            console.log(req.params.reciever)
            console.log(req.params.sender)
        }catch(error){
            res.status(400).send({
                message:"no data",
                error:error.message
    
            })
        }
    }

    
    exports.getHistoryByRoom = async function(req,res){
        try{
            let getHistory = await history.find({room:req.params.room})
            res.status(200).send(getHistory)
            console.log(req.params.reciever)
            console.log(req.params.sender)
        }catch(error){
            res.status(400).send({
                message:"no data",
                error:error.message
    
            })
        }
    }
