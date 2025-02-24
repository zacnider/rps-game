require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const gameRoutes = require('./routes/gameRoutes');
const { initWeb3Connection } = require('./utils/web3Connection');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Web3 Bağlantısı
async function initApp() {
    try {
        const web3Contract = await initWeb3Connection();

        // Routes
        app.use('/api/game', gameRoutes(web3Contract));

        // Ana Sayfa
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Sunucuyu Başlat
        app.listen(PORT, () => {
            console.log(`Sunucu ${PORT} portunda çalışıyor`);
        });
    } catch (error) {
        console.error('Uygulama Başlatma Hatası:', error);
        process.exit(1);
    }
}

initApp();
