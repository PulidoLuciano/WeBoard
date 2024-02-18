import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Foundation from './foundation'
import Login from './pages/login'
import MainPage from './pages/main'
import Profile from './pages/profile'
import FetchingPage from './components/fetchingPage'
import ProtectedPage from './components/protectedPage'
import Account from './pages/account'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Foundation/>,
    errorElement: <div>Error</div>,
    children: [
      {
        path:"/",
        element: <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/games`}><MainPage></MainPage></FetchingPage>
      },
      {
        path: "login",
        element: <Login></Login>
      },
      {
        path: "user/:username",
        element: <FetchingPage url={`http://${import.meta.env.VITE_BACKENDURL}/users/:username/profile`}><Profile></Profile></FetchingPage>
      },
      {
        path: "account",
        element: <ProtectedPage><Account></Account></ProtectedPage>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
