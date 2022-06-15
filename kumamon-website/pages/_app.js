import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import '../styles/ConnectMetamaskPopUp.css'
import { ProvideMetamask } from '../hooks/useMetamask'
import { ProvideBlockchain } from '../hooks/useBlockchain'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProvideMetamask>
        <ProvideBlockchain>
          <Component {...pageProps} />
        </ProvideBlockchain>
      </ProvideMetamask>
    </>
  )
}

export default MyApp
