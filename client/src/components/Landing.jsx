import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import PlayerBase from '../constants/PlayerBase.json'
import { Link } from 'react-router-dom'
import { contractABI, contractAddress } from '../constants/constants'

const { ethereum } = window

const Player = ({bgColor, position, name, img}) => (
    <div className={`${bgColor} box-border h-60 w-60 grid grid-rows-3 grid-flow-col justify-center`}>
        <div>
            {`${position}: ${name}`}
        </div>
        <div>
            {!img && (
                <img src={`./player_base/${name}.png`}/>            
            )}
        </div>
    </div>
)

//Figure out the slideshow of players effect
//Refactor all ethereum stuff needed across all pages, like the junk below
//Check out the second usestate, probably overkill for prod
const Landing = () => {
    const [team, setTeam] = useState([])
    const [id, setID] = useState([])

    const { connectWallet, currentAccount } = useContext(PackPlayersContext)
    const colors = ['bg-green-200', 'bg-blue-200', 'bg-orange-200', 'bg-yellow-200', 'bg-purple-200']

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const packPlayersContract = new ethers.Contract(contractAddress, contractABI, signer)

    const showPlayers = async () => {
        const players = await packPlayersContract.getPlayers(currentAccount)
        console.log(players)
        const ids = []
        setTeam(players)
        //const number = await packPlayersContract.getPlayerToID(players[0])
        //await console.log(number.toNumber())
        await (async () => {
            for (const player of players){
                var number = await packPlayersContract.getPlayerToID(player)
                number = await number.toNumber()
                ids.push(number)
                console.log(number)
            }
        })()
        setID(ids)
        //console.log(id)
    }

    useEffect(() => console.log(id), [id])

    const ownedPlayers = []
    for (let i = 0; i < team.length; i++){
        ownedPlayers.push(<Player position='PG' bgColor={colors[i]} name={team[i]}/>)
    }
    return(
        <div class="box-border h-screen w-full bg-rose-200">
            <>
            {team && (<p className="flex place-content-end p-2 text-white">{team}</p>)}
            </>
            <div className="flex place-content-end">
                {currentAccount && (<p className="flex place-content-end p-2 text-white">User: {currentAccount}</p>)}
                {!currentAccount && (
                    <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                    onClick={connectWallet}>Connect Wallet</button>
                )}
            <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                    onClick={showPlayers}>Show Players</button>
            </div>
            <Link to="/Store">Store</Link>
            <span className="flex place-content-center p-2">Colosseum</span>
            <div class="flex justify-center">
                <Player position='PG' bgColor='bg-green-200' name='' img={true}/>
                <Player position='SG' bgColor='bg-blue-200' name='' img={true}/>
                <Player position='SF' bgColor='bg-orange-200' name='' img={true}/>
                <Player position='PF' bgColor='bg-yellow-200' name='' img={true}/>
                <Player position='C' bgColor='bg-purple-200' name='' img={true}/>
            </div>
            <div class="flex place-content-center p-2">
                Owned Players
            </div>
            <div class="flex justify-center">
                {ownedPlayers}
            </div>
        </div>   
    )
}
export default Landing