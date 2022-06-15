import { useState, useEffect, useContext, createContext } from 'react'
import { useMetamask } from './useMetamask'
import {
  mintPanda,
  mintPandaWithClaim,
  getBalancePanda,
  getTotalSupplyPanda,
  getWinAddress
} from '../modules/blockchain'
// import { formatNumber } from '../utils/utils'
// import { gte } from '../modules/bnUtils'

const blockchainContext = createContext()

export function ProvideBlockchain ({ children }) {
  const blockchain = useProvideBlockchain()
  return <blockchainContext.Provider value={blockchain}>{children}</blockchainContext.Provider>
}

export const useBlockchain = () => {
  return useContext(blockchainContext)
}

function useProvideBlockchain () {

  const metamask = useMetamask()

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [balance, setBalance] = useState('')
  const [totalPanda, setTotalPanda] = useState('0')
  const [mintNft, setMintNft] = useState()
  const [mintNftWithClaim, setMintNftWithClaim] = useState()
  const [winTotalAddress, setWinTotalAddress] = useState('')
  
  const mintsNft = async () => {
    setError('')
    setMessage('')
    const data = await mintPanda(metamask.address, metamask.web3)
    if (data.status === true) {
      setMintNft(data)
      setMessage('Your balance has been updated.')
    } else {
      setMessage('')
      setError('transaction failed!')
    }
  }

  const mintsNftClaim = async (claim) => {
    setError('')
    setMessage('')
    const data = await mintPandaWithClaim(metamask.address, metamask.web3, claim)
    if (data.status === true) {
      setMintNftWithClaim(data)
      setMessage('Your balance has been updated.')
    } else {
      setMessage('')
      setError('transaction failed!')
    }
  }

  const balancePanda = async () => {
    const data = await getBalancePanda(metamask.address, metamask.web3)
    setBalance(data)
  }

  const totalSypply = async () => {
    const data = await getTotalSupplyPanda(metamask.web3)
    setTotalPanda(data)
  }

  const winAddress = async () => {
    const data = await getWinAddress(metamask.address, metamask.web3)
    setWinTotalAddress(data)
  }

  useEffect(() => {
    if (metamask.address && metamask.chainId == process.env.NEXT_PUBLIC_AVALANCE_NET_ID) {
      balancePanda()
      totalSypply()
      winAddress()
    }
  }, [metamask.address, metamask.chainId, mintNft, mintNftWithClaim])


  return {
    totalPanda,
    winTotalAddress,
    balance,
    setMessage,
    setError,
    message,
    error,
    mintsNft,
    mintsNftClaim
  }
}
