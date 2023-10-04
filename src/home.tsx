import React, { useEffect, useState } from 'react';
import './LoadingPage.css'; // Создайте файл стилей для компонента

function Home() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        // Здесь можно добавить логику для проверки наличия токена в локальном хранилище
        // Если токен есть, установите setLoading(false), чтобы спиннер скрылся
        if (token) {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/yandex', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch user data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleLogout = () => {
        // Очищаем локальное хранилище и перенаправляем на стартовую страницу
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    };

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    <h1>User Information</h1>
                    {userData ? (
                        <div>
                            <p>Login: {userData.login}</p>
                            <p>User ID: {userData.id}</p>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    ) : (
                        <div>
                        <p>Failed to fetch user data.</p>
                        <button onClick={handleLogout}>Clear cash</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
