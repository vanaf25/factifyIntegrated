import React, { useState } from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import './SideBar.css';
import { useUser } from "../../context/UserContext";
function capitalizeFirstLetter(str) {
    if (str?.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const SideBar = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {pathname}=useLocation();
    const navigate=useNavigate();
    const { user,setUser} = useUser();
    if(!user) return <></>
    const handleMouseEnter = () =>{
       if (window.innerWidth>600){
           setIsHovered(true);
       }
    }
    const resizeEvent=()=>{
        if (window.innerWidth>600) setIsOpen(false)
    }
    window.addEventListener("resize",resizeEvent);
    const handleMouseLeave = () =>{
        if (window.innerWidth>600){
            setIsHovered(false);
        }
    }

    const toggleSidebar = () => setIsOpen(!isOpen);

    const logOutHandle=()=>{
        localStorage.setItem("token","")
        setUser(null);
        navigate("/signIn")
    }
    const pagesWithOutSideBar=["signIn","signUp","forgot-password","reset-password"];
    return (
        <>
            {!pagesWithOutSideBar.includes(pathname.substring(1)) ?
            <>
                {!isOpen && <div className="hamburger-menu" onClick={toggleSidebar}>
                    <i className="fas fa-bars"></i>
                </div>}

                <aside
                    className={`sidebar ${isOpen ? 'open' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div>
                        {(isHovered || isOpen)  && (
                            <Link to={"/"}>
                                <div className="logo">
                                    <span className="logo-Factify">Factify</span><span className="logo-gpt">GPT</span>
                                </div>
                            </Link>
                        )}
                        <Link to={"/"}>
                            <div className="sidebar-item">
                                <i className="fas fa-home"></i>
                                <span>Home</span>
                            </div>
                        </Link>
                        <Link to={"/favorites"}>
                            <div className="sidebar-item">
                                <i className="fas fa-star"></i>
                                <span>Favorites</span>
                            </div>
                        </Link>
                        <Link to={"/settings"}>
                            <div className="sidebar-item">
                                <i className="fas fa-cog"></i>
                                <span>Settings</span>
                            </div>
                        </Link>
                        {user?.role==="admin" ? <Link to={"/dashboard/users"}>
                            <div className="sidebar-item">
                                <i className="fa fa-dashboard"></i>
                                <span>Dashboard</span>
                            </div>
                        </Link>:"" }
                    </div>
                    {(isHovered || isOpen)  && (
                        <div className="sidebar-footer">
                            <div className="credits">
                                <span>Credits</span>
                                <span>{user?.credits}</span>
                            </div>
                            <div style={{marginBottom: "10px"}} className="plan">
                                <span>Plan: </span>
                                <span>
                                    {user.subscription ?  `${capitalizeFirstLetter(user?.subscription)} Plan`:"No plan yet"}
                                </span>
                            </div>
                            <Link to={"/upgrade"}>
                                <button  className="upgrade-btn mb-2">Upgrade Plan</button>
                            </Link>
                            <button
                                onClick={logOutHandle}
                                className="bg-secondary w-full hover:bg-secondaryDark
                                 text-white font-bold py-2 px-4 border border-secondaryDark rounded">
                                Log out
                            </button>
                        </div>
                    )}
                </aside>

                {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
            </>:""}
        </>
    );
};

export default SideBar;
