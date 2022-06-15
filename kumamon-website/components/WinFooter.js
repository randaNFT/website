import { useState, useEffect } from 'react'
import styles from '../styles/Win.module.css'
import Image from 'next/image'
import { useMetamask } from '../hooks/useMetamask'
import { getWinTotal } from '../modules/blockchain'

const WinFooter = () => {
    const [winTotals, setWinTotals] = useState([])
    const metamask = useMetamask()

    const winTotal = async () => {
        const data = await getWinTotal(metamask.web3)
        setWinTotals(data)
      }
    
      useEffect(() => {
          if(metamask.address && metamask.chainId == process.env.NEXT_PUBLIC_AVALANCE_NET_ID) {
            winTotal()
          }
      }, [metamask.address, metamask.chainId])

    function getDataFromTimestampGMT (t) {
        const date = new Date(t * 1000)
        const year = date.getFullYear()
        const month = ('0' + (date.getMonth() + 1)).substr(-2)
        const day = ('0' + date.getDate()).substr(-2)
        const hour = ('0' + date.getHours()).substr(-2)
        const minutes = ('0' + date.getMinutes()).substr(-2)
        let timeZone = date.getTimezoneOffset()
        timeZone = (timeZone / 60) * -1
        let gmt = 'GMT'
        if (timeZone !== 0) {
          gmt += timeZone > 0 ? ' +' : ' '
          gmt += timeZone
        }
      
        return day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ' ' + gmt
    }


    return (
        <div className={styles.bg}>
            <div className='p-5'>
                <div className='d-flex align-items-end'>
                    <div><Image src='/cup.png' height='50' width='50' /></div>&nbsp;&nbsp;
                    <h2 className='m-0'>The Winners</h2>
                </div>
                {winTotals.length <= 0
                ? <div className='card mt-3 bg-right-card'>
                    <div className='card-body text-center'>
                    <p className='m-0'>There are no winners yet!</p>
                    </div>
                </div>
                : <>{ winTotals.map((item, index) => {
                    return <div key={index} className='card mt-3 bg-right-card'>
                                <div className='card-body text-center d-flex flex-column'>
                                <span>{getDataFromTimestampGMT(item.timestamp)}</span>
                                <p className='m-0'>{item.winnerAddress}</p>
                                </div>
                            </div>
                    })}
                </>
                }
            </div>
        </div>
    )
}

export default WinFooter