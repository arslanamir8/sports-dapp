//CLEAN UP REFACTOR
import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useState, useEffect } from 'react'
import PlayerBase from '../constants/PlayerBase.json'
import { Link } from 'react-router-dom'

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

const Board = () => (
    <div className="flex justify-center">
        <Player position='PG' bgColor='bg-green-200' name='' img={true}/>
        <Player position='SG' bgColor='bg-blue-200' name='' img={true}/>
        <Player position='SF' bgColor='bg-orange-200' name='' img={true}/>
        <Player position='PF' bgColor='bg-yellow-200' name='' img={true}/>
        <Player position='C' bgColor='bg-purple-200' name='' img={true}/>
    </div>
)

//Figure out the slideshow of players effect
//Refactor all ethereum stuff needed across all pages, like the junk below
//Check out the second usestate, probably overkill for prod
const Landing = () => {
    const [team, setTeam] = useState([])
    const [id, setID] = useState([])
    const [ownedPlayer, setOwnedPlayer] = useState([])
    const colors = ['bg-green-200', 'bg-blue-200', 'bg-orange-200', 'bg-yellow-200', 'bg-purple-200']

    const { connectWallet, currentAccount, packPlayersContract } = useContext(PackPlayersContext)

    const showPlayers = async () => {
        const players = await packPlayersContract.getPlayers(currentAccount)
        console.log(players)
        const ids = []
        setTeam(players)
        await (async () => {
            for (const player of players){
                var number = await packPlayersContract.getPlayerToID(player)
                ids.push(number.toNumber())
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
            <div className="flex place-content-end">
                {currentAccount ? 
                    (<p className="flex place-content-end p-2 text-white bg-red-200 hover:bg-red-300 font-bold py-2 px-4 rounded">User: {currentAccount}</p>) 
                    :
                    (
                        <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                        onClick={connectWallet}>Connect Wallet</button>
                    )}
            <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                    onClick={showPlayers}>Show Players</button>
            </div>
            <Link className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" to="/Store">Store</Link>
            <p className="flex place-content-center bg-red-200 text-white font-bold py-2 px-4 rounded p-2">Colosseum</p>
            <Board/>
            <div className="flex place-content-center bg-red-200 text-white font-bold py-2 px-4 rounded p-2">
                Owned Players
            </div>
            <div className="flex justify-center">
                {ownedPlayer}
            </div>
        </div>   
    )
}
export default Landing