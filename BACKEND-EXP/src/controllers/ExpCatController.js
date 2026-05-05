const req = require("express/lib/request")
const expCategory = require("../models/ExpenseCategoryModel")
const createExpenseCategory = async(req,res)=>{

    try{

        console.log("req.user...",req.user)
        //const savedExp = await expCategory.create(req.body) //tile,description,token
       const savedExp = await expCategory.create({...req.body,userId:req.user._id}) //tile,description,token 
        res.status(201).json({
            message:"expCat saved..",
            cat:savedExp
        })
    }catch(err){
        res.status(201).json({
            message:"errow while saving expCat ",
            err:err
        })

    }



}

const getExpensecategoriesByUserId = async(req,res)=>{

    const userId = req.user._id;
    const categories = await expCategory.find({userId:userId})
    res.status(200).json({
        data:categories
    })

}

const deleteMyCategory = async(req,res)=>{

    const catid = req.params.id
    try{

        await expCategory.findByIdAndDelete(catid) //internally findOneAndDelete
        res.status(200).json({
            message:"cat deleted.."
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while deleting category",
            err:err
        })
    }


}
module.exports = {
    createExpenseCategory,getExpensecategoriesByUserId,deleteMyCategory
}