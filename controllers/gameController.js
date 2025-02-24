async function setUsername(req, res, contract) {
    try {
        const { username, address } = req.body;
        
        const tx = await contract.setUsername(username, {
            from: address
        });
        await tx.wait();

        res.json({ 
            success: true, 
            message: 'Kullanıcı adı başarıyla ayarlandı' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

async function getUserData(req, res, contract) {
    try {
        const { address } = req.query;
        const userData = await contract.users(address);

        res.json({
            success: true,
            data: userData
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

async function playGame(req, res, contract) {
    try {
        const { address, playerChoice } = req.body;
        
        // Oyun mantığı
        const computerChoice = ['rock', 'paper', 'scissors'][
            Math.floor(Math.random() * 3)
        ];

        let result = determineGameResult(playerChoice, computerChoice);

        // Kontrata sonucu gönder
        const tx = await contract.updateStats(
            result === 'win', 
            result === 'lose',
            { from: address }
        );
        await tx.wait();

        res.json({
            success: true,
            playerChoice,
            computerChoice,
            result
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

function determineGameResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    
    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
}

async function claimFaucet(req, res, contract) {
    try {
        const { address } = req.body;
        
        const tx = await contract.faucet({ from: address });
        await tx.wait();

        res.json({ 
            success: true, 
            message: 'Token başarıyla alındı' 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}

module.exports = {
    setUsername,
    getUserData,
    playGame,
    claimFaucet
};
