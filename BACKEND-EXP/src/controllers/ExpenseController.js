const expenseSchema = require("../models/ExpenseModel")
const cloudinary = require("../utils/CloudinaryConfig")
const fs = require("fs")

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
    var sort = req.query.sort || 1;
    sort = parseInt(sort);
    var datesort = req.query.date || 1
    datesort = parseInt(datesort);
    console.log(datesort)
    const type = req.query.type || "expense"
    let expenses;
    if(type =="expense"){
        //if type is expense then  fetch title description amount expDate paymentMode expCat     
        //fetch only thoese data where income filed is not there
         expenses = await expenseSchema.find({userId:userId,income:{$exists:false}},["title","description","amount","expenseDate","paymentMode","expCat"]).populate("expCat").sort({amount:sort,expenseDate:datesort})
    }
    else{
        //if type is income then fetch title description incomeCategory income expDate
        ////fetch only thoese data where expense filed is not there
         expenses = await expenseSchema.find({userId:userId,amount:{$exists:false}},["title","description","income","expenseDate","incomeCategory","paymentMode"]).populate("incomeCategory").sort({income:sort,expenseDate:datesort})
    }
    console.log(
      expenses.map(e =>e.expenseDate)
    )
    res.status(200).json({
        message:"expense",
        data:expenses
    })
}

const searchExp = async (req, res) => {
    const userId = req.user._id;
    const expName = req.query.expName || "";
    var expamount = req.query.expamount || "";
    if(expamount){
      expamount = parseInt(expamount);
  }
    try {
      const isNumber = !isNaN(expName); // check if input is number
  
      const foundexp = await expenseSchema.find({
        userId: userId,
        $or: [
          { title: { $regex: expName, $options: "i" } },
          { description: { $regex: expName, $options: "i" } },
          ...(isNumber ? [{ amount: Number(expName) }, { income: Number(expName) }] : []) // amount and income condition
        ]
      }).populate("expCat").populate("incomeCategory");
  
      res.json({
        message: "search successful",
        data: foundexp
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "error while searching expense" });
    }
  };

  const uploadReceipt = async (req, res) => {
    try {
        const expId = req.body.expId;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        let receiptUrl = "";

        // Check if Cloudinary is configured
        if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
            // Upload to Cloudinary
            const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
                folder: "expenses_receipts"
            });
            receiptUrl = cloudinaryResponse.secure_url;
            
            // Cleanup: delete local file after Cloudinary upload
            fs.unlinkSync(file.path);
        } else {
            // Fallback: Use local path (relative to server root or public folder)
            console.warn("Cloudinary keys missing! Saving file locally as fallback.");
            receiptUrl = `/uploads/${file.filename}`;
        }

        // Update database with URL (Cloudinary or Local)
        const updateExp = await expenseSchema.findByIdAndUpdate(expId, { 
            expReceipt: receiptUrl 
        }, { new: true });

        res.status(200).json({
            message: "receipt uploaded successfully",
            data: updateExp
        });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({
            message: "Error while uploading receipt",
            error: err.message
        });
    }
};

const deleteExpense = async (req, res) => {
  const id = req.params.id
  try {
    await expenseSchema.findByIdAndDelete(id)
    res.status(200).json({
      message: "expense deleted..",
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error while deleting expense",
      err: err,
    })
  }
}



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
    searchExp,
    uploadReceipt,
    deleteExpense
}