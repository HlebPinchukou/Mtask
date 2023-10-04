import React, { useEffect, useState } from 'react';
import './LoadingPage.css';
import { useToken } from './TokenContext'; // Импортируйте хук

function Home() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<{ login: string; id: string } | null>(null);
    const { token } = useToken(); // Используйте хук для доступа к токену

    useEffect(() => {
        if (token) {
            setLoading(false);
        }
    }, [token]);


    useEffect(() => {
        // Функция для отправки запроса к API Яндекс ID и получения данных о пользователе
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
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Проверяем, есть ли токен, и отправляем запрос, если он есть
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
                            {/* Добавьте другие поля, которые хотите отобразить */}
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    ) : (
                        <p>Failed to fetch user data.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
