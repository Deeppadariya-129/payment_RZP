import { instance } from "../server.js"
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config()



export const processPayment = async(req, res) => {

    const options = {
        amount: Number(req.body.amount *100),
        currency: "INR"
    }
    const orders = await instance.orders.create(options)
    res.status(200).json({success:true , orders})
}



export const getKey = async(req, res) => {
    res.status(200).json({success:true , key: process.env.RZP_KEY})
}


export const paymentverification = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body
    
    const body = razorpay_order_id + '|' + razorpay_payment_id

    const expectedSignature = crypto.createHmac("sha256" , process.env.RZP_SECRET).update(body.toString()).digest('hex')

    const isMatched = expectedSignature === razorpay_signature

    if (isMatched) {
        return res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
    } else {
        return res.status(404).json({success:false})
    }
}