if (typeof ethers === 'undefined') {
    console.error('Ethers.js yüklenemedi!');
} else {
    console.log('Ethers.js başarıyla yüklendi');
}

let contract;
let signer;
let provider;
let userData = null;

async function connectWallet() {
    if (typeof ethers === 'undefined') {
        console.error('Ethers tanımsız!');
        return;
    }

    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            const contractAddress = "0x3facee0149bc01685815b3f62b8dbc68fbb0e835";
            const contractABI = [{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "faucet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "setUsername",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_win",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_loss",
				"type": "bool"
			}
		],
		"name": "updateStats",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FAUCET_AMOUNT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FAUCET_COOLDOWN",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUserData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "totalPoints",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "wins",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "losses",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "draws",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastFaucetClaim",
						"type": "uint256"
					}
				],
				"internalType": "struct RPSGame.UserData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalPoints",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "wins",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "losses",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "draws",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastFaucetClaim",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}];
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            const address = await signer.getAddress();
            console.log("Bağlanan Hesap:", address);

            const connectButton = document.getElementById('connectButton');
            if (connectButton) {
                connectButton.textContent = `Bağlandı: ${address.slice(0,6)}...${address.slice(-4)}`;
            }

            // Kullanıcı verilerini çek
            await getUserData();
            await checkBalance();
            await loadLeaderboard();

        } catch (error) {
            console.error("Bağlantı Hatası:", error);
            alert("Metamask bağlantısı kurulamadı!");
        }
    } else {
        alert("Metamask kurulu değil!");
    }
}

async function checkBalance() {
    try {
        const balance = await contract.balanceOf(await signer.getAddress());
        const decimals = await contract.decimals();
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);
        
        const balanceElement = document.getElementById('tokenBalance');
        if (balanceElement) {
            balanceElement.textContent = `Token Bakiyesi: ${formattedBalance}`;
        }
        
        return balance;
    } catch (error) {
        console.error("Bakiye alınamadı:", error);
    }
}

async function getTokensFromFaucet() {
    try {
        // Son faucet çekim zamanını kontrol et
        if (!userData) {
            alert("Önce cüzdanı bağlayın!");
            return;
        }

        const lastFaucetClaim = userData[5]; // lastFaucetClaim
        const faucetCooldown = await contract.FAUCET_COOLDOWN();
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime - lastFaucetClaim < faucetCooldown) {
            const remainingTime = faucetCooldown - (currentTime - lastFaucetClaim);
            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            
            alert(`Faucet'i tekrar kullanabilmek için ${hours} saat ${minutes} dakika beklemeniz gerekiyor.`);
            return;
        }

        const tx = await contract.faucet();
        await tx.wait();
        
        console.log("Token alındı");
        await checkBalance();
        await getUserData();
    } catch (error) {
        console.error("Faucet hatası:", error);
    }
}

async function setUsername() {
    try {
        const usernameInput = document.getElementById('usernameInput');
        const username = usernameInput.value.trim();
        
        if (!username) {
            alert('Kullanıcı adı boş olamaz');
            return;
        }

        const tx = await contract.setUsername(username);
        await tx.wait();
        
        alert('Kullanıcı adı ayarlandı!');
        await getUserData();
    } catch (error) {
        console.error('Kullanıcı Adı Hatası:', error);
        alert('Kullanıcı adı ayarlanamadı');
    }
}

async function getUserData() {
    try {
        userData = await contract.getUserData();
        console.log("Kullanıcı Verileri:", userData);

        // Kullanıcı bilgilerini arayüzde göster
        const usernameElement = document.getElementById('username');
        const scoreElement = document.getElementById('userScore');
        const winsElement = document.getElementById('userWins');
        const lossesElement = document.getElementById('userLosses');

        if (usernameElement) usernameElement.textContent = `Kullanıcı Adı: ${userData[0]}`;
        if (scoreElement) scoreElement.textContent = `Toplam Puan: ${userData[1]}`;
        if (winsElement) winsElement.textContent = `Kazanmalar: ${userData[2]}`;
        if (lossesElement) lossesElement.textContent = `Kayıplar: ${userData[3]}`;

        return userData;
    } catch (error) {
        console.error("Kullanıcı verisi alınamadı:", error);
    }
}

async function playGame(playerChoice) {
    if (!userData || userData[0] === "") {
        alert("Oyuna başlamadan önce kullanıcı adı belirlemelisiniz!");
        return;
    }

    const balance = await contract.balanceOf(await signer.getAddress());
    if (balance.eq(0)) {
        alert("Oyun oynayabilmek için önce faucet'ten token almalısınız!");
        return;
    }

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result;
    if (playerChoice === computerChoice) {
        result = 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
    } else {
        result = 'loss';
    }

    // Oyun sonucunu ekranda göster
    displayGameResult(result);

    // İstatistikleri güncelle
    await updateGameStats(result);
}

async function updateGameStats(result) {
    try {
        let win = false, loss = false;
        
        switch(result) {
            case 'win':
                win = true;
                break;
            case 'loss':
                loss = true;
                break;
        }

        const tx = await contract.updateStats(win, loss);
        await tx.wait();

        // Güncel kullanıcı verilerini çek
        await getUserData();
    } catch (error) {
        console.error("İstatistik güncelleme hatası:", error);
    }
}

function displayGameResult(result) {
    const resultElement = document.getElementById('gameResult');
    
    switch(result) {
        case 'win':
            resultElement.textContent = '🏆 Kazandınız!';
            resultElement.style.color = 'green';
            break;
        case 'loss':
            resultElement.textContent = '😞 Kaybettiniz!';
            resultElement.style.color = 'red';
            break;
        case 'draw':
            resultElement.textContent = '🤝 Berabere!';
            resultElement.style.color = 'yellow';
            break;
    }
}

async function loadLeaderboard() {
    try {
        const leaderboard = await contract.getLeaderboard();
        const leaderboardList = document.getElementById('leaderboardList');
        
        if (leaderboardList) {
            leaderboardList.innerHTML = '';
            
            leaderboard.forEach((entry, index) => {
                const leaderboardItem = document.createElement('div');
                leaderboardItem.classList.add('bg-white/5', 'p-3', 'rounded-lg', 'flex', 'justify-between');
                leaderboardItem.innerHTML = `
                    <span>${index + 1}. ${entry.username}</span>
                    <span>${entry.score} puan</span>
                `;
                leaderboardList.appendChild(leaderboardItem);
            });
        }
    } catch (error) {
        console.error('Liderlik Tablosu Yükleme Hatası:', error);
    }
}

// Event Listener'ları ayarla
function setupEventListeners() {
    document.getElementById('connectButton')?.addEventListener('click', connectWallet);
    document.getElementById('faucetButton')?.addEventListener('click', getTokensFromFaucet);
    document.getElementById('setUsernameButton')?.addEventListener('click', setUsername);

    document.getElementById('rockButton')?.addEventListener('click', () => playGame('rock'));
    document.getElementById('paperButton')?.addEventListener('click', () => playGame('paper'));
    document.getElementById('scissorsButton')?.addEventListener('click', () => playGame('scissors'));
}

// Sayfa yüklendiğinde çalışacak init fonksiyonu
function init() {
    setupEventListeners();
    
    // Metamask hesap ve zincir değişikliği event'leri
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('chainChanged', () => window.location.reload());
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                connectWallet();
            }
        });
    }
}

// Sayfa yüklendiğinde init fonksiyonunu çağır
window.addEventListener('load', init);
