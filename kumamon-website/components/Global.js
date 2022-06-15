import { useState, useEffect } from 'react'
import ConnectMetamaskPopUp from '../components/ConnectMetamaskPopUp'
import LeftComponent from '../components/LeftComponent'
import MainContainer from '../components/MainContainer'
import RightComponent from '../components/RightComponent'
import StatusFooter from '../components/StatusFooter'
import WinFooter from '../components/WinFooter'
import { useMetamask } from '../hooks/useMetamask'

export default function Global() {
  const [checkNet, setCheckNet] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const metamask = useMetamask()

  const isCheckNet = async () => {
    setLoading(true)
    const data = await metamask.isRightNetwork(process.env.NEXT_PUBLIC_AVALANCE_NET_ID)
    setCheckNet(data.isRightNetwork)
    setLoading(false)
  }

  useEffect(() => {
      isCheckNet()
  }, [metamask.chainId])

  const handleInstal = (e) => {
    e.preventDefault()
    window.open(`https://metamask.app.link/dapp/${process.env.NEXT_PUBLIC_LINK_URL_INSTALL_METAMASK}`)
  }

  return (
    <MainContainer title='Random Panda'>
      {!metamask.notInstalled
          ?<>{!checkNet
            ? <>{!loading && <ConnectMetamaskPopUp 
                              onClick={metamask.handleChangeNetwork}
                              title='Connect to Avalance Network'
                              buttonText='Set the Avalance network'
                            />}</>
            : <>{!metamask.address && metamask.refused && <ConnectMetamaskPopUp
                                        onClick={metamask.handleConnectWallet}
                                        title='Please connect address'
                                        buttonText='Connect to address'
                                    />}</>
          }</>
          : <ConnectMetamaskPopUp
              onClick={handleInstal}
              title='Please install Metamask'
              buttonText='Install Metamask'
           />}
      <div className='Mint'>
        <div className='row m-0'>
          <div className='col-md-6 p-0'>
            <LeftComponent />
          </div>
          <div className='col-md-6 p-0'>
            <RightComponent />
          </div>
        </div>
        <div className='row m-0'>
          <div className='col-md-6 p-0'>
            <StatusFooter />
          </div>
          <div className='col-md-6 p-0'>
            <WinFooter />
          </div>
        </div>
      </div>
    </MainContainer>
  )
}