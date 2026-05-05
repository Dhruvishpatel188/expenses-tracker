const expenseController = require("../controllers/ExpenseController")
const router = require("express").Router()
const authMiddleware =require("../middleware/AuthMiddleware")
router.post("/",authMiddleware,expenseController.createExpense)
router.get("/expbyuserid",authMiddleware,expenseController.getExpesneByUserId)
router.get("/search",authMiddleware,expenseController.searchExp)
module.exports = router