const EtherStore = artifacts.require('EtherStore')
const ExploitEtherStore = artifacts.require('EtherStore')

module.exports = async deployer => {
  try {
    await deployer.deploy(EtherStore)
    const etherStore = await EtherStore.deployed()
    console.log({'etherstore address here': etherStore.address})
    
    await deployer.deploy(ExploitEtherStore)
    const exploitEtherStore = await ExploitEtherStore.deployed(etherStore.address)
    console.log({'etherstore address here': exploitEtherStore.address})
  } catch(err) {
    console.log(err)
  }
}