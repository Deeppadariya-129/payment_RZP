import React from 'react'
import '../style/paymentSuccess.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const PaymentDone = () => {

    const query = new URLSearchParams(useLocation().search)
    const reference = query.get('reference')
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 7000);

        return () => clearTimeout(timer);
    }, [navigate]);


  return (
      <div className='payment-success-container'>
          <div className='payment-success-card'>
              <h1 className='payment-success-title'>Payment Successfully Done</h1>
              <p className='payment-success-message'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa praesentium velit possimus, impedit optio neque.</p>

              {
                  reference && <p className='payment-success-reference'>Reference ID : {reference} </p>
              }
          </div>
    </div>
  )
}

export default PaymentDone