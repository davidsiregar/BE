const {user} = require("../models")

exports.getDetailUser= async(req, res)=>{
  try{
    let getUser= await user.findOne({
      where:{id: req.body.id}
    })
    return res.status(200).send({
      message: "retrieve success",
      data: getUser.dataValues
    })
  }catch(err){
    res.status(500).send({
      code: 500,
      status: false,
      message: err.message,
      data:null,
    })
  }
}

exports.updateUser=async(req, res)=>{
  try{
    const {username, email, password} = req.body

    let update = await user.update({
      username: username,
      email: email,
    },
    {
      where: {id: req.body.id},
    })

    let getUser= await user.findOne({
      where: {id:req.body.id},
    })

    return res.status(201).send({
      message: "user updated",
      data: getUser.dataValues
    })
  }catch(err){
    res.status(500).send({
      code: 500,
      status: false,
      message: err.message,
      data:null,
    })
  }
}

exports.deleteUser=async(req,res)=>{
  try{
    let deleted= user.destroy({
      where: {id:req.body.id}
    })

    return res.status(200).send({
      message: "user deleted"
    })
  }
  catch(err){
    res.status(500).send({
      code: 500,
      status: false,
      message: err.message,
      data:null,
    })
  }
}

exports.getAllUser=async(req,res,next)=>{
  try{
    let getUsers=await user.findAll()

    return res.status(200).send({
      message: "retrieve success",
      data: getUsers
    })
  }catch(err){
    res.status(500).send({
      code: 500,
      status: false,
      message: err.message,
      data:null,
    })
  }
}