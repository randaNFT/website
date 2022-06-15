import { useState } from 'react'
import styles from '../styles/Left.module.css'
import Image from 'next/image'
import { useBlockchain } from '../hooks/useBlockchain'
import { useRouter } from 'next/router'

const LeftComponent = () => {
    const [value, setValue] = useState('')
    const [disable, setDisable] = useState(false)
    const [errors, setErrors] = useState('')


    const router = useRouter()
    const blockchain = useBlockchain()

    const handleMint = async (e) => {
        e.preventDefault()
        setDisable(true)
        await blockchain.mintsNft()
        setDisable(false)
        setErrors('')
    }
    
    const handleMintWithClaim = async (e) => {
        e.preventDefault()
        blockchain.setError('')
        if (!value) { return setErrors('Please insert value!') }
        setDisable(true)
        await blockchain.mintsNftClaim(value)
        setDisable(false)
        setErrors('')
        setValue('')
    }

    return (
        <div className={styles.bg}>
            <div className='p-4'>
                <Image src='/logo.png' width={500} height={80} />
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='text-center mt-4 mb-4'>
                    <p className={styles.font}>Random Panda is Unique NFT with a</p>
                    <p className={styles.font}>Very high reword for minters!</p>
                    <a href={process.env.NEXT_PUBLIC_DISCORD} target='_blank'>Join our discord now!!!</a>
                </div>
                <div className={styles.mint}>
                    <h4>{blockchain.totalPanda} / 1.000</h4>
                    {router.pathname !== '/mint'
                        ?<>
                            <div>
                                <button 
                                    disabled={disable}
                                    onClick={handleMint} 
                                    className='btn btn-outline-dark d-flex'
                                >
                                {disable
                                 ? <Image src='/pand.png' className="rotate" width="50" height="50" />
                                 : 'MINT!'
                                }
                                </button>
                            </div>
                            <div className='text-danger' >{blockchain.error}</div>
                            <h4 className='mt-2'>1 NFT = 1 AVAX</h4>
                        </>
                        : <div className='d-flex flex-column align-items-center'>
                            <input
                                value={value} 
                                onChange={(e) => setValue(e.target.value)}
                                type='text'
                                className='form-control input-modify' 
                                placeholder='Insert your claim...'
                            />
                            <div className='text-danger' >{blockchain.error}</div>
                            {!value  ? <div className='text-danger'>{errors}</div> : null}
                            <button 
                                disabled={disable}
                                onClick={handleMintWithClaim} 
                                className='btn btn-outline-dark mt-3 w-100 d-flex justify-content-center'
                                >
                                {disable
                                 ? <Image src='/pand.png' className="rotate" width="50" height="50" />
                                 : 'MINT!'
                                }
                                </button>

                        </div>
                    }
                    <div className='mt-1' >{blockchain.message}</div>
                </div>
            </div>
            <div className={styles.footer}>
                <div className='p-5'>
                    <h2 className='m-0'>Win 2 AVAX Each 5 NFT</h2>
                    <p className='m-0'>One address will be extracted each 5 NFT minted</p>
                    <div className={styles.tree}>
                        <Image src='/tree.png' height={220} width={100} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftComponent