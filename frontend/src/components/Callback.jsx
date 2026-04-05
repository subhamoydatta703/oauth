import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Callback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }, [searchParams, navigate]);

    return (
        <div className="container card">
            <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto', color: 'var(--primary)' }} />
            <p style={{ marginTop: '1rem' }}>Processing your login...</p>
            <p style={{ fontSize: '0.8rem' }}>Please wait while we secure your session.</p>
        </div>
    );
};

export default Callback;
