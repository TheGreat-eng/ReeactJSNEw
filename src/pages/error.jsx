import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Result } from 'antd';


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (

        <Result
            status="403"
            title="403"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary">
                <Link to="/">Back to homepage</Link>
            </Button>}
        />
    );
};

export default ErrorPage;