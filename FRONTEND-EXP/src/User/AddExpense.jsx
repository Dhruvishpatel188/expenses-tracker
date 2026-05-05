import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const AddExpense = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [categories, setcategories] = useState([])
    const navigate = useNavigate()
    const getMyCategories = async()=>{
        const res = await axiosInstance.get("/expCat/userCategory")
        console.log(res.data.data)
        setcategories(res.data.data)
    }

    useEffect(()=>{
        getMyCategories()
    },[])

    const submitHandler = async(data)=>{
     try{
        console.log(data)
        const res = await axiosInstance.post("/exp/",data)
        console.log(res)
        if(res.status==201){
            alert("expense added successfully")
            navigate("/my-expenses")
            
        }
     }catch(err){
        alert(err.response.data.message)
     }
    }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="bg-stone-900 p-8 text-white text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#d4af37]">Add New Expense</h1>
          <p className="text-stone-400 mt-2 text-sm italic">Keep track of your spending with precision</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Weekly Grocery, Netflix Subscription"
              className={`w-full px-4 py-3 bg-stone-50 border ${errors.title ? 'border-red-300' : 'border-stone-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all`}
            />
            {errors.title && <p className="text-red-500 text-xs ml-1">{errors.title.message}</p>}
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Description</label>
            <textarea
              {...register("description")}
              placeholder="Any extra details..."
              rows="2"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-stone-400">$</span>
              <input
                type="number"
                step="0.01"
                {...register("amount", { required: "Amount is required" })}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all font-mono"
              />
            </div>
            {errors.amount && <p className="text-red-500 text-xs ml-1">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Date</label>
            <input
              type="date"
              {...register("expenseDate", { required: "Date is required" })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
            />
            {errors.expenseDate && <p className="text-red-500 text-xs ml-1">{errors.expenseDate.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Category</label>
            <select
              {...register("expCat", { required: "Category is required" })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.catName}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Payment Mode</label>
            <select
              {...register("paymentMode", { required: "Payment mode is required" })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all appearance-none cursor-pointer"
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="UPI">UPI</option>
              <option value="CHEQUE">Cheque</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-stone-900 text-[#d4af37] rounded-xl font-bold text-lg shadow-lg hover:bg-stone-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Add Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}