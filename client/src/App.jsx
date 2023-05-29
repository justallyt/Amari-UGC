import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UserChoice from "./pages/UserChoice"
import Register from "./pages/Register"
import Login from "./pages/Login"
function App() {
  return (
    <>
           <Routes>
                   <Route path="/" element={<Home />} />
                   <Route path="/user/register" element={<UserChoice />} />
                   <Route path="/user/register/:type" element={<Register />} />
                   <Route path="/user/login" element={<Login />} />
           </Routes>
    </>
  )
}

export default App
