import './register.css'; // Thêm dòng này nếu bạn muốn tách CSS riêng

const RegisterPage = () => {
    return (
        <div className="register-container">
            <form className="register-form">
                <h2 className="register-title">Register</h2>
                <div className="form-group">
                    <input type="text" placeholder="Full Name" className="form-input" />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email" className="form-input" />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" className="form-input" />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Phone Number" className="form-input" />
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
