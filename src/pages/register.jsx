
const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc',
        padding: '20px',
    };

    const formStyle = {
        background: '#fff',
        padding: '3rem 2.5rem',
        borderRadius: '12px',
        boxShadow: '0 5px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1rem',
        color: '#2d3748',
        fontWeight: '700',
        fontSize: '2rem',
    };

    const buttonStyle = {
        width: '100%',
    };

    return (
        <h1>Register Page</h1>
    )
}

export default RegisterPage;
