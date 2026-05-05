import React from 'react'
import { useForm } from 'react-hook-form'
import axios from '../api/axiosInstance'

export const AddCategory = () => {

  const { register, handleSubmit, reset } = useForm()

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/expCat", data)

      if (res.status === 201 || res.status === 200) {
        alert("Category Added Successfully ✅")
        reset()
      }

    } catch (error) {
      if (error.response?.status === 404) {
        alert("API Not Found ❌")
      } else {
        alert("Something went wrong ❌")
      }
    }
  }

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <div className="bg-stone-900 p-8 text-white text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#d4af37]">Create Category</h1>
          <p className="text-stone-400 mt-2 text-sm italic">Organize your expenses with style</p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Category Name</label>
            <div className="relative group">
              <input
                type="text"
                {...register("catName", { required: true })}
                placeholder="e.g. Travel, Food, Health"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all duration-200 group-hover:border-stone-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-stone-700 ml-1 uppercase tracking-wider">Description</label>
            <textarea
              {...register("description")}
              placeholder="Add some details..."
              rows="3"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all duration-200 hover:border-stone-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-stone-900 text-[#d4af37] rounded-xl font-bold text-lg shadow-lg hover:bg-stone-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>Create Category</span>
          </button>
        </form>
      </div>
    </div>
  )
}


// import React from 'react'
// import { useForm } from 'react-hook-form'
// import axios from '../api/axiosInstance'

// export const AddCategory = () => {

//     const {register,handleSubmit}=useForm()
//     const submitHanlder = async(data)=>{
//         //api
//         const res = await axios.post("/expCat/",data)
//         console.log(res)
//         //status check -= -->201 --->navigate -->my-categories -->toster
//     }
//   return (
//     <div>
//         <h1>ADD CATEGORY</h1>
//         <form onSubmit={handleSubmit(submitHanlder)}>
//             <div>
//                 <label htmlFor="name">Category Name</label>
//                 <input type="text" id="name" {...register("catName")} />
//             </div>
//             <div>
//                 <lable>DESCRIPTION</lable>
//                 <input type="text" id="description" {...register("description")} />
//             </div>
//             <button type="submit">Add Category</button>
//         </form>
//     </div>
//   )
// }