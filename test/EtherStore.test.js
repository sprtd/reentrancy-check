
const EtherStore = artifacts.require('EtherStore')

const truffleAssert = require('truffle-assertions')
let etherStore,  deployer, addr1, addr2, addr3, addr4

const { default: Web3 } = require('web3')
const { fromWei, toWei, ETHBalance } = require('../utils/conversion')

contract('EtherStore', async payloadAccounts => {

  deployer = payloadAccounts[0]
  addr1 = payloadAccounts[1]
  addr2 = payloadAccounts[2]
  addr3 = payloadAccounts[3]
  addr4 = payloadAccounts[4]


  beforeEach(async() => {
    etherStore = await EtherStore.deployed()
  })


  contract('Deposit', () => {
    it('Allows accounts deposit ether to etherStore', async () => {
      const etherStoreAddress = etherStore.address
      const etherStoreBalanceBefore = await web3.eth.getBalance(etherStoreAddress)
      console.log({'etherstore ETH balance': etherStoreBalanceBefore})  
      
      const depositAmount = toWei(1)
      const depositResult1 = await etherStore.deposit({from: addr1, value: depositAmount})
      const etherStoreBalanceAfter1 = await web3.eth.getBalance(etherStoreAddress)

      assert.equal(fromWei(etherStoreBalanceAfter1), fromWei(depositAmount))

      const depositResult2 = await etherStore.deposit({from: addr2, value: depositAmount})
      const etherStoreBalanceAfter2 = await web3.eth.getBalance(etherStoreAddress)
    

      assert.equal(fromWei(etherStoreBalanceAfter2), 2)

      truffleAssert.eventEmitted(depositResult1, 'LogDeposit', (ev) => {
        return ev.sender === addr1 && fromWei(ev.depositAmount) === fromWei(depositAmount) && fromWei(ev.contractETHBal) === fromWei(etherStoreBalanceAfter1)
      })
      
      truffleAssert.eventEmitted(depositResult2, 'LogDeposit', ev => {
        console.log('log ev contract bal', fromWei(ev.contractETHBal))
        return ev.sender === addr2 && fromWei(ev.depositAmount) === fromWei(depositAmount) && fromWei(ev.contractETHBal) == 2
      })
    })

    





  })

})