import React, { useEffect } from "react"
import Navbar from "./components/Navbar"
import { Routes,Route, Navigate, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import Settings from "./pages/Settings.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import useAuthStore from "./store/useAuthStore.js"
import {Loader} from "lucide-react"
import toast,{Toaster} from "react-hot-toast"
import ThemeProvider from "./components/ThemeProvider.jsx"
import ThemeSettingsPage from "./pages/Settings.jsx"
const App = () => {
  const {checkAuth,authUser,isCheckingAuth,onlineUsers} = useAuthStore()
  useEffect(() => {
    checkAuth()
  },[checkAuth])
  if(isCheckingAuth && !authUser){
     return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
     )
  }
  
  console.log(onlineUsers)

  console.log({authUser})
  const location = useLocation()
  const hideNavbar = location.pathname == "/login" || location.pathname == "/signup"
  return (
    <div>
      {!hideNavbar && <Navbar/>}
      <ThemeProvider>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser ? <SignUpPage/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={authUser ? <Settings/> : <Navigate to="/login"/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      </ThemeProvider>
      <Toaster />
    </div>
  )
}

export default App