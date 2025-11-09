import { ethers } from "hardhat";
import { expect } from "chai";

describe("VaultMock", function () {
  it("should lock for 10 years and allow withdraw after", async function () {
    const [owner] = await ethers.getSigners();
    const Vault = await ethers.getContractFactory("VaultMock");
    const vault = await Vault.deploy();
    await vault.waitForDeployment();

    // deposit 1 ETH
    await vault.deposit({ value: ethers.parseEther("1") });
    let v = await vault.vaults(owner.address);
    expect(v.balance).to.equal(ethers.parseEther("1"));

    // try withdraw early
    await expect(vault.withdraw()).to.be.reverted;

    // advance time 10 years
    await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 365 * 10]);
    await ethers.provider.send("evm_mine", []);

    await vault.withdraw();
    v = await vault.vaults(owner.address);
    expect(v.balance).to.equal(0);
  });
});
