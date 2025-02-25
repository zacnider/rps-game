// Ethers.js yüklendi mi kontrol et
if (typeof ethers === 'undefined') {
    console.error('Ethers.js yüklenemedi!');
} else {
    console.log('Ethers.js başarıyla yüklendi');
}

let provider;
let signer;
let contract;
const contractAddress = "0x3facee0149bc01685815b3f62b8dbc68fbb0e835";
const contractABI = [
    // BURAYA GERÇEK ABI'Yİ EKLEMELİSİN
];

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert("Metamask kurulu değil!");
        return;
    }
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const address = await signer.getAddress();
        console.log("Bağlanan Hesap:", address);
        document.getElementById('connectButton').textContent = `Bağlandı: ${address.slice(0,6)}...${address.slice(-4)}`;
    } catch (error) {
        console.error("Bağlantı Hatası:", error);
        alert("Metamask bağlantısı kurulamadı!");
    }
}

async function checkBalance() {
    if (!signer || !contract) return;
    try {
        const balance = await contract.balanceOf(await signer.getAddress());
        console.log("Token Bakiyesi:", ethers.utils.formatUnits(balance, await contract.decimals()));
    } catch (error) {
        console.error("Bakiye alınamadı:", error);
    }
}

async function getTokensFromFaucet() {
    if (!contract) return;
    try {
        const tx = await contract.faucet();
        await tx.wait();
        console.log("Token alındı");
        alert("Token başarıyla alındı!");
    } catch (error) {
        console.error("Faucet hatası:", error);
    }
}

async function setUsername() {
    const usernameInput = document.getElementById('usernameInput').value.trim();
    if (!usernameInput) {
        alert('Kullanıcı adı boş olamaz');
        return;
    }
    try {
        const tx = await contract.setUsername(usernameInput);
        await tx.wait();
        alert('Kullanıcı adı başarıyla kaydedildi!');
    } catch (error) {
        console.error('Kullanıcı adı ayarlanamadı:', error);
    }
}

async function playGame(playerChoice) {
    if (!contract || !signer) return;
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
    alert(`Bilgisayar seçimi: ${computerChoice}, Sonuç: ${result}`);
}

document.getElementById('rockButton').addEventListener('click', () => playGame('rock'));
document.getElementById('paperButton').addEventListener('click', () => playGame('paper'));
document.getElementById('scissorsButton').addEventListener('click', () => playGame('scissors'));

async function loadLeaderboard() {
    if (!contract) return;
    try {
        const leaderboard = await contract.getLeaderboard();
        const leaderboardList = document.getElementById('leaderboardList');
        leaderboardList.innerHTML = '';
        leaderboard.forEach((entry, index) => {
            const leaderboardItem = document.createElement('div');
            leaderboardItem.classList.add('bg-white/5', 'p-3', 'rounded-lg', 'flex', 'justify-between');
            leaderboardItem.innerHTML = `<span>${index + 1}. ${entry.username}</span><span>${entry.score} puan</span>`;
            leaderboardList.appendChild(leaderboardItem);
        });
    } catch (error) {
        console.error('Liderlik Tablosu Yükleme Hatası:', error);
    }
}

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('chainChanged', () => window.location.reload());
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) connectWallet();
        });
    }
    await loadLeaderboard();
});
