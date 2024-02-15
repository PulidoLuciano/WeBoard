import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Foundation from './foundation'
import Login from './pages/login'
import MainPage from './pages/main'
import Profile from './pages/profile'
import FetchingPage from './components/fetchingPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Foundation/>,
    errorElement: <div>Error</div>,
    children: [
      {
        path:"/",
        element: <MainPage></MainPage>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "user/:username",
        element: <FetchingPage url={`http://localhost:3000/users/:username/profile`}><Profile></Profile></FetchingPage>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
