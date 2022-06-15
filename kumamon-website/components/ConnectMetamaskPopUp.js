const ConnectMetamaskPopUp = (props) => {

  return (
    <div className='ConnectMetamaskPopUp'>
      <div className='popup'>
        <div className='content'>
        <h5 className='text-danger mb-3'>{props.title}</h5>

        <button onClick={props.onClick} className='btn btn-outline-dark'>{props.buttonText}</button>
        </div>
      </div>
    </div>
  )
}

export default ConnectMetamaskPopUp
