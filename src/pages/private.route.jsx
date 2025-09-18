import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context.jsx";
import { Navigate } from "react-router-dom";
const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext);



    if (user && user._id) {
        // Nếu đã đăng nhập, render component con bên trong
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoute;

