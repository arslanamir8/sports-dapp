//CLEAN UP REFACTOR
import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import PlayerBase from '../constants/PlayerBase.json'
import { Link } from 'react-router-dom'
import { contractABI, contractAddress } from '../constants/constants'

const { ethereum } = window

const Player = ({bgColor, position, name, img}) => (
    <div className={`${bgColor} box-content h-60 w-60 grid grid-rows-4 justify-center`}>
        <>
            {`${position}: ${name}`}
        </>
        <>
            {img && (
                <img src={img}/>            
            )}
        </>
    </div>
)

//Figure out the slideshow of players effect
//Refactor all ethereum stuff needed across all pages, like the junk below
//Check out the second usestate, probably overkill for prod
const Landing = () => {
    const [team, setTeam] = useState([])
    const [id, setID] = useState([])
    const [ownedPlayer, setOwnedPlayer] = useState([])

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
        //holdings is mapping name to id
        await (async () => {
            for (const player of players){
                var number = await packPlayersContract.getPlayerToID(player)
                number = await number.toNumber()
                ids.push(number)
                console.log(number)
            }
        })()
        setID(ids)
    }

    useEffect(() => {renderOwnedPlayers();}, [id])
    useEffect(() => {showPlayers();}, [])


    const ownedPlayers = []
    let renderOwnedPlayers = () => {
        for (let i = 0; i < team.length; i++){
            ownedPlayers.push(<Player position={PlayerBase[id[i]]["position"]} bgColor={colors[i]} name={team[i]} key={i} img={PlayerBase[id[i]]["img"]}/>)
            setOwnedPlayer(ownedPlayers)
        }
    }
    return(
        <div className="box-border h-screen w-full bg-rose-200">
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
            <div className="flex justify-center">
                <Player position='PG' bgColor='bg-green-200' name='' img={true}/>
                <Player position='SG' bgColor='bg-blue-200' name='' img={true}/>
                <Player position='SF' bgColor='bg-orange-200' name='' img={true}/>
                <Player position='PF' bgColor='bg-yellow-200' name='' img={true}/>
                <Player position='C' bgColor='bg-purple-200' name='' img={true}/>
            </div>
            <div className="flex place-content-center p-2">
                Owned Players
            </div>
            <div className="flex justify-center">
                {ownedPlayer}
            </div>
        </div>   
    )
}
export default Landing