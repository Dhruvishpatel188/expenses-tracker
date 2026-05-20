import React, { useEffect,useState } from 'react'
import axios from '../api/axiosInstance'

export const GetMyCategories = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setselectedCategory] = useState("income")

    const getAllCategories = async()=>{
        const res = await axios.get("/expCat/userCategory") //token
        setCategories(res.data.data)
    }

    const getAllIncomeCategories = async()=>{
      const res = await axios.get("/incomeCat/incomeCategory") //token
        if (res.data && Array.isArray(res.data.data)) {
            setCategories(res.data.data)
        } else {
            setCategories([])
        }
    }

    useEffect(()=>{
        if(selectedCategory == "expense"){
            getAllCategories()
        }else{
            getAllIncomeCategories()
        }
    },[selectedCategory])

    const deleteCategory = async(id)=>{
      try{
        const url = selectedCategory === "expense" 
          ? `/expCat/deletemycat/${id}` 
          : `/incomeCat/deleteincomecat/${id}`
        
        const res = await axios.delete(url)
        if(res.status==200){
          if(selectedCategory === "expense"){
            getAllCategories()
          } else {
            getAllIncomeCategories()
          }
        }
      } catch (err) {
        console.error(err)
        alert("error while delete cat..")
      }
    }
    
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-stone-900 tracking-tighter uppercase">My Categories</h1>
          <p className="text-stone-400 mt-1 italic">Organize your finances with bespoke categories</p>
        </div>

        <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl shadow-inner">
          <button
            onClick={() => setselectedCategory("expense")}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              selectedCategory === "expense"
                ? "bg-white text-stone-900 shadow-sm scale-100"
                : "text-stone-400 hover:text-stone-600 scale-95"
            }`}
          >
            Expenses
          </button>
          <button
            onClick={() => setselectedCategory("income")}
            className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              selectedCategory === "income"
                ? "bg-white text-stone-900 shadow-sm scale-100"
                : "text-stone-400 hover:text-stone-600 scale-95"
            }`}
          >
            Income
          </button>
        </div>
      </div>


      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group transform hover:-translate-y-2"
            >
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-stone-800 capitalize tracking-tight group-hover:text-[#d4af37] transition-colors duration-300">
                    {category.catName}
                  </h2>
                  <div className="h-10 w-10 rounded-2xl bg-stone-900 flex items-center justify-center text-[#d4af37] shadow-lg group-hover:rotate-12 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed italic">
                  {category.description || 'No description provided.'}
                </p>
              </div>
              <div className="bg-stone-50 px-8 py-4 border-t border-stone-100 mt-auto flex items-center justify-between">
                <span className="text-[10px] text-stone-300 font-bold uppercase tracking-widest">
                  Category ID: {category._id.slice(-6)}
                </span>
                <button 
                  onClick={() => deleteCategory(category._id)}
                  className="text-stone-400 hover:text-red-800 transition-all p-2 rounded-xl hover:bg-white"
                  title="Remove Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200 shadow-inner">
          <svg className="mx-auto h-16 w-16 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="mt-4 text-lg font-bold text-stone-800 uppercase tracking-widest">Awaiting Categories</h3>
          <p className="mt-1 text-sm text-stone-400 italic">Create your first category to begin your journey.</p>
        </div>
      )}
    </div>
  )
}