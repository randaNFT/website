const minterAbi = require('../solidity/MinterABI.json')

export const initBlockchainVars = (web3) => {
  const minterAddress = process.env.NEXT_PUBLIC_MINTER_ADDRESS
  const minterContract = new web3.eth.Contract(minterAbi, minterAddress)
  return {
    minterAddress,
    minterContract
  }
}

export const mintPanda = async (address, web3) => {
  const { minterContract } = initBlockchainVars(web3)
  try {
    const mint = await minterContract.methods.mint().send({ from: address, value: web3.utils.toWei('1')})
    return mint
  } catch (error) {
    // console.log('error: ', error)
    return error
  }
}

export const mintPandaWithClaim = async (address, web3, claim) => {
  const { minterContract } = initBlockchainVars(web3)
  try {
    const mint = await minterContract.methods.mintWithClaim(claim).send({ from: address})
    return mint
  } catch (error) {
    // console.log('error: ', error)
    return error
  }
}


export const getBalancePanda = async (address, web3) => {
  const { minterContract } = initBlockchainVars(web3)
  try {
    const balance = await minterContract.methods.balanceOf(address).call()
    return balance
  } catch (error) {
    // console.log('error: ', error)
    return error
  }
}

export const getTotalSupplyPanda = async (web3) => {
  const { minterContract } = initBlockchainVars(web3)
  try {
    const total = await minterContract.methods.totalSupply().call()
    return total
  } catch (error) {
    // console.log('error: ', error)
    return error
  }
}

export const getWinAddress = async (address, web3) => {
  const { minterContract } = initBlockchainVars(web3)
  try {
    const data = await minterContract.methods.hasWon(address).call()
    return data
  } catch (error) {
    // console.log('error: ', error)
    return error
  }
}
export const getWinTotal = async (web3) => {
  const { minterContract } = initBlockchainVars(web3)
  try {
    const data = await minterContract.methods.getWinners().call()
    return data
  } catch (error) {
    // console.log('error: ', error)
    return error
  }
}

const blockchain = {
  initBlockchainVars,
  mintPanda,
  mintPandaWithClaim,
  getBalancePanda,
  getTotalSupplyPanda,
  getWinAddress,
  getWinTotal
}

export default blockchain