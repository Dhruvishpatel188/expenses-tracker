import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'

export const AddExpense = () => {
    const {register,handleSubmit,formState:{errors}, watch}=useForm()
    const [categories, setcategories] = useState([])
    const [type, setType] = useState("expense")
    const navigate = useNavigate()
    
    // Watch the receipt field to display selected file name
    const receiptFile = watch("receipt");

    const getMyCategories = async()=>{
        const endpoint = type === "expense" ? "/expCat/userCategory" : "/incomeCat/incomeCategory"
        try {
            const res = await axiosInstance.get(endpoint)
            setcategories(res.data.data)
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(()=>{
        getMyCategories()
    },[type])

    const submitHandler = async(data)=>{
     try{
        console.log(data)
        
        let payload = {
            title: data.title,
            description: data.description,
            expenseDate: data.expenseDate,
            paymentMode: data.paymentMode,
        };

        if (type === "expense") {
            payload.amount = data.amount;
            payload.expCat = data.category;
        } else {
            payload.income = data.amount;
            payload.incomeCategory = data.category;
        }

        const res = await axiosInstance.post("/exp/", payload)
        console.log(`${type} created:`, res.data)

        if(res.status === 201){
            const selectedFile = data.receipt && data.receipt[0];
            
            // Step 2: If a file is selected, upload it
            if(selectedFile){
                const formData = new FormData();
                formData.append("expId", res.data.data._id);
                formData.append("receipt", selectedFile);

                const res2 = await axiosInstance.put("/exp/uploadreceipt", formData);
                if(res2.status === 200){
                    alert(`${type} added successfully with receipt`);
                    navigate("/my-expenses");
                }
            } else {
                alert(`${type} added successfully`);
                navigate("/my-expenses");
            }
        }
     }catch(err){
        console.error(err);
        alert(err.response?.data?.message || "Something went wrong");
     }
    }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="bg-stone-900 p-8 text-white text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#d4af37]">Add New Record</h1>
          <p className="text-stone-400 mt-2 text-sm italic">Track your income and expenses with precision</p>
        </div>
        
        <form onSubmit={handleSubmit(submitHandler)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Entry Type</label>
            <div className="flex space-x-4">
                <button 
                  type="button" 
                  onClick={() => setType("expense")}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === "expense" ? "bg-red-500 text-white shadow-lg" : "bg-stone-100 text-stone-400 hover:bg-stone-200"}`}
                >
                    Expense
                </button>
                <button 
                  type="button" 
                  onClick={() => setType("income")}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${type === "income" ? "bg-green-600 text-white shadow-lg" : "bg-stone-100 text-stone-400 hover:bg-stone-200"}`}
                >
                    Income
                </button>
            </div>
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder={type === "expense" ? "e.g. Netflix, Grocery" : "e.g. Salary, Freelance"}
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
              {...register("category", { required: "Category is required" })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all appearance-none cursor-pointer"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.catName}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs ml-1">{errors.category.message}</p>}
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

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Receipt (Optional)</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-stone-200 border-dashed rounded-2xl cursor-pointer bg-stone-50 hover:bg-stone-100 hover:border-stone-400 transition-all group">
                    <div className="flex flex-col items-center justify-center py-6 px-4">
                        <div className="p-3 bg-stone-200 rounded-full text-stone-600 group-hover:bg-stone-900 group-hover:text-[#d4af37] transition-colors mb-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <p className="text-sm text-stone-600 font-medium">
                            {receiptFile && receiptFile[0] ? (
                                <span className="text-stone-900 font-bold">{receiptFile[0].name}</span>
                            ) : (
                                "Click to upload receipt image"
                            )}
                        </p>
                        <p className="text-xs text-stone-400 mt-1">PNG, JPG or PDF up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      {...register("receipt")} 
                      accept="image/*,.pdf"
                    />
                </label>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 pt-4">
            <button
              type="submit"
              className={`w-full py-4 ${type === 'expense' ? 'bg-stone-900 text-[#d4af37]' : 'bg-green-700 text-white'} rounded-xl font-bold text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2`}
            >
              <span>Add {type === 'expense' ? 'Expense' : 'Income'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}