// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../contracts/TimeWallet.sol";

contract DeployTimeWallet is Script {
    // USDC oficial de Circle en Base Sepolia
    address constant USDC_BASE_SEPOLIA = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;

    function run() external {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        TimeWallet tw = new TimeWallet(USDC_BASE_SEPOLIA);
        vm.stopBroadcast();

        console2.log("TimeWallet deployed at:", address(tw));
    }
}
