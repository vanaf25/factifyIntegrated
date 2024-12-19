import React, { useEffect, useState } from 'react';
import { verifyJwt } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const PrivateRoute = ({ children, role = 'user' }) => {
    const { setUser, user } = useUser(); // Get user and setUser from context
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = localStorage.getItem("token");
        const asyncFunc = async () => {
            if (token) {
                try {
                    const data = await verifyJwt({ jwt: token });
                    if (data.user) {
                        setUser(data.user);
                        // Check if the user has the required role
                        if (role === 'admin' && data.user.role !== 'admin') {
                            navigate("/");  // Redirect if not admin
                        }
                    } else {
                        navigate("/signIn");
                    }
                } catch (e) {
                    navigate("/signIn");
                    setUser(null);
                }
            } else {
                navigate("/signIn");
            }
            setLoading(false); // End loading after check
        };
        asyncFunc();
    }, [role, setUser, navigate]);
    if (loading) return null;

    return user && (role === 'user' || user.role === 'admin') ? children : null;
};

export default PrivateRoute;
