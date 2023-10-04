import React, { useEffect } from 'react';
import Home from './Home';
import { useToken } from './TokenContext';
import * as url from "url"; // Импортируйте хук

function TokenReceiver() {
    const { setToken } = useToken(); // Используйте хук для доступа к токену

    useEffect(() => {
        const extractTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.hash.substring(1));
            console.log('urlParamst', urlParams);

            setToken(urlParams)
            if (urlParams) {
            }
        };

        const intervalId = setInterval(() => {
            extractTokenFromUrl();
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <h1>Ожидание токена...</h1>
        </div>
    );
}

export default TokenReceiver;

