import { createContext, useContext, useState } from 'react';

const TokenContext = createContext({ token: null, setToken: (action) => {} });

export function TokenProvider({ children }) {
    const [token, setToken] = useState(null);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
}

export function useToken() {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken должен использоваться внутри TokenProvider');
    }
    return context;
}
