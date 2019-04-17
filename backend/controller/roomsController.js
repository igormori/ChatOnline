var rooms = require('../model/rooms')

    exports.getRooms = async function(req,res){
        try{
            let getRooms = await rooms.find()
            res.status(200).send(getRooms)
            console.log(req.params.reciever)
            console.log(req.params.sender)
        }catch(error){
            res.status(400).send({
                message:"no data",
                error:error.message
            })
        }
    }

     exports.createRoom = async function(req,res){
         await rooms.findOne({ name: req.body.name}).then(
            (result) => {
                if (result) {
                  res.status(500).send("erro user already exists")
                 
                } else {
                  
                    rooms.create({
                    id : req.body.id,
                    name : req.body.name,
                    createdDate :req.body.createdDate ,
                    editDate:req.body.editDate,
                    status:req.body.status
              
                  },
                  function (err, user) {
                    res.status(200).send("room created");
                  });
          }
        }).catch(err => {
            console.log(err)
        });
    }

    exports.editRoom = async function(req,res){
        try {
            await rooms.findOne({ name: req.body.name }).then(
                (result) => {
                    if (result) {
                      res.status(500).send("erro user already exists")
                     
                    } else {
                        rooms.updateOne({name:req.params.name}, {
                            id : req.body.id,
                            name : req.body.name,
                            createdDate :req.body.createdDate ,
                            editDate:req.body.editDate,
                            status:req.body.status
                    }).then(
                        (result) =>
                        {
                            if(result.nModified == 1){
                                res.status(200).send({
                                    message: "Room edited",
                                })
                            }else{
                                res.status(500).send({
                                    message: "Error to edit",
                                })
                            }
                        }
                    )
                    }            
                })
        } catch (error) {
            res.status(404).send({
                message: "Error to edit",
                error: error.message
            })
        }
   }

