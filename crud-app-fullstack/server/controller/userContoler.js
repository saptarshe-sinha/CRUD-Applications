const User = require('../model/userModel')

const create = async(req,res) => {
    try {
        const userData = new User(req.body)

        if(!userData){
            return res.status(404).json({msg:"user data not found"})
        } 

        const savedData = await userData.save();  //save to the database
        res.status(200).json({msg:"User Created Successfully"});

    } catch (error) {
        res.status(500).json({err:error})
    }
}

const getAll = async(req,res) => {
    try {
        const userData = await User.find();

        if(!userData) {
            return res.status(404).json({msg:"user not found"})
        }

        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({err:error})
    }
}

const getOne =  async(req, res) => {
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist) {
            return res.status(404).json({msg:"User Not Found"})
        }

        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({err:error})
    }
}

const update = async(req, res) => {

    try {
        const id = req.params.id;

        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"User Not Found"})
        }

        const updateData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg:"User Updated Successfully"})
        
        
    } catch (error) {
        res.status(500).json({err:error})
    }
}

const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userExist = User.findById(id);
        if(!userExist) {
            return res.status(404).json({msg: "User not found"})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User Deleted Successfully"})

    } catch (error) {
        res.status(500).json({err:error})
    }
}

module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleteUser
}