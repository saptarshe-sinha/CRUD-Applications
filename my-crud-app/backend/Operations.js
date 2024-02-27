const Data = require('./dataModels');
const router = require('express').Router();

addData = async(req,res)=>{
    const {bankname, ctype, cname, date, bcode} = req.body;
    
    await Data.create({
        bankName : bankname,
        cType : ctype,
        cName : cname,
        date : date,
        bCode : bcode,
    });
    return res.send({msg : "New Data Saved"});
    
}

deleteData = async(req,res)=>{
    try{
        const { id } = req.params.id;
        const deleteDocument = await Data.findOneAndDelete(id);
  
        if (!deleteDocument){
            return res.send({msg : "Data Not Found!!"});
        }
        return res.send({msg : "Data deleted Succesfully"});
    }catch (e) {
        console.error("Error deleting Document: ",e);
        return res.send({msg: "Internal server Error"});
    }
}

showData = async(req,res)=>{
    try{
        const documents = await Data.find();
        return res.send(documents); 
    }catch(err){
        console.error("Error retrieving files", err);
    }
}

updateData = async(req,res)=>{
    const {id, value} = req.body.data;
    
    try{
        const document = await Data.findByIdAndUpdate(id, {
            bankName : value.bankName,
            cType : value.cType,
            cName : value.cName,
            date : value.date,
            bCode : value.bCode,
        })
            

        if (document){
            return res.send({msg : "Data Updated!!"});
        }else{
            return res.send({msg : "Data Not Found!!"}) 
        }
    }catch(err){
        console.log("Error while updating document",err);
        return res.send({msg:"Internal Server Error"});
    }

}

deleteAll = async(req,res)=>{
    try {
        await Data.deleteMany({});
        res.send({ msg : "Data deleted Successfully!!"});
    } catch (error) {
        console.log(error);
        res.send({msg : "Internal Server Error"});
    }
}

router.post("/add", addData);
router.delete("/delete/:id", deleteData);
router.get("/getData", showData);
router.put("/update", updateData);
router.delete("/delete_all", deleteAll);
module.exports = router;