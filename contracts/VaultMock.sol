// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VaultMock {
    struct Vault {
        uint256 balance;
        uint64  firstDepositAt;
        uint64  maturityAt;
    }

    mapping(address => Vault) public vaults;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    function deposit() external payable {
        require(msg.value > 0, "Amount must be > 0");
        Vault storage v = vaults[msg.sender];
        if (v.firstDepositAt == 0) {
            v.firstDepositAt = uint64(block.timestamp);
            v.maturityAt = uint64(block.timestamp + 365 days * 10);
        }
        v.balance += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() external {
        Vault storage v = vaults[msg.sender];
        require(block.timestamp >= v.maturityAt, "Vault locked");
        uint256 amount = v.balance;
        v.balance = 0;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    // helper view functions
    function monthsElapsed(address user) external view returns (uint256) {
        Vault storage v = vaults[user];
        if (v.firstDepositAt == 0) return 0;
        return (block.timestamp - v.firstDepositAt) / 30 days;
    }

    function monthsRemaining(address user) external view returns (uint256) {
        Vault storage v = vaults[user];
        if (v.maturityAt == 0 || block.timestamp >= v.maturityAt) return 0;
        return (v.maturityAt - block.timestamp) / 30 days;
    }
}
