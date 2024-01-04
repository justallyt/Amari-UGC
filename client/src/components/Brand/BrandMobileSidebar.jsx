import { Link } from "react-router-dom"
import { CgClose } from "react-icons/cg";
import logo from "../../assets/logo.png"
import { useContext, useEffect, useRef } from "react";
import { brandSidebarContext } from "./context/sidebar";
const BrandMobileSidebar = () => {
    const [sidebarStatus, setSidebarStatus] = useContext(brandSidebarContext);
    const sidebarRef = useRef()

    const closeSidebar = () => setSidebarStatus(!sidebarStatus);
    const handleSidebarOffclick = (e) => {
             if(sidebarRef && !sidebarRef.current.contains(e.target)){
                    setSidebarStatus(false)
             }
    }

    useEffect(() => {
            document.addEventListener("click", handleSidebarOffclick, true);
    })
  return (
    <div className={sidebarStatus ? "brand-mobile-sidebar active" : "brand-mobile-sidebar"}>
                <div ref={sidebarRef}   className={ sidebarStatus ? "mobile-brand-sidebar active" : "mobile-brand-sidebar"}>
                           <div className="mobile-brand-header">
                                      <Link to={'/'}>
                                                 <img src={logo} alt="" />
                                      </Link>
                                      <span className="close-sidebar" onClick={closeSidebar}>
                                                <CgClose />
                                      </span>
                           </div>
                          
                          
                           
                </div>
    </div>
  )
}

export default BrandMobileSidebar