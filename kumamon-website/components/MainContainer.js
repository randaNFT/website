import Head from 'next/head'

function MainContainer ({ children, title = 'InfinityDefi' }) {
  return (
    <>
      <Head>
        <title>{title} | Minter</title>
        <meta name='keywords' content='panda' />
        <meta charSet='utf-8' />
      </Head>
      <div className='MainContainer'>
        {children}
      </div>
    </>
  )
}

export default MainContainer
