import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance'

export const MyExpenses = () => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [type, settype] = useState("expense")
  const [sort, setSort] = useState(1)
  const [dateSort, setDateSort] = useState(1)


  const getMyExpenses = async () => {
    try {
            const res = await axiosInstance.get(`/exp/expbyuserid?sort=${sort}&date=${dateSort}&type=${type}`)
            if (res.data && Array.isArray(res.data.data)) {
                setExpenses(res.data.data)
            } else {
                setExpenses([])
            }
            console.log(res.data.data)
        } catch (err) {
            console.error("Error fetching expenses", err)
        } finally {
            setLoading(false)
        }
  }
  const deleteExpense = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        const res = await axiosInstance.delete(`/exp/deleteexp/${id}`)
        if (res.status === 200) {
          getMyExpenses()
        }
      } catch (err) {
        console.error("Error deleting expense", err)
        alert("Error while deleting expense.")
      }
    }
  }

  const editExpense = (id) => {
    // Navigate to edit page or open edit modal
    alert("Edit functionality for " + id + " is under development.")
  }


  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      getMyExpenses()
      return
    }

    try {
      setLoading(true)
      const query = searchQuery.trim()
      const res = await axiosInstance.get(`/exp/search?expName=${query}`)
      setExpenses(res.data.data || [])
    } catch (err) {
      console.error("Error searching expenses", err)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    getMyExpenses()
  }, [sort, dateSort, type])

return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight">Financial Records</h1>
          <p className="text-stone-500 mt-1 italic mb-4">Comprehensive view of your cash flow</p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => settype("expense")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${type === 'expense' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>
              Expenses
            </button>
            <button 
              onClick={() => settype("income")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${type === 'income' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>
              Income
            </button>
          </div>
        </div>

        <div className="flex flex-1 max-w-xl items-center space-x-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search records by title or amount..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full bg-white px-6 py-3.5 pr-14 rounded-2xl shadow-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all text-stone-700 placeholder:text-stone-300 font-medium"
              
            />
            
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-stone-900 text-[#d4af37] rounded-xl hover:bg-stone-800 transition-all shadow-lg active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-3 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-stone-100 whitespace-nowrap">
            <span className="h-2.5 w-2.5 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_8px_#d4af37]"></span>
            <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">
              {expenses.length} Records
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
          <p className="text-stone-500 font-medium">Loading your accounts...</p>
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200 shadow-inner">
          <div className="bg-stone-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-stone-300">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-stone-800 uppercase tracking-widest">No entries found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expenses.map((ex) => {
            const isIncome = ex.income && ex.income > 0;
            const amount = isIncome ? ex.income : ex.amount;
            const categoryName = isIncome 
              ? (ex.incomeCategory?.catName || 'Income') 
              : (ex.expCat?.catName || 'Expense');

            return (
              <div
                key={ex._id}
                className="bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col group transform hover:-translate-y-2"
              >
                <div className="p-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`${isIncome ? 'bg-green-50 text-green-700 border-green-100' : 'bg-stone-50 text-stone-600 border-stone-100'} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border`}>
                      {categoryName}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${isIncome ? 'text-green-600' : 'text-red-500'}`}>
                      {isIncome ? 'Income' : 'Expense'}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-stone-800 mb-2 truncate group-hover:text-[#d4af37] transition-colors duration-300">
                    {ex.title}
                  </h3>

                  <p className="text-stone-400 text-sm line-clamp-2 mb-6 italic">
                    {ex.description || 'No description provided.'}
                  </p>

                  <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-stone-300 font-bold uppercase tracking-widest mb-1">Amount</span>
                      <span className={`text-2xl font-black font-mono ${isIncome ? 'text-green-700' : 'text-stone-900'}`}>
                        {isIncome ? '+' : '-'}${parseFloat(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border bg-stone-900 text-[#d4af37]">
                      {ex.paymentMode}
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 px-8 py-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    <svg className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(ex.expenseDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                <div className="flex space-x-3">
                  <button className="p-2 text-stone-400 hover:text-stone-900 transition-all" onClick={()=>editExpense(ex._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 text-stone-400 hover:text-red-800 transition-all" onClick={()=>deleteExpense(ex._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  )
}