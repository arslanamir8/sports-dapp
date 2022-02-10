import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useState } from 'react'
import { ethers } from 'ethers'
import { useEffect } from "react"

import { contractABI, contractAddress } from '../constants/constants'

const { ethereum } = window

const Player = ({bgColor, position, name}) => (
    <div className={`${bgColor} box-border h-60 w-60 grid grid-rows-3 grid-flow-col justify-center`}>
        <div>
            {`${position}: ${name}`}
        </div>
        <div>
            <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" alt="LeBron James"/>
        </div>
    </div>
)

//Figure out the slideshow of players effect
const Landing = () => {
    const { connectWallet, currentAccount } = useContext(PackPlayersContext)

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const packPlayersContract = new ethers.Contract(contractAddress, contractABI, signer)

    const showPlayers = async () => {
        const players = await packPlayersContract.getPlayers(currentAccount)
        await console.log(players)
    }

    return(
        <div class="box-border h-screen w-full bg-rose-200">
            <div className="flex place-content-end">
                {currentAccount && (<p className="flex place-content-end p-2 text-white">User: {currentAccount}</p>)}
                {!currentAccount && (
                    <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                    onClick={connectWallet}>Connect Wallet</button>
                )}
            <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                    onClick={showPlayers}>Show Players</button>
            </div>
            <span className="flex place-content-center p-2">Colosseum</span>
            <div class="flex justify-center">
                <Player position='PG' bgColor='bg-green-200' name='LeBron James'/>
                <Player position='SG' bgColor='bg-blue-200'/>
                <Player position='SF' bgColor='bg-orange-200'/>
                <Player position='PF' bgColor='bg-yellow-200'/>
                <Player position='C' bgColor='bg-purple-200'/>
            </div>
            <div class="flex place-content-center p-2">
                Owned Players
            </div>
            <div class="flex justify-center">
                <Player position='PG' bgColor='bg-green-200'/>
                <Player position='SG' bgColor='bg-blue-200'/>
                <Player position='SF' bgColor='bg-orange-200'/>
                <Player position='PF' bgColor='bg-yellow-200'/>
                <Player position='C' bgColor='bg-purple-200'/>
                <Player position='PG' bgColor='bg-green-200'/>
                <Player position='SG' bgColor='bg-blue-200'/>
                <Player position='SF' bgColor='bg-orange-200'/>
            </div>
        </div>   
    )
}
export default Landing