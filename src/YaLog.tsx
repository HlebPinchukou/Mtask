import React, { useEffect } from 'react';

function YaLog() {
    useEffect(() => {
        const iframe = document.createElement('iframe');
        iframe.src = '/public/iframe.html'; // Путь к вашему файлу iframe.html
        iframe.width = '100%';
        iframe.frameBorder = '0';

        const container = document.getElementById('container');
        container.appendChild(iframe);

        iframe.onload = () => {
            // Выполните дополнительные действия после загрузки iframe, если необходимо
        };

        return () => {
            container.removeChild(iframe);
        };
    }, []);

    let storedToken ='x';

    const intervalId = setInterval(() => {
        storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            // Токен найден в локальном хранилище, выполняем редирект на страницу "home"
            clearInterval(intervalId); // Удаляем интервал
            window.location.href = '/home'; // Редирект на страницу "home"
        }
    }, 500);

    return (
        <div>
            <h1>Log in with Yandex ID</h1>
            <div className="card">
                <div id="container"></div>
            </div>
        </div>
    );
}

export default YaLog;

