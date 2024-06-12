import React from 'react'
import "./App.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Leyout from './leyout/leyout'
import CardById from './pages/cardById/cardById'
import Home from './pages/home/home'
import Login from './pages/login/login'



const App = () => {
  const router = createBrowserRouter([
    {
      path : "login",
      element : <Login/>
    },
    {
      path : "/",
      element : <Leyout/>,
      children : [
        {
          element : <Home/>,
          index : true
        },
        {
          path : "cardByid/:id",
          element : <CardById/>
        }
      ]
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
