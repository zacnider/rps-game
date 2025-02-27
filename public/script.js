// Ethers'ın yüklendiğini kontrol eden kod
if (typeof ethers === 'undefined') {
    console.error('Ethers.js yüklenemedi!');
} else {
    console.log('Ethers.js başarıyla yüklendi');
}


let contract;
let signer;
let provider;

async function connectWallet() {
     // Ethers'ın varlığını bir kez daha kontrol et
    if (typeof ethers === 'undefined') {
        console.error('Ethers tanımsız!');
        return;
    }

    // Metamask varlığını kontrol et
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Metamask bağlantı isteği
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });

            // Web3 Provider oluştur
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            
            // Signer al
            signer = provider.getSigner();

            // Sözleşme bağlantısı
            const contractAddress = "0x3facee0149bc01685815b3f62b8dbc68fbb0e835";
            const contractABI = [ {
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
	} ];
            contract = new ethers.Contract(contractAddress, contractABI, signer);

            // Bağlı hesabı göster
            const address = await signer.getAddress();
            console.log("Bağlanan Hesap:", address);

            // Kullanıcı arayüzünü güncelle
            const connectButton = document.getElementById('connectButton');
            if (connectButton) {
                connectButton.textContent = `Bağlandı: ${address.slice(0,6)}...${address.slice(-4)}`;
            }

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
        const balance = await contract.balanceOf(signer.getAddress());
        console.log("Token Bakiyesi:", ethers.utils.formatUnits(balance, await contract.decimals()));
        return balance;
    } catch (error) {
        console.error("Bakiye alınamadı:", error);
    }
}


async function getTokensFromFaucet() {
    try {
        const tx = await contract.faucet();
        await tx.wait();
        console.log("Token alındı");
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
        
        // Kullanıcı adı ayarlama işlemi
        const tx = await contract.setUsername(username);
        await tx.wait();
        
        alert('Kullanıcı adı ayarlandı!');
    } catch (error) {
        console.error('Kullanıcı Adı Ayarlama Hatası:', error);
        alert('Kullanıcı adı ayarlanamadı');
    }
}
async function initializeConnection() {
    try {
        // Wallet bağlantısı
        await connectWallet();

        // Sözleşme bağlantısı
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Kullanıcı verilerini al
        const userData = await getUserData();
        
        // Bakiyeyi kontrol et
        await checkBalance();

    } catch (error) {
        console.error("Bağlantı hatası:", error);
    }
}

async function getUserData() {
    try {
        const userData = await contract.getUserData();
        console.log("Kullanıcı Verileri:", userData);
        return userData;
    } catch (error) {
        console.error("Kullanıcı verisi alınamadı:", error);
    }
}

async function startGame() {
    try {
        // Oyun başlatma işlemi
        const tx = await contract.startGame();
        await tx.wait();
        
        alert('Oyun başlatıldı!');
    } catch (error) {
        console.error('Oyun Başlatma Hatası:', error);
        alert('Oyun başlatılamadı');
    }
}

async function updateGameStats(win, loss) {
    try {
        // Oyunun sonucuna göre sözleşmedeki istatistikleri güncelle
        const tx = await contract.updateStats(win, loss);
        await tx.wait();

        // Güncel kullanıcı verilerini çek
        await checkUserData();

        // Kullanıcının mevcut istatistiklerini göster
        console.log("Toplam Puan:", userData[1]);
        console.log("Kazanma Sayısı:", userData[2]);
        console.log("Kaybetme Sayısı:", userData[3]);
        console.log("Beraberlik Sayısı:", userData[4]);

    } catch (error) {
        console.error("İstatistik güncelleme hatası:", error);
    }
}

// Örnek kullanım senaryoları
function handleGameResult(result) {
    switch(result) {
        case 'win':
            updateGameStats(true, false);  // Kazanma durumu
            break;
        case 'loss':
            updateGameStats(false, true);  // Kaybetme durumu
            break;
        case 'draw':
            updateGameStats(false, false);  // Beraberlik durumu
            break;
    }
}

// Oyun oynama fonksiyonu örneği
async function playGame(playerChoice) {
    // Kullanıcı adı kontrolü
    if (!userData || userData[0] === "") {
        alert("Oyuna başlamadan önce kullanıcı adı belirlemelisiniz!");
        return;
    }

    // Token bakiye kontrolü
    const balance = await contract.balanceOf(await signer.getAddress());
    if (balance.eq(0)) {
        alert("Oyun oynayabilmek için önce faucet'ten token almalısınız!");
        return;
    }

    // Oyun mantığı burada frontend tarafında yazılacak
    // Örnek basit bir senaryo
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

    // Sonucu göster
    alert(`Bilgisayar seçimi: ${computerChoice}, Sonuç: ${result}`);

    // İstatistikleri güncelle
    handleGameResult(result);
}

// Buton event listener'ları
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('rockButton').addEventListener('click', () => playGame('rock'));
    document.getElementById('paperButton').addEventListener('click', () => playGame('paper'));
    document.getElementById('scissorsButton').addEventListener('click', () => playGame('scissors'));
});

function displayGameResult(result) {
    const resultElement = document.getElementById('gameResult');
    
    // Sonuç mesajını ayarlama
    switch(result) {
        case 0:
            resultElement.textContent = '🏆 Kazandınız!';
            resultElement.style.color = 'green';
            break;
        case 1:
            resultElement.textContent = '😞 Kaybettiniz!';
            resultElement.style.color = 'red';
            break;
        case 2:
            resultElement.textContent = '🤝 Berabere!';
            resultElement.style.color = 'yellow';
            break;
    }
}

async function loadLeaderboard() {
    try {
        // Liderlik tablosunu çekme
        const leaderboard = await contract.getLeaderboard();
        const leaderboardList = document.getElementById('leaderboardList');
        
        // Liderlik tablosunu temizle
        leaderboardList.innerHTML = '';
        
        // Liderlik verilerini ekle
        leaderboard.forEach((entry, index) => {
            const leaderboardItem = document.createElement('div');
            leaderboardItem.classList.add('bg-white/5', 'p-3', 'rounded-lg', 'flex', 'justify-between');
            leaderboardItem.innerHTML = `
                <span>${index + 1}. ${entry.username}</span>
                <span>${entry.score} puan</span>
            `;
            leaderboardList.appendChild(leaderboardItem);
        });
    } catch (error) {
        console.error('Liderlik Tablosu Yükleme Hatası:', error);
    }
}

// Sayfa yüklendiğinde çalışacak başlangıç fonksiyonu
async function init() {
    try {
        // Kontrat bağlantısı ve gerekli başlangıç ayarları
        const contractAddress = '0x3FACEE0149bC01685815B3f62b8DBC68FbB0E835';
        const contractABI = [
	{
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
	}
        ];
        
        // Provider oluşturma
        provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Kontrat bağlantısı
        contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());
        
        // Liderlik tablosunu yükle
        await loadLeaderboard();
    } catch (error) {
        console.error('Başlatma Hatası:', error);
    }
}

// Sayfa yüklendiğinde init fonksiyonunu çağır
window.addEventListener('load', () => {
    if (typeof window.ethereum !== 'undefined') {
        // Ağ değişikliği dinleyicisi
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

        // Hesap değişikliği dinleyicisi
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                connectWallet();
            }
        });
    }
});

// Manuel bağlantı butonu için
function initializeConnection() {
    connectWallet();
}
