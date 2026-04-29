import React, { useEffect,useState } from 'react'
import axios from '../api/axiosInstance'

export const GetMyCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

    const getAllCategories = async()=>{
        try {
            setIsLoading(true)
            const res = await axios.get("/expCat/userCategory") //token
            if (res.data && Array.isArray(res.data.data)) {
                setCategories(res.data.data)
            } else {
                setCategories([])
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([])
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getAllCategories()
    },[])

    const deleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const res = await axios.delete(`/expCat/deletecat/${id}`);
                if (res.status === 200 || res.status === 201) {
                    setCategories(categories.filter((cat) => cat._id !== id));
                    // Optional: show a success alert or toast
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Failed to delete category");
            }
        }
    };
    
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Categories</h1>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading categories...</div>
      ) : categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category._id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800 capitalize tracking-tight">
                    {category.catName}
                  </h2>
                  <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description || 'No description available for this category.'}
                </p>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono truncate mr-2" title={category._id}>
                  {/* ID: {category._id} */}
                </span>
                <button 
                  onClick={() => deleteCategory(category._id)}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors flex items-center justify-center"
                  title="Delete Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No categories</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new category.</p>
        </div>
      )}
    </div>
  )
}