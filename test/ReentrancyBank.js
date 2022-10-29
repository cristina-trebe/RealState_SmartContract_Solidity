const { expect } = require('chai');
const { ethers } = require('hardhat');
const { TASK_CLEAN_GLOBAL } = require('hardhat/builtin-tasks/task-names');

describe('Reentrancy', () => {
    let deployer
    let bank

    beforeEach(async () => {
       [deployer, user, attacker] = await ethers.getSigners()

        const Bank = await ethers.getContractFactory('Bank', deployer)
        bank = await Bank.deploy()

        await bank.deposit({ value: ethers.utils.parseEther('100') })
        await bank.connect(user).deposit({ value: ethers.utils.parseEther('50') })

        const Attacker = await ethers.getContractFactory('Attacker', attacker)
        attackerContract = await Attacker.deploy(bank.address)

    })

   describe('facilitates deposits and withdraws', () => {
       it('accepts deposits', async () => {
           //Check deposit balance
           const deployerBalance = await bank.balanceOf(deployer.address)
           expect(deployerBalance).to.eq(ethers.utils.parseEther('100'))

           const userBalance = await bank.balanceOf(user.address)
           expect(userBalance).to.eq(ethers.utils.parseEther('50'))
       })

       it('accepts withdraws', async () => {
           await bank.withdraw()

           const deployerBalance = await bank.balanceOf(deployer.address)
           const userBalance = await bank.balanceOf(user.address)

           expect(deployerBalance).to.eq(0)
           expect(userBalance).to.eq(ethers.utils.parseEther('50'))

       })

       it('allows attacker to drain funds from #withdraw()', async () => {
           console.log('*** Before ***')
           console.log(`Bank's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))}`)
           console.log(`Attacker's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))}`)

           //Perform Attack
           console.log('*** After ***')
           console.log(`Bank's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(bank.address))}`)
           console.log(`Attacker's balance: ${ethers.utils.formatEther(await ethers.provider.getBalance(attacker.address))}`)

           //Check bank balance has been drained
       })

    })
})