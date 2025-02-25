if (typeof ethers === 'undefined') {
    console.error('Ethers.js yüklenemedi!');
} else {
    console.log('Ethers.js başarıyla yüklendi');
}

// Web3 Bağlantı Sabitleri
const CONTRACT_ADDRESS = '0x3FACEE0149bC01685815B3f62b8DBC68FbB0E835';
const CONTRACT_ABI = [
    // Kontrat ABI'sini buraya ekleyin
 
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
];

// Global Değişkenler
let contract;
let signer;
let provider;
let userData;

// Wallet Bağlantı Fonksiyonu
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            alert('Metamask kurulu değil!');
            return;
        }

        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const address = await signer.getAddress();
        updateWalletUI(address);
        
        // UI Elemanlarını Göster
        document.getElementById('usernameSection').classList.remove('hidden');
        
        await loadUserData();
        await updateBalances();
        await loadLeaderboard();

    } catch (error) {
        console.error("Bağlantı Hatası:", error);
        alert("Bağlantı sırasında bir hata oluştu!");
    }
}

// Wallet UI Güncelleme
function updateWalletUI(address) {
    const connectButton = document.getElementById('connectButton');
    const walletInfo = document.getElementById('walletInfo');

    connectButton.textContent = `Bağlandı: ${address.slice(0,6)}...${address.slice(-4)}`;
    walletInfo.classList.remove('hidden');
    document.getElementById('walletAddress').textContent = address;
}

// Kullanıcı Adı Ayarlama
async function setUsername() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
    
    if (!username) {
        alert('Kullanıcı adı boş olamaz');
        return;
    }
    
    try {
        const tx = await contract.setUsername(username);
        await tx.wait();
        alert('Kullanıcı adı başarıyla ayarlandı!');
        
        // Oyun bölümünü göster
        document.getElementById('gameSection').classList.remove('hidden');
        
        await loadUserData();
    } catch (error) {
        console.error('Kullanıcı Adı Hatası:', error);
        alert('Kullanıcı adı ayarlanamadı');
    }
}

// Oyun Oynama Fonksiyonu
async function playGame(playerChoice) {
    try {
        // Token bakiye kontrolü
        const balance = await contract.balanceOf(await signer.getAddress());
        if (balance.eq(0)) {
            alert("Oyun oynayabilmek için token almalısınız!");
            return;
        }

        const tx = await contract.playRockPaperScissors(playerChoice);
        const receipt = await tx.wait();
        
        // Sonuç işleme (kontrata göre düzenleyin)
        const result = receipt.events[0].args.result;
        displayGameResult(result);
        
        await updateBalances();
        await loadUserData();
        await loadLeaderboard();

    } catch (error) {
        console.error("Oyun hatası:", error);
        alert("Oyun oynanırken bir hata oluştu!");
    }
}

// Token Faucet Fonksiyonu
async function getTokensFromFaucet() {
    try {
        const tx = await contract.faucet();
        await tx.wait();
        alert('Tokenler başarıyla alındı!');
        await updateBalances();
    } catch (error) {
        console.error("Faucet hatası:", error);
        alert(error.message);
    }
}

// Kullanıcı Verilerini Yükleme
async function loadUserData() {
    try {
        userData = await contract.getUserData();
        document.getElementById('totalWins').textContent = userData.wins || 0;
        document.getElementById('totalLosses').textContent = userData.losses || 0;
        document.getElementById('totalDraws').textContent = userData.draws || 0;
    } catch (error) {
        console.error("Kullanıcı verileri yüklenemedi:", error);
    }
}

// Bakiyeleri Güncelleme
async function updateBalances() {
    try {
        const monBalance = await contract.getMonBalance();
        const rpsBalance = await contract.getRpsBalance();

        document.getElementById('mon-balance').textContent = ethers.utils.formatUnits(monBalance, 18);
        document.getElementById('rps-balance').textContent = ethers.utils.formatUnits(rpsBalance, 18);
    } catch (error) {
        console.error("Bakiye güncellenemedi:", error);
    }
}

// Liderlik Tablosu Yükleme
async function loadLeaderboard() {
    try {
        const leaderboard = await contract.getLeaderboard();
        const leaderboardList = document.getElementById('leaderboardList');
        
        leaderboardList.innerHTML = leaderboard.map((entry, index) => `
            <div class="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                <div class="flex items-center space-x-4">
                    <span class="font-bold text-lg">${index + 1}</span>
                    <span>${entry.username}</span>
                </div>
                <span class="text-yellow-400 font-semibold">${entry.score} puan</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Liderlik Tablosu Hatası:', error);
    }
}

// Sonuç Gösterimi
function displayGameResult(result) {
    const resultElement = document.getElementById('gameResult');
    const resultMessages = {
        0: { text: '🏆 Kazandınız!', color: 'text-green-500' },
        1: { text: '😞 Kaybettiniz!', color: 'text-red-500' },
        2: { text: '🤝 Berabere!', color: 'text-yellow-500' }
    };

    const messageData = resultMessages[result];
    if (messageData) {
        resultElement.textContent = messageData.text;
        resultElement.className = `text-2xl font-bold text-center ${messageData.color}`;
    } else {
        console.error('Geçersiz oyun sonucu:', result);
    }
}

// Event Listener
window.addEventListener('load', () => {
    document.getElementById('connectButton').addEventListener('click', connectWallet);
});
