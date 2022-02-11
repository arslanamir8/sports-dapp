import React, { useState, useEffect} from 'react'
import { contractAddress } from '../constants/constants'
import { ethers } from 'ethers'

const { ethereum } = window

export const BalancesContext = React.createContext()

const provider = new ethers.providers.Web3Provider(window.ethereum);
const linkAddress = '0xa36085F69e2889c224210F603D836748e7dC0088'
const linkABI = require('../constants/erc20.json')
const linkContract = new ethers.Contract(linkAddress, linkABI, provider);


export const BalancesProvider = ({ children }) => {
    const [currentLinkBalance, setCurrentLinkBalance] = useState('')
    const [currentKethBalance, setCurrentKethBalance] = useState('')

    const getBalances = async () => {
        const accounts = await ethereum.request({ method: 'eth_accounts' })
        const account = accounts[0]
        const balance = await provider.getBalance(account)
        setCurrentKethBalance(ethers.utils.formatUnits(balance, 18))
        const linkBalance = await linkContract.balanceOf(contractAddress)
        setCurrentLinkBalance(ethers.utils.formatUnits(linkBalance, 18))
    }

    useEffect(() => {
        getBalances()
    }, [])

    return (
        <BalancesContext.Provider value ={{ currentLinkBalance, currentKethBalance, getBalances }}>
            {children}
        </BalancesContext.Provider>
    )
}
