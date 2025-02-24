// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RPSGame is ERC20, Ownable {
    // Kullanıcı istatistikleri
    struct UserData {
        string username;
        uint256 totalPoints;
        uint256 wins;
        uint256 losses;
        uint256 draws;
        uint256 lastFaucetClaim;
    }

    // Kullanıcı adreslerini ve verilerini saklamak için mapping
    mapping(address => UserData) public users;

    // Faucet cooldown süresi (24 saat)
    uint256 public constant FAUCET_COOLDOWN = 24 hours;

    // Faucet'ten dağıtılacak token miktarı
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18; // 100 RPS

    // Kontratın deploy edilmesi sırasında owner'a 1 milyon token gönderilir
    constructor() ERC20("RPS Token", "RPS") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**18); // 1 milyon RPS
    }

    // Faucet fonksiyonu
    function faucet() external {
        require(block.timestamp >= users[msg.sender].lastFaucetClaim + FAUCET_COOLDOWN, "Cooldown period not over");
        
        _mint(msg.sender, FAUCET_AMOUNT);
        users[msg.sender].lastFaucetClaim = block.timestamp;
    }

    // Kullanıcı adı ayarlama fonksiyonu
    function setUsername(string memory _username) external {
        require(bytes(users[msg.sender].username).length == 0, "Username already set");
        require(bytes(_username).length > 0, "Username cannot be empty");
        
        users[msg.sender].username = _username;
    }

    // Kullanıcı verilerini döndüren fonksiyon
    function getUserData() external view returns (UserData memory) {
        return users[msg.sender];
    }

    // Oyun sonuçlarını güncelleyen fonksiyon
    function updateStats(bool _win, bool _loss) external {
        if (_win) {
            users[msg.sender].wins++;
            users[msg.sender].totalPoints += 10; // Kazanılan her oyun için 10 puan
        } else if (_loss) {
            users[msg.sender].losses++;
            users[msg.sender].totalPoints -= 5; // Kaybedilen her oyun için 5 puan düşülür
        } else {
            users[msg.sender].draws++;
            users[msg.sender].totalPoints += 5; // Berabere kalınan her oyun için 5 puan
        }
    }
}
