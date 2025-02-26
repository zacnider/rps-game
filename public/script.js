// Ethers.js yüklendi mi kontrol et
if (typeof ethers === 'undefined') {
    console.error('Ethers.js yüklenemedi!');
} else {
    console.log('Ethers.js başarıyla yüklendi');
}

// 1. GLOBAL DEĞİŞKENLER
let contract;
let signer;
let userAddress;
let provider;
const contractAddress = "0x3facee0149bc01685815b3f62b8dbc68fbb0e835";
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

// 2. CÜZDAN BAĞLANTISI
async function connectWallet() {
    try {
        if (!window.ethereum) throw new Error("Cüzdan bulunamadı!");
        
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        // UI Güncellemeleri
        document.getElementById("connectButton").textContent = `✔ ${userAddress.slice(0,6)}...${userAddress.slice(-4)}`;
        document.getElementById("walletInfo").classList.remove("hidden");
        document.getElementById("startGameSection").classList.remove("hidden");
        
        await updateAllData();
    } catch (error) {
        console.error("Bağlantı Hatası:", error);
        alert(`Hata: ${error.message}`);
    }
}

// 3. VERİ GÜNCELLEME
async function updateAllData() {
    await Promise.all([
        updateBalances(),
        loadUserStats(),
        checkFaucetCooldown(),
        loadLeaderboard()
    ]);
}

async function updateBalances() {
    try {
        if (!signer) return;
        const ethBalance = await signer.getBalance();
        document.getElementById("mon-balance").textContent = ethers.utils.formatEther(ethBalance);
        
        const rpsBalance = await contract.balanceOf(userAddress);
        document.getElementById("rps-balance").textContent = ethers.utils.formatUnits(rpsBalance, 18);
    } catch (error) {
        console.error("Bakiye Güncelleme Hatası:", error);
    }
}

// 4. KULLANICI İSTATİSTİKLERİ
async function loadUserStats() {
    try {
        const userData = await contract.getUserData(userAddress);
        document.getElementById("totalWins").textContent = userData.wins.toString();
        document.getElementById("totalLosses").textContent = userData.losses.toString();
        document.getElementById("totalDraws").textContent = userData.draws.toString();
    } catch (error) {
        console.error("İstatistik Yükleme Hatası:", error);
    }
}

// 5. FAUCET İŞLEMLERİ
async function getTokensFromFaucet() {
    try {
        const button = document.getElementById("faucetButton");
        button.disabled = true;
        
        const tx = await contract.faucet();
        await tx.wait();
        
        await updateAllData();
    } catch (error) {
        console.error("Faucet Hatası:", error);
        alert(`Hata: ${error.reason || error.message}`);
    }
}

async function checkFaucetCooldown() {
    try {
        const lastClaim = (await contract.users(userAddress)).lastFaucetClaim;
        const cooldown = await contract.FAUCET_COOLDOWN();
        const remaining = (Number(lastClaim) + Number(cooldown)) - Math.floor(Date.now()/1000);
        document.getElementById("faucetButton").disabled = remaining > 0;
    } catch (error) {
        console.error("Cooldown Kontrol Hatası:", error);
    }
}

// 6. OYUN İŞLEMLERİ
async function playGame(playerChoice) {
    try {
        const choiceMap = { 'rock': 0, 'paper': 1, 'scissors': 2 };
        const tx = await contract.play(choiceMap[playerChoice]);
        await tx.wait();
        
        contract.on("GameResult", (player, result) => {
            displayGameResult(result);
            updateAllData();
        });
    } catch (error) {
        console.error("Oyun Hatası:", error);
        document.getElementById("gameResult").textContent = `Hata: ${error.reason || error.message}`;
    }
}

// 7. LİDERLİK TABLOSU
async function loadLeaderboard() {
    try {
        const allUsers = await contract.getAllUsers();
        const sorted = allUsers.filter(u => u.totalPoints > 0).sort((a,b) => b.totalPoints - a.totalPoints).slice(0, 10);
        
        const leaderboardList = document.getElementById("leaderboardList");
        leaderboardList.innerHTML = sorted.map((user, index) => `
            <div class="bg-white/5 p-3 rounded-lg flex justify-between">
                <span>${index + 1}. ${user.username || "Anonim"}</span>
                <span>${user.totalPoints} Puan</span>
            </div>
        `).join("");
    } catch (error) {
        console.error("Liderlik Tablosu Hatası:", error);
    }
}

// 8. SAYFA YÜKLENDİĞİNDE
async function init() {
    try {
        if (!window.ethereum) {
            alert("Metamask gibi bir cüzdan gereklidir!");
            return;
        }
        provider = new ethers.providers.Web3Provider(window.ethereum);
        
        await loadLeaderboard();
    } catch (error) {
        console.error("Başlatma Hatası:", error);
    }
}

// 9. EVENT DİNLEYİCİLER
function setupEventListeners() {
    document.querySelectorAll(".choice-button").forEach(button => {
        button.addEventListener("click", e => {
            const choice = e.target.dataset.choice;
            playGame(choice);
        });
    });

    window.ethereum?.on("chainChanged", () => window.location.reload());
    window.ethereum?.on("accountsChanged", () => window.location.reload());
}

// İlk yükleme
window.addEventListener("load", () => {
    setupEventListeners();
    if (window.ethereum?.isConnected()) initializeConnection();
});

document.getElementById("connectButton").addEventListener("click", initializeConnection);
