import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import React from 'react'

const PaypalPayment = () => {
  return (
    <div className='h-96 flex justify-center items-center'>
        <Alert severity="warning" variant='filled' style={{ maxWidth: "400px"}}>
            <AlertTitle>Paypal Method Unavailable</AlertTitle>
                Paypal payment is not implemented yet.
        </Alert>
    </div>
  )
}

export default PaypalPayment