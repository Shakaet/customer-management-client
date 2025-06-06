import React from 'react'

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../component/CheckoutForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hook/useAxios';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_key);

const Specificemployee = () => {
 

 



  
  return (
    <div>



      
    </div>
  )
}

export default Specificemployee