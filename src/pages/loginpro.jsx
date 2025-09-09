import React, { useState } from 'react';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (!form.username || !form.password) {
            setError('Please enter both username and password.');
            return;
        }
        // TODO: Implement authentication logic here
        alert(`Logged in as: ${form.username}`);
    };

    return (
        <div style={{ maxWidth: 400, margin: '80px auto', padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Username
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            autoComplete="username"
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            autoComplete="current-password"
                        />
                    </label>
                </div>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
                <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
            </form>
        </div>
    );
};

export default Login;