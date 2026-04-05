import React from 'react';
import { ShieldCheck, LogIn } from 'lucide-react';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/login';
    };

    return (
        <div className="container card">
            <div className="icon-box">
                <ShieldCheck size={28} />
            </div>
            <h1>Welcome back</h1>
            <p>Access your secure dashboard by signing in with your Google account.</p>
            
            <div style={{ marginTop: '2.5rem' }}>
                <button onClick={handleLogin} className="btn btn-primary">
                    <LogIn size={18} />
                    Continue with Google
                </button>
            </div>
            
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--card-border)', paddingTop: '1.5rem' }}>
                <p style={{ fontSize: '0.8rem' }}>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
        </div>
    );
};

export default Login;
