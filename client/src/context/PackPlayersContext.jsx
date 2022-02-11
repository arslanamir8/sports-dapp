import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../constants/constants'

export const PackPlayersContext = React.createContext()

const { ethereum } = window


export const PackPlayerProvider = ({ children }) => {
    const[currentAccount, setCurrentAccount] = useState('')

    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const packPlayersContract = new ethers.Contract(contractAddress, contractABI, signer)

    const checkIfWalletIsConnected = async () => {
        try {
        if(!ethereum) return alert('Please install metamask broski') 
        
        const accounts = await ethereum.request({ method: 'eth_accounts' })

        if(accounts.length) {
            setCurrentAccount(accounts[0])
        } else {
            console.log('No accounts found')
        }
        } catch (error) {
            console.log(error)
            
            throw new Error('No ethereum object.')
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install metamask broski') 

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error)
            
            throw new Error('No ethereum object.')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <PackPlayersContext.Provider value ={{ connectWallet, currentAccount, ethereum, packPlayersContract }}>
            {children}
        </PackPlayersContext.Provider>
    )

}