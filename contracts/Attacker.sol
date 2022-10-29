//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IBank {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker {
    IBank public immutable bank;

    constructor(address _bank) {
        bank = IBank(_bank);
    }

}