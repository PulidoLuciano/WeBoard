import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Foundation from './foundation'
import Login from './pages/login'
import MainPage from './pages/main'
import Profile from './pages/profile'
import ProtectedPage from './components/protectedPage'
import Account from './pages/account'
import Ranking from './pages/ranking'
import Instructions from './pages/instructions'
import LoadingPage from './pages/loading'

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
        element: <Profile></Profile>
      },
      {
        path: "account",
        element: <ProtectedPage><Account></Account></ProtectedPage>
      },
      {
        path: ":game/ranking",
        element: <Ranking></Ranking>
      },
      {
        path: ":game/instructions",
        element: <Instructions></Instructions>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
