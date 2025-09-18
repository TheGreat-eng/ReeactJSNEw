import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context.jsx";
import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
const PrivateRoute = (props) => {

    const { user } = useContext(AuthContext);



    if (user && user.id) {
        // Nếu đã đăng nhập, render component con bên trong
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <Result
            status="403"
            title="Unauthorized"
            subTitle={'You must be logged in to access this page.'}
            extra={<Button type="primary">
                <Link to="/">Back to homepage</Link>
            </Button>}
        />
    )
}

export default PrivateRoute;

