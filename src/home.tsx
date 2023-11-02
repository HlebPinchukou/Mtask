import React, { useEffect, useState } from 'react';
import './LoadingPage.css';

function Home() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://login.yandex.ru/info', {
                    headers: {
                        Authorization: `OAuth ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                   setUserData(data);
                    sendUserDataToServer(data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    };

    const sendUserDataToServer = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `OAuth ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User data saved successfully on the server.');
            } else {
                console.error('Error saving user data on the server.');
            }
        } catch (error) {
            console.error('Error sending user data to the server:', error);
        }
    };

    return (
        <div className="container">
            <div>
                <h1>User Information</h1>
                {userData ? (
                    <div>
                        <p><span className="bold-text">Login:</span> {userData.login}</p>
                        <p><span className="bold-text">User ID:</span> {userData.id}</p>
                        <div>
                            <img
                                src={`https://avatars.yandex.net/get-yapic/${userData.default_avatar_id}/islands-200`}
                                alt="User Avatar"
                            />
                        </div>
                        <p><span className="bold-text">First Name:</span> {userData.first_name}</p>
                        <p><span className="bold-text">Last Name:</span> {userData.last_name}</p>
                        <p><span className="bold-text">Display Name:</span> {userData.display_name}</p>
                        <p><span className="bold-text">Real Name:</span> {userData.real_name}</p>
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <p>Failed to fetch user data.</p>
                )}
            </div>
        </div>
    );
}

export default Home;
