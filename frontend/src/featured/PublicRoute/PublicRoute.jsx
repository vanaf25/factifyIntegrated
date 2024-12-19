import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const PublicRoute = ({ children }) => {
    const { user } = useUser();
    const navigate = useNavigate();
    if (user) {
        navigate("/");
        return null;
    }
    return children;
};

export default PublicRoute;
