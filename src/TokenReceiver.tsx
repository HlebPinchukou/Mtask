import React, { useEffect, useState } from 'react';

function TokenReceiver() {
    const token = '';

    useEffect(() => {
        // Функция для извлечения токена из URL-фрагмента
        const extractTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = urlParams.get("access_token");

            if (accessToken) {
                localStorage.setItem('accessToken', accessToken);
                // Закрыть страницу после получения токена
                window.close();
            }
        };

        // Настраиваем интервал для регулярной проверки URL
        const intervalId = setInterval(() => {
            extractTokenFromUrl();
        }, 500); // Проверяем каждую секунду

        // Удаление интервала при размонтировании компонента
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>Ожидание токена...</h1>
            {token && (
                <div>
                    <h2>Полученный токен:</h2>
                    <p>{token}</p>
                </div>
            )}
        </div>
    );
}

export default TokenReceiver;
