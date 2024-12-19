import React from 'react';
import {Link} from "react-router-dom";
import './Styles.css'
import {useUser} from "../../context/UserContext";
const AdminDashboard = () => {
    const {user}=useUser()
    if(user?.role!=="admin") return <></>
    const currentRoute="/dashboard"
    const pages=[
        {href:`${currentRoute}/manageUsers`,text:"Manage Users"},
        {href:`${currentRoute}/LTD`,text:"Generate LTD Code"},
        {href:`${currentRoute}/GenerateCouponCode`,text:"Generate Coupon Code"},
        {href:`${currentRoute}/settings`, text:"Settings"}]
    return (
        <aside className={"bg-[#2C3E50] px-2 text-white width-200 hover:width-250 flex flex-col" +
            "  fixed h-screen "}>
            <div className={"mb-3"}>
               <Link to={"/"}>
                   {<div className="logo">
                       <span className="text-white">Factify</span><span className="logo-gpt">GPT</span>
                   </div>}
               </Link>
            </div>
            <div>
                {pages.map(el=>(<div className={"text-white hover:text-primary"}
                                     key={el.href}>
                    <Link to={el.href}>{el.text}</Link>
                </div>))}
            </div>
        </aside>
    );
};

export default AdminDashboard;