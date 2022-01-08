import React, { useEffect, useState } from 'react'

export const PackPlayersContext = React.createContext()

const { ethereum } = window


export const PackPlayerProvider = ({ children }) => {
    const[currentAccount, setCurrentAccount] = useState('')

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

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask broski') 

            //get data from form 
        } catch (error) {
            console.log(error)
            
            throw new Error('No ethereum object.')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <PackPlayersContext.Provider value ={{ connectWallet, currentAccount }}>
            {children}
        </PackPlayersContext.Provider>
    )

}