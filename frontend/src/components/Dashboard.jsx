import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (err) {
                console.error('Error fetching user:', err);
                localStorage.removeItem('token');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="container card">
                <Loader2 className="animate-spin" size={32} style={{ margin: '0 auto', color: 'var(--primary)' }} />
                <p style={{ marginTop: '1rem' }}>Loading your dashboard...</p>
            </div>
        );
    }

    if (!userData) return null;

    return (
        <div className="container card profile-container">
            <header style={{ width: '100%', textAlign: 'center' }}>
                <h1>Dashboard</h1>
                <p>Manage your account settings and profile.</p>
            </header>

            <div className="avatar-wrapper">
                {userData.picture ? (
                    <img src={userData.picture} alt={userData.name} className="avatar" />
                ) : (
                    <div className="avatar" style={{ background: 'var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <User size={32} />
                    </div>
                )}
            </div>

            <div className="user-info">
                <h2>{userData.name}</h2>
                <span><Mail size={14} /> {userData.email}</span>
            </div>

            <div style={{ width: '100%', marginTop: '1.5rem', borderTop: '1px solid var(--card-border)', paddingTop: '2rem' }}>
                <button onClick={handleLogout} className="btn btn-danger-outline">
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
