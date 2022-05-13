//CLEAN UP REFACTOR
//Absolutely disgusting
import { PackPlayersContext } from "../context/PackPlayersContext"
import React, { useContext, useState, useEffect } from 'react'
import PlayerBase from '../constants/PlayerBase.json'
import { Link } from 'react-router-dom'
import { useDrag, useDrop } from "react-dnd"

const Player = ({ bgColor, name, img}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "div",
        item: {id: name},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    return (
        <div ref={drag} className={`${bgColor} box-content h-60 w-60 grid grid-rows-4 justify-center`}>
            <span className="flex justify-center">
                {name}
            </span>
            <>
                {img && (
                    <img src={img}/>            
                )}
            </>
            <>
                {isDragging && (
                    <p>Dragging</p>
                )}
            </>
        </div>
    )
}

const Board = React.forwardRef((props, ref) => {
    const emptyFive = [<Player bgColor='bg-green-200' name='' img={true}/>, <Player bgColor='bg-blue-200' name='' img={true}/>, <Player bgColor='bg-orange-200' name='' img={true}/>, <Player bgColor='bg-yellow-200' name='' img={true}/>, <Player bgColor='bg-purple-200' name='' img={true}/>]
    return (
        <div className="flex justify-center" ref={ref}>
            {emptyFive}
        </div>
        
    )
})

//Figure out the slideshow of players effect
//Check out the second state
const Landing = () => {
    const [team, setTeam] = useState([])
    const [id, setID] = useState([])
    const [ownedPlayer, setOwnedPlayer] = useState([])
    const [board, setBoard] = useState([])

    const [{isOver}, drop] = useDrop(() => ({
        accept: "div",
        drop: (item) => addPlayerToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addPlayerToBoard = (id) => {
        console.log(id)
    }

    const colors = ['bg-green-200', 'bg-blue-200', 'bg-orange-200', 'bg-yellow-200', 'bg-purple-200']

    const { connectWallet, currentAccount, packPlayersContract } = useContext(PackPlayersContext)

    const showPlayers = async () => {
        const players = await packPlayersContract.getPlayers(currentAccount)
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
            ownedPlayers.push(<Player bgColor={colors[i]} name={team[i]} key={i} img={PlayerBase[id[i]]["img"]}/>)
            setOwnedPlayer(ownedPlayers)
        }
    }

    return(
        <div className="box-border h-screen w-full bg-rose-200">
            <div className="flex place-content-end">
                {currentAccount ? 
                    (   
                        <p className="flex place-content-end p-2 text-white bg-red-200 hover:bg-red-300 font-bold py-2 px-4 rounded">
                        User: {currentAccount}</p>)
                    :
                    (
                        <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                        onClick={connectWallet}>Connect Wallet</button>)
                }
                <button className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" 
                    onClick={showPlayers}>Show Players</button>
            </div>
            <Link className="bg-red-200 hover:bg-red-300 text-white font-bold py-2 px-4 rounded p-2" to="/Store">Store</Link>
            <p className="flex place-content-center bg-red-200 text-white font-bold py-2 px-4 rounded p-2">Colosseum</p>
            <Board ref={drop}/>
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
