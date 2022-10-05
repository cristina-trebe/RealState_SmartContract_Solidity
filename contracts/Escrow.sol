// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IERC721 {
    function trasferForm(address _form, address _to, uint256 _id) external;
}

contract Escrow {
    address public nftAddress;
    uint256 public nftID;
    address payable public seller;
    address payable public buyer;

    constructor(
        address _nftAddress, 
        uint256 _nftID, 
        address payable _seller,
        address payable _buyer
    ) {
        nftAddress = _nftAddress;
        nftID = _nftID;
        seller = _seller;
        buyer = _buyer;
    }

    function finalizeSale() public {
        //Transfer owneership of property
        IERC721(nftAddress).trasferForm(seller, buyer, nftID);
    }
}