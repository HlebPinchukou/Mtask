import { createContext, useContext, useState } from 'react';

// Создайте контекст
const TokenContext = createContext({ token: null, setToken: (action) => {} });

// Создайте провайдер контекста
export function TokenProvider({ children }) {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

// Создайте хук для удобного доступа к значению контекста
export function useToken() {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken должен использоваться внутри TokenProvider');
    }
    return context;
}
