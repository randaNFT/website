import styles from '../styles/Right.module.css'
import Image from 'next/image'

const RightComponent = () => {
    return (
        <div className={styles.bg}>
            <div className='d-flex flex-column p-4'>
                <div className='position-relative'>
                    <div className='d-flex align-items-end justify-content-end'>
                        <h1 className={styles.decoration}>3</h1>&nbsp;<p>minting</p>&nbsp;&nbsp;
                        <h1 className={styles.decoration}>3</h1>&nbsp;<p>chain</p>&nbsp;&nbsp;
                        <h1 className={styles.decoration}>3</h1>&nbsp;<p>NFT</p>
                    </div>
                    <div className={styles.textree}>
                        <h1 className='m-0'>How it works</h1>
                    </div>
                    <div className={styles.tree}>
                        <Image src='/tree2.png' width={70} height={100} />
                    </div>
                </div>
                <div>
                    <div className={styles.mint}>
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <div className='d-flex align-items-center'>
                                <h4 className={styles.orange}>1°</h4>&nbsp;<p className='m-0'>mint on Avalance</p>
                            </div>
                            <div>
                                <p className={styles.orange}>Price: 1 NFT = 1 AVAX</p>
                                <p className='m-0'>Total supply: 1.000 NFT</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mint}>
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <div className='d-flex align-items-center'>
                                <h4 className={styles.orange}>2°</h4>&nbsp;<p className='m-0'>mint on BNB Chain</p>
                            </div>
                            <div>
                                <p className={styles.orange}>Price: 1 NFT = 1 BNB</p>
                                <p className='m-0'>Total supply: 5.000 NFT</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mint}>
                        <div className='d-flex align-items-center justify-content-between m-2'>
                            <div className='d-flex align-items-center'>
                                <h4 className={styles.orange}>3°</h4>&nbsp;<p className='m-0'>mint on Ethereum Chain</p>
                            </div>
                            <div>
                                <p className={styles.orange}>Price: 1 NFT = 1 ETH</p>
                                <p className='m-0'>Total supply: 10.000 NFT</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-3'>
                    <h2 className={styles.orange}>One each mint/chain every 5 NFT</h2>
                    <h2 className={styles.orange}>one address wins double the price paid</h2>
                </div>
                <div className='row m-0 pt-5'>
                    <div className='col-md-4 d-flex align-items-center justify-content-center'>
                        <div className={styles.moneybg}>
                            <div className={styles.money}>
                                <Image src='/money.png' height={100} width={120} />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <div className='d-flex align-items-center mt-2'>
                            <p className='m-0'>Mint</p>&nbsp;<h5 className={styles.decorationmint}>1 Avalnce NFT</h5>&nbsp;<p className='m-0'>and</p>&nbsp;<h5 className={styles.decorationmint}>get 3 NFT:</h5>
                        </div>
                        <div className='d-flex align-items-center mt-2'>
                            <h5 className='m-0'>1</h5>&nbsp;<p className='m-0'>on Avalance chain</p>&nbsp;<h5 className='m-0'>value 1 AVAX</h5>
                        </div>
                        <div className='d-flex align-items-center mt-2'>
                            <h5 className='m-0'>1</h5>&nbsp;<p className='m-0'>on BNB chain</p>&nbsp;<h5 className='m-0'>value 1 BNB</h5>
                        </div>
                        <div className='d-flex align-items-center mt-2'>
                            <h5 className='m-0'>1</h5>&nbsp;<p className='m-0'>on Ethereum</p>&nbsp;<h5 className='m-0'>value 1 ETH</h5>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-5'>
                    <h2>If you owns 1 Avalance NFT</h2>
                    <h2>You are early !!!</h2>
                </div>
            </div>
        </div>
    )
}

export default RightComponent