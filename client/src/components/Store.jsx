import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useState } from 'react'
import { BalancesContext } from "../context/BalancesContext"
import { ethers } from 'ethers'
import { Link } from 'react-router-dom'

import { contractABI, contractAddress } from '../constants/constants'

const { ethereum } = window


const Store = () => {
    const [player, setPlayer] = useState([])

    const { connectWallet, currentAccount } = useContext(PackPlayersContext)
    const { currentLinkBalance, currentKethBalance, getBalances } = useContext(BalancesContext)

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const packPlayersContract = new ethers.Contract(contractAddress, contractABI, signer)
    

    //Contract interaction
    const buyPlayer = async () => {
        await packPlayersContract.buy(currentAccount)
    }

    const showPlayers = async () => {
        const players = await packPlayersContract.getPlayers(currentAccount)
        await console.log(players)
        await setPlayer(players)
    }

    const clearPlayers = async () => {
        await packPlayersContract.clearPackedPlayers(currentAccount)
        await setPlayer([])
    }

    packPlayersContract.once('DiceLanded', (requestId, d20Value) => {
        packPlayersContract.player(currentAccount)
    })

    packPlayersContract.once('Packed', (owner) => {showPlayers()})
    
    return(
        <>
            <div>
                <Link to="/">Home</Link>
                {currentAccount && (<p>Current Address: {currentAccount}</p>)}
                <p>Pack Players contract address: {contractAddress}</p>
                {!currentAccount && (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                    onClick={connectWallet}>Connect Wallet</button>
                )}

                <input className="shadow appearance-none border rounded w-half py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Price"/>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4" onClick={buyPlayer}>Buy Players</button>
                <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4"onClick={clearPlayers}>Clear Players</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 mt-4" onClick={showPlayers}>Show Players</button>
            <div>
                {currentAccount && getBalances(), (
                    <>
                    <p>Current link balance of contract: {currentLinkBalance}</p>
                    <p>Your KETH balance: {currentKethBalance}</p>
                    </>
                )}
                {player && player.map((guy) => (
                    <div>
                        <p>{guy}</p>
                        <br></br>
                        <br></br>
                    </div>
                ))}
            </div>
            </div>
        </>
    )
}
export default Store