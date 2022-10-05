const { expect } = require('chai'); 
const { ethers } = require('hardhat');

describe('Counter', () => {
    let counter

    beforeEach(async () => {
        const Counter = await ethers.getContractFactory('Counter')
        counter = await Counter.deploy('My Counter', 1)
    })

    describe('Deployment', () => {

        it('stores the count', async() => {
            expect(await counter.count()).to.equal(1)
        })

        it('stores the name', async() => {
            expect(await counter.name()).to.equal('My Counter')
        })
    })

    describe('Counting', () => {
        let transaction

        it('reads the count from the "count" public varible', async () => {
            expect(await counter.count()).to.equal(1)
        })

        it('reads the count from the "getCount()" function', async () => {
            expect(await counter.getCount()).to.equal(1)
        })

        it('increment the count', async () => {
            transaction = await counter.increment()
            await transaction.wait()

            expect(await counter.count()).to.equal(2)

            transaction = await counter.increment()
            await transaction.wait()

            expect(await counter.count()).to.equal(3)
        })

        it('decrements the count', async () => {
            transaction = await counter.decrement()
            await transaction.wait()

            expect(await counter.count()).to.equal(0)

            //Cannot decrement count below 0
            await expect(counter.decrement()).to.be.reverted

        })

        
        it('reads the name from the "name" public varible', async () => {
            expect(await counter.name()).to.equal('My Counter')
        })

        it('reads the name from the "getName()" function', async () => {
            expect(await counter.getName()).to.equal('My Counter')
        })

        it('updates the name', async () => {
            transaction = await counter.setName('New Name')
            await transaction.wait()
            expect(await counter.name()).to.equal('New Name')
        })


    })

})