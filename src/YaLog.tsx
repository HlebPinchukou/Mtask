import React, { useEffect, useState } from 'react';
import './LoadingPage.css';
import { useToken } from './TokenContext';

function YaLog() {
    const [storedToken, setStoredToken] = useState<string | null>(null);
    const { token } = useToken();

    useEffect(() => {
        setStoredToken(localStorage.getItem('accessToken'));

        const loadAndInitializeYandexWidget = async () => {
            try {
                const script = document.createElement('script');
                script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
                script.async = true;

                document.body.appendChild(script);

                script.onload = async () => {
                    const result = await window.YaAuthSuggest.init(
                        {
                            client_id: 'f9b747140f8c449588a2c3978192ba7d',
                            response_type: 'token',
                            redirect_uri: 'http://127.0.0.1:5173/tokenreceiver',
                        },
                        'http://127.0.0.1:5173',
                        {
                            view: "button",
                            parentId: "container",
                            buttonSize: 'xxl',
                            buttonView: 'main',
                            buttonTheme: 'light',
                            buttonBorderRadius: "28",
                            buttonIcon: 'ya',
                        }
                    );

                    result.handler({ target: '_self' })
                        .then(function(data) {
                            console.log('Сообщение с токеном: ', data);
                        })
                        .catch(function(error) {
                            console.log('Что-то пошло не так: ', error);
                        });
                };
            } catch (error) {
                console.error('Error loading Yandex Autofill script:', error);
            }
        };

        loadAndInitializeYandexWidget();

        const timerId = setInterval(() => {
            const buttons = document.querySelectorAll('.yaPersonalButton');
            if (buttons.length > 1) {
                for (let i = 1; i < buttons.length; i++) {
                    buttons[i].remove();
                }
            }
        }, 0.5);

        const intervalId = setInterval(() => {
            const updatedStoredToken = localStorage.getItem('accessToken');
            if (updatedStoredToken !== storedToken) {
                clearInterval(intervalId);
                clearInterval(timerId);
                window.location.href = '/home';
            }
        }, 50);


        return () => {
            clearInterval(intervalId);
            clearInterval(timerId);
        };
    }, [storedToken]);

    useEffect(() => {
        if (token) {
            setStoredToken(token);
        }
    }, [token]);

    return (
        <div className="center">
            <h1>Log in with Yandex ID</h1>
            <div  id="container" className="card">
            </div>
        </div>
    );
}

export default YaLog;
