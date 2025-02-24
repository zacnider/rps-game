const express = require('express');
const gameController = require('../controllers/gameController');

module.exports = (contract) => {
    const router = express.Router();

    // Kullanıcı İşlemleri
    router.post('/set-username', (req, res) => 
        gameController.setUsername(req, res, contract));
    
    router.get('/user-data', (req, res) => 
        gameController.getUserData(req, res, contract));
    
    router.post('/play', (req, res) => 
        gameController.playGame(req, res, contract));
    
    router.post('/claim-faucet', (req, res) => 
        gameController.claimFaucet(req, res, contract));

    return router;
};
