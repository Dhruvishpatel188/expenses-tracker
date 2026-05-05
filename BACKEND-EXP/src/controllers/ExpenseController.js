const expenseSchema = require("../models/ExpenseModel")

const createExpense = async(req,res)=>{


    try{

        const userId = req.user._id;
        const savedExpense = await expenseSchema.create({...req.body,userId:userId})
        res.status(201).json({
            message:"expense created..",
            data:savedExpense
        })


    }catch(err){

        res.status(500).json({
            message:"error while creating expense.."
        })
    }


}
const getExpesneByUserId = async(req,res)=>{

    const userId = req.user._id;
    const expenses = await expenseSchema.find({userId:userId}).populate("expCat")
    res.status(200).json({
        message:"expense",
        data:expenses
    })
}

const searchExp = async (req, res) => {
    const userId = req.user._id;
    const expName = req.query.expName || "";
  
    try {
      const isNumber = !isNaN(expName); // check if input is number
  
      const foundexp = await expenseSchema.find({
        userId: userId,
        $or: [
          { title: { $regex: expName, $options: "i" } },
          { description: { $regex: expName, $options: "i" } },
          ...(isNumber ? [{ amount: Number(expName) }] : []) // amount condition
        ]
      }).populate("expCat");
  
      res.json({
        message: "search successful",
        data: foundexp
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error while searching expense" });
    }
  };

// const searchExp = async(req,res)=>{
//     const userId = req.user._id;
//     const expName = req.query.expName || "";
    
//     try{
//         const foundexp = await expenseSchema.find({
//             userId: userId,
//             $or:[
//                 { title: { $regex: expName, $options: 'i' } },
//                  { description: { $regex: expName, $options: 'i' } },
//             ]
//         }).populate("expCat")

//         res.json({
//             message: "search successful",
//             data: foundexp
//         })  
//     } catch(err) {
//         console.log(err)
//         res.status(500).json({ message: "error while searching expense" })
//     }
// }


module.exports={
    createExpense,
    getExpesneByUserId,
    searchExp
}