import styles from '../styles/Status.module.css'
import Image from 'next/image'
import { useMetamask } from '../hooks/useMetamask'
import { useBlockchain } from '../hooks/useBlockchain'

const StatusFooter = () => {
    const metamask = useMetamask()
    const blockchain = useBlockchain()

    return (
        <div className={styles.bg}>
            <div className='p-5'>
                <div className='d-flex align-items-end'>
                    <div><Image src='/wallet-crypto.png' height='50' width='50' /></div>&nbsp;&nbsp;
                    <h2 className='m-0'>Your Balance</h2>
                </div>
                <div className='card mt-3'>
                <div className='card-body text-center'>
                    {metamask.address
                    ?<>
                        <p>{metamask.address}</p>
                        <div className='d-flex align-items-end justify-content-center'>
                            <h1 className='m-0 p-0'>{blockchain.balance}</h1>&nbsp;
                            <p className='mb-1'>NFT</p>
                        </div>
                        <p className='mt-2'>Winning: {blockchain.winTotalAddress}</p>
                    </>
                    : <p className='m-0'>Connect to Address!</p>
                    }
                </div>
            </div>
            </div>
        </div>
    )
}

export default StatusFooter