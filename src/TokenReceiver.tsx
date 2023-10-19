import React, { useEffect } from 'react';
import { useToken } from './TokenContext';

function TokenReceiver() {
    const { setToken } = useToken();

    useEffect(() => {
        const extractTokenFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = urlParams.get("access_token");

            if (accessToken) {
                setToken(accessToken);

                localStorage.setItem('accessToken', accessToken);

                window.close();
            }
        };

        const intervalId = setInterval(() => {
            extractTokenFromUrl();
        }, 5);

        return () => {
            clearInterval(intervalId);
        };
    }, [setToken]);

    return (
        <div>
            <h1>Ожидание токена...</h1>
        </div>
    );
}

export default TokenReceiver;

