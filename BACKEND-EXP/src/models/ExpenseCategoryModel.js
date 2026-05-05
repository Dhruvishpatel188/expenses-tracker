const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const expCategorySchema = new Schema({

    catName:{
        type:String
    },
    description:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }

})

expCategorySchema.pre("findOneAndDelete", async function(next) {
    const category = await this.model.findOne(this.getFilter());

    if (category) {
        await mongoose.model("expense").deleteMany({
            expCat: category._id
        });
    }

    
});
module.exports = mongoose.model("expCategory",expCategorySchema)