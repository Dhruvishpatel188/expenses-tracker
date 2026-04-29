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
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1e3a8a,_#0f172a)]">

      {/* Glass Card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl w-[380px] text-white">

        <h1 className="text-3xl font-semibold text-center mb-8 tracking-wide">
          + New Category
        </h1>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">

          {/* Floating Input */}
          <div className="relative">
            <input
              type="text"
              {...register("catName", { required: true })}
              placeholder=" "
              className="peer w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-blue-400 bg-transparent px-1">
              Category Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              {...register("description")}
              placeholder=" "
              className="peer w-full px-4 py-3 bg-transparent border border-gray-400 rounded-lg focus:outline-none focus:border-purple-400"
            />
            <label className="absolute left-3 top-3 text-gray-300 text-sm transition-all 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base 
              peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-purple-400 px-1">
              Description
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition-all duration-300 font-medium shadow-lg"
          >
            Create Category 🚀
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