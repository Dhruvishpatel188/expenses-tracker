import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from "../common/Login"
import { UserNavbar } from "../User/UserNavbar"
import { ExpenseDashboard } from "../User/ExpenseDashboard"
import { AddCategory } from "../User/AddCategory"
import { GetMyCategories } from "../User/GetMyCategories"
import {AddExpense} from "../User/AddExpense"
import {MyExpenses} from "../User/MyExpenses"

const AppRoutes = ()=>{


    const router = createBrowserRouter([
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"",
            element:<UserNavbar/>,
            children:[
                {
                    path:"",
                    element:<ExpenseDashboard/>
                },
                {
                    path:"add-category",
                    element:<AddCategory/>
                },{
                    path:"my-categories",
                    element:<GetMyCategories/>
                },{
                    path:"add-expense",
                    element:<AddExpense/>
                },
                {
                    path:"my-expenses",
                    element:<MyExpenses/>
                }
            ]
        }
        // {
        //     path:"/signup",
        //     element:<Signup/>
        // }
    ])

    return <RouterProvider router={router} />

}
export default AppRoutes;