const express = require('express');
import('node-fetch').then(fetch => {
}).catch(error => {
    console.error('Error:', error);
});
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Разрешаем CORS для всех источников (*)
app.use(cors());

app.use('/api/yandex', async (req, res) => {
    try {
        const response = await fetch('https://login.yandex.ru/info', {
            method: 'GET',
            headers: {
                Authorization: `OAuth ${req.body.token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            res.json(data);
        } else {
            res.status(response.status).json({ error: 'Failed to fetch user data' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
