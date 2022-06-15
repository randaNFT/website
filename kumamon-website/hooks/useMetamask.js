import React, { useState, useEffect, useContext, createContext } from 'react'
import Web3 from 'web3'
import ConnectMetamaskPopUp from '../components/ConnectMetamaskPopUp'

const metamaskContext = createContext()

export function ProvideMetamask ({ children }) {
  const metamask = useProvideMetamask()
  return <metamaskContext.Provider value={metamask}>{children}</metamaskContext.Provider>
}

export const useMetamask = () => {
  return useContext(metamaskContext)
}

// Provider hook that creates auth object and handles state
function useProvideMetamask () {
  const [address, setAddress] = useState('')
  const [web3, setWeb3] = useState()
  const [unlinked, setUnlinked] = useState(false)
  const [notInstalled, setNotInstalled] = useState(false)
  const [connected, setConnected] = useState(false)
  const [refused, setRefused] = useState(false)
  const [askingPermission, setAskingPermission] = useState(false)
  const [warningMessage, setWarningMessage] = useState(false)
  const [wrongNetworkMessage, setWrongNetworkMessage] = useState(false)
  const [chainId, setChainId] = useState(false)


  const getAccountLegacy = async (web3Provider) => {
    setUnlinked(false)
    setNotInstalled(false)
    setConnected(true)
    setAskingPermission(false)
    const web3internal = new Web3(web3Provider)
    setWeb3(web3internal)
    web3.eth.getAccounts((error, accounts) => {
      // console.log('1. Change ADDRESS - accounts[0], address', accounts[0], address)
      setAddress(accounts[0])
      console.log(error)
      if (error) return false
      const address = accounts[0]
      console.log('address', address)
      setConnected(true)
      return address
    })
  }

  const getAccount = async (web3Provider) => {
    setRefused(false)
    setUnlinked(false)
    setNotInstalled(false)
    setConnected(true)
    setAskingPermission(false)
    const web3internal = new Web3(web3Provider)
    setWeb3(web3internal)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAddress(accounts[0])
      if (accounts && accounts[0]) {
        setUnlinked(false)
        setNotInstalled(false)
        setConnected(true)
        // console.log('2. Change ADDRESS - accounts[0], address', accounts[0], address)
        setAddress(accounts[0])
        setAskingPermission(false)
      }
      const address = accounts[0]
      // console.log('address', address)
      return address
    } catch (error) {
      // console.log('User denied account access...', error)
      setUnlinked(true)
      setRefused(true)
      setAskingPermission(false)
      setConnected(false)
      return false
    }
  }

  const signin = async () => {
    // console.log('signin...')
    setRefused(true)
    if (askingPermission) {
      console.log('askingPermission...')
      return
    }
    setAskingPermission(true)
    setRefused(false)
    // console.log('Metamask - signin')
    if (connected) {
      setAskingPermission(false)
      // console.log('Already connected!')
      setRefused(true)
      // console.log('address', address)
      return
    }
    let web3Provider
    // Modern dApp browsers...
    if (window.ethereum) {
      // console.log('window.ethereum')
      web3Provider = window.ethereum
      const account = await getAccount(web3Provider)
      return account
    } else if (window.web3) { // Legacy dApp browsers...
      // console.log('window.web3')
      web3Provider = window.web3.currentProvider
      const account = await getAccountLegacy(web3Provider)
      return account
    } else { // If no injected web3 instance is detected, fall back to Ganache
      console.error('Please install MetaMask!')
      setWarningMessage('Please Install Metamask')
      setNotInstalled(true)
      setAskingPermission(true)
      return false
    }
  }
  
  const handleChangeNetwork = async (e) => {
    e.preventDefault()
    await changeNetwork()
  }

  const checkRightNetwork = async (rightNet) => {
    // console.log(rightNet, 'is right net?')
    let web3Provider = false
    if (window.ethereum) {
      web3Provider = window.ethereum
    } else if (window.web3) { // Legacy dApp browsers...
      web3Provider = window.web3.currentProvider
    } else {
      console.error('Please Install Metamask.')
      setWarningMessage('Please Install Metamask')
      return false
    }

    if (web3Provider) {
      const web3internal = new Web3(web3Provider)
      const networkID = await web3internal.eth.net.getId()
      // console.log('networkID', networkID)
      // console.log('rightNet', rightNet)
      if (Array.isArray(rightNet)) {
        if (!rightNet.includes(networkID)) {
          console.error('Please set your network to BSC!')
          const msg = 'Please change your network on Metamask. Valid network is: ' + networksNames(rightNet)
          setWarningMessage(msg)
          setWrongNetworkMessage(msg)
          return false
        } else {
          setWarningMessage(false)
          setWrongNetworkMessage(false)
          return true
        }
      } else {
        if (Number(networkID) !== Number(rightNet)) {
          const msg = `Please set your network on Metamask to ${networksNames(rightNet)}`
          setWarningMessage(msg)
          setWrongNetworkMessage(msg)
          return false
        } else {
          setWarningMessage(false)
          setWrongNetworkMessage(false)
          return true
        }
      }
    }
  }

  const isRightNetwork = async () => {
    let warningMessage = ''
    const rightNet = getValidNetworks()
    let web3Provider = false
    if (window.ethereum) {
      web3Provider = window.ethereum
    } else if (window.web3) { // Legacy dApp browsers...
      web3Provider = window.web3.currentProvider
    } else {
      console.error('Please Install Metamask.')
      warningMessage = 'Please Install Metamask'
      return {
        isRightNetwork: false,
        warningMessage
      }
    }

    if (web3Provider) {
      const web3internal = new Web3(web3Provider)
      const networkID = await web3internal.eth.net.getId()
      // console.log('networkID', networkID)
      // console.log('rightNet', rightNet)
      if (Array.isArray(rightNet)) {
        if (!rightNet.includes(networkID)) {
          console.error('Please set your network to BSC!')
          warningMessage = 'Please change your network on Metamask. Valid network is: ' + networksNames(rightNet)
          return {
            isRightNetwork: false,
            warningMessage
          }
        } else {
          return {
            isRightNetwork: true,
            warningMessage
          }
        }
      } else {
        if (Number(networkID) !== Number(rightNet)) {
          warningMessage = `Please set your network on Metamask to ${networksNames(rightNet)}`
          return {
            isRightNetwork: false,
            warningMessage
          }
        } else {
          return {
            isRightNetwork: true,
            warningMessage
          }
        }
      }
    }
  }

  const networksNames = (netId = false) => {
    const names = []
    names[1] = 'Ethereum Mainnet'
    names[3] = 'Ethereum Ropsten'
    names[42] = 'Ethereum Kovan'
    names[4] = 'Ethereum Rinkeby'
    names[5] = 'Ethereum Goerli'
    names[56] = 'Binance Smart Chain'
    names[97] = 'Binance Smart Chain Testnet'
    names[43113] = 'Avalanche FUJI C-Chain'
    names[43114] = 'Avalanche Mainnet C-Chain'
    if (netId) {
      if (Array.isArray(netId)) {
        const validNames = []
        for (let i = 0; i < netId.length; i++) {
          validNames.push(names[netId[i]])
        }
        return validNames
      } else if (names[netId]) {
        return names[netId]
      } else {
        console.error(`Network ID ${netId} Not found in the networksNames list`)
        return networksNames(process.env.NEXT_PUBLIC_AVALANCE_NET_ID)
      }
    } else {
      return names
    }
  }
  const getValidNetworks = () => {
    return [Number(process.env.NEXT_PUBLIC_AVALANCE_NET_ID)]
  }

  const connectWithMetamask = async () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        // console.log('#### - accountsChanged - address , !accounts[0]', address , !accounts[0])
        if (!address && accounts[0]) {
          // console.log('3. Change ADDRESS - accounts[0], address', accounts[0], address)
          setAddress(accounts[0])
          // console.log('1. Refresh the page')
        } else {
          // console.log('4. Change ADDRESS - accounts[0], address', accounts[0], address)
          // console.log('2. Dont refresh the page')
          setAddress(accounts[0])
          window.location.reload()
        }
      // setAddress(accounts[0])
      // window.location.reload()
      })
      window.ethereum.on('chainChanged', function (chainId) {
        setChainId(Math.floor(chainId))
        // window.location.reload()
      })
      // window.ethereum.on('error', function (error) {
      //   console.log('---- error', error)
      // })
      const chain = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(Math.floor(chain))
      signin()
      if(address) {
        setRefused(true)
      } 
    } else if (window.web3) {
      console.log('window.web3 ???')
    } else {
      setNotInstalled(true)
    }
  }

  useEffect(() => {
    connectWithMetamask()
  }, [web3])

  const handleConnectWallet = (e) => {
    e.preventDefault()
    connectWithMetamask()
  }

  const changeNetwork = async () => {
    if (window.ethereum) {
      const ethereum = window.ethereum
      console.log('>>>>>>', process.env.NEXT_PUBLIC_AVALANCE_NETWORK)
      const data = [{
        chainId: await web3.utils.toHex(process.env.NEXT_PUBLIC_AVALANCE_NET_ID),
        chainName: 'Avalanche C-Chain',
        // iconUrls: ['https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png'],
        nativeCurrency:
          {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
          },
        rpcUrls: [process.env.NEXT_PUBLIC_AVALANCE_NETWORK],
        blockExplorerUrls: [process.env.NEXT_PUBLIC_AVALANCE_EXPLORER]
      }]
      /* eslint-disable */
      const tx = await ethereum.request({method: 'wallet_addEthereumChain', params:data}).catch()
      if (tx) {
          console.log(tx)
      }
    }
  }
  // Return the user object and auth methods
  return {
    changeNetwork,
    handleChangeNetwork,
    address,
    signin,
    unlinked,
    notInstalled,
    web3,
    connected,
    refused,
    warningMessage,
    setWarningMessage,
    wrongNetworkMessage,
    checkRightNetwork,
    networksNames,
    chainId,
    handleConnectWallet,
    isRightNetwork,
  }
}
