// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0;

contract EtherStore {

  mapping(address => uint) public balance;

  event LogDeposit(address indexed sender, uint depositAmount, uint contractETHBal);

  function deposit() public payable {
    require(msg.value > 0, 'deposit must be greater than 0');
    balance[msg.sender] += msg.value;
    uint contractETHBal = address(this).balance;
    emit LogDeposit(msg.sender, msg.value, contractETHBal);
  }

  function withdraw(uint _amount) public payable {
    require(_amount >= balance[msg.sender]);
    (bool sent, ) = msg.sender.call{value: _amount}('');
    require(sent, 'failed to send');
    balance[msg.sender] -= _amount;

  }

  function getEtherStoreBalance() public view returns(uint) {
    return address(this).balance;

  }

}