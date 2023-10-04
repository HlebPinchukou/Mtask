import { useEffect } from 'react';
import {useToken} from "./TokenContext";

function YaLog() {
    useEffect(() => {
        const iframe = document.createElement('iframe');
        iframe.src = '/public/iframe.html'; // Путь к вашему файлу iframe.html
        iframe.width = '100%';
        iframe.frameBorder = '0';

        const container = document.getElementById('container');

        // Проверяем, что container существует
        if (container) {
            container.appendChild(iframe);

            iframe.onload = () => {
                // Выполните дополнительные действия после загрузки iframe, если необходимо
            };

            return () => {
                // Проверяем снова, что container существует перед удалением
                if (container.contains(iframe)) {
                    container.removeChild(iframe);
                }
            };
        }
    }, []);

    let storedToken: string | null = 'x'; // Указываем тип явно
    const { token } = useToken();

    const intervalId = setInterval(() => {
        storedToken = token;
        console.log('int', token);
        // Проверяем, что storedToken не равен null
        if (storedToken !== null) {
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

