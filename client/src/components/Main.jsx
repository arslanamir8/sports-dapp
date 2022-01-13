import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useRef, useState } from 'react'
import { BalancesContext } from "../context/BalancesContext"
import { ethers } from 'ethers'

import { contractABI, contractAddress } from '../constants/constants'

const { ethereum } = window


const Main = () => {
    const [player, setPlayer] = useState()

    const { connectWallet, currentAccount } = useContext(PackPlayersContext)
    const { currentLinkBalance, currentKethBalance, getBalances } = useContext(BalancesContext)

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const packPlayersContract = new ethers.Contract(contractAddress, contractABI, signer)
    
    //Contract interaction
    const buyPlayer = async () => {
        await packPlayersContract.buy(currentAccount)
        await packPlayersContract.player(currentAccount)
        const packed_player = await packPlayersContract.getPlayers(currentAccount)
        await console.log(packed_player)
        await setPlayer(packed_player)
    }

    const listy = ['Hello', 'there']

    return(
        <>
            <div>
                {currentAccount && (<p>Current Address: {currentAccount}</p>)}
                <p>Pack Players contract address: {contractAddress}</p>
                {!currentAccount && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={connectWallet}>Connect Wallet</button>
                )}

                <input className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Price"/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4" onClick={buyPlayer}>Buy Pack</button>
            <div>
                {currentAccount && getBalances(), (
                    <>
                    <p>Current link balance of contract: {currentLinkBalance}</p>
                    <p>Your KETH balance: {currentKethBalance}</p>
                    </>
                )}
                {player && (player)}
            </div>
            </div>
        </>
    )
}
export default Main