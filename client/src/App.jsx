import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserChoice from "./pages/UserChoice"
import Register from "./pages/Register"
import Login from "./pages/Login"
import BrandDashboard from "./pages/BrandDashboard/BrandDashboard"
import ConsumerDashboard from "./pages/ConsumerDashboard/ConsumerDashboard"
import Profile from "./pages/ConsumerDashboard/Profile"

function App() {
  return (
    <>
           <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/user/register" element={<UserChoice />} />
                   <Route path="/user/register/:type" element={<Register />} />
                   <Route path="/user/login" element={<Login />} />
                   { /* Dashboard Routes */}

                   <Route path="/brand/dashboard" element={<BrandDashboard />} />
                   <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
  
                   <Route path="/:id" element={<ConsumerDashboard />} />

                   {/* Consumer Routes */}
                   <Route path="/consumer/profile" element={<Profile />} />
           </Routes>
    </>
  )
}

export default App
