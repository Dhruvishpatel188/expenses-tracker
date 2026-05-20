require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors()) // () <<-- dont forget this
app.use("/uploads", express.static("uploads"))

const userRoutes = require("./src/routes/UserRoutes")
app.use("/user",userRoutes)


const expCategoryRoutes = require("./src/routes/ExpCategoryRoutes")
app.use("/expCat",expCategoryRoutes)

const expenseRoutes = require("./src/routes/ExpenseRoutes")
app.use("/exp",expenseRoutes)

const incomeCategoryRoutes = require("./src/routes/IncomeCategoryRoutes")
app.use("/incomeCat",incomeCategoryRoutes)


//DBCONNECTION:
const DBConnection = require("./src/utils/DBConnection")
DBConnection()

//server creation..
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})