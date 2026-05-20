const mongoose = require("mongoose")

const DBConnection = ()=>{

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("database conneced..")
    }).catch((err)=>{
        console.log("error while connecting db..")
    })

}
module.exports = DBConnection